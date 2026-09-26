import test from "node:test";
import assert from "node:assert/strict";
import {
  handleCareers,
  validateCareers,
  careersRateLimit,
} from "../lib/careers.mjs";
const valid = {
  name: "Test Applicant",
  email: "applicant@example.com",
  phone_number: "+91 98765 43210",
  discipline: "Automation & PLC",
  experience: "Experienced",
  years: "4",
  city: "Hyderabad",
  profile_url: "https://www.linkedin.com/in/example",
  note: "PLC and drive commissioning for packaging lines.",
  website: "",
};
const env = {
  RESEND_API_KEY: "test-only",
  CONTACT_FROM_EMAIL: "Vinayak <website@vinayakautomation.com>",
};
const request = (data = valid, headers = {}) =>
  new Request("https://preview.example/api/careers", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
test("valid application passes, fields are trimmed and optional fields may be blank", () => {
  assert.deepEqual(validateCareers(valid).fields, {});
  assert.equal(validateCareers({ ...valid, name: " Test " }).data.name, "Test");
  assert.deepEqual(
    validateCareers({
      ...valid,
      experience: "Fresher",
      years: "",
      city: "",
      profile_url: "",
    }).fields,
    {},
  );
});
test("invalid, missing and oversized fields are rejected", () => {
  for (const [field, value] of [
    ["name", " "],
    ["email", "invalid"],
    ["phone_number", "12"],
    ["phone_number", "1234567890123456"],
    ["discipline", "Astrology"],
    ["discipline", ""],
    ["experience", "Senior"],
    ["years", "many"],
    ["years", "99"],
    ["city", "x".repeat(101)],
    ["note", "short"],
    ["note", "x".repeat(3001)],
    ["name", "Bad\r\nHeader"],
    ["note", "Bell\u0007character"],
  ])
    assert.ok(
      validateCareers({ ...valid, [field]: value }).fields[field],
      `${field}=${JSON.stringify(value).slice(0, 30)}`,
    );
  assert.ok(validateCareers({ ...valid, website: "spam" }).fields.form);
  assert.ok(validateCareers([]).fields.form);
});
test("profile link must be an http or https URL", () => {
  for (const url of [
    "https://drive.google.com/file/d/abc/view",
    "http://example.com/cv.pdf",
  ])
    assert.equal(
      validateCareers({ ...valid, profile_url: url }).fields.profile_url,
      undefined,
    );
  for (const url of [
    "javascript:alert(1)",
    "ftp://example.com/cv.pdf",
    "data:text/html,hi",
    "linkedin.com/in/example",
    "https://exa mple.com",
    "mailto:a@example.com",
  ])
    assert.ok(
      validateCareers({ ...valid, profile_url: url }).fields.profile_url,
      url,
    );
});
test("request validation never calls the provider", async () => {
  let calls = 0;
  const deps = {
    env,
    send: async () => {
      calls++;
    },
    allow: () => true,
  };
  for (const [req, code] of [
    [request("{"), 400],
    [request({ ...valid, email: "" }), 400],
    [request({ ...valid, profile_url: "javascript:alert(1)" }), 400],
    [request(valid, { origin: "https://evil.example" }), 403],
    [request("a".repeat(17000)), 413],
    [request(valid, { "content-type": "text/plain" }), 415],
    [new Request("https://preview.example/api/careers"), 405],
  ])
    assert.equal((await handleCareers(req, deps)).status, code);
  assert.equal(calls, 0);
});
test("missing configuration and testing sender fail honestly with the direct contact", async () => {
  for (const e of [
    {},
    { resend: "test", CONTACT_FROM_EMAIL: "onboarding@resend.dev" },
  ]) {
    const response = await handleCareers(request(), {
      env: e,
      send: () => {
        throw new Error("should not send");
      },
    });
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.match(body.error, /temporarily unavailable/);
    assert.match(body.error, /info@vinayakautomation\.com/);
    assert.match(body.error, /040-27804951/);
  }
});
test("provider payload uses the enquiry recipient, applicant reply-to, subject and stable idempotency", async () => {
  let sent;
  const id = "12345678-1234-1234-1234-123456789abc";
  const response = await handleCareers(
    request(
      { ...valid, note: 'I built <b>panels</b> & "HMIs".' },
      { "idempotency-key": id },
    ),
    {
      env: {
        ...env,
        RESEND_API_KEY: undefined,
        resend: "legacy-key",
        CONTACT_TO_EMAIL: "hr@example.com",
      },
      allow: () => true,
      send: async (url, options) => {
        assert.equal(url, "https://api.resend.com/emails");
        sent = options;
        return Response.json({ id: "mock-email-id" });
      },
    },
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  const body = JSON.parse(sent.body);
  assert.deepEqual(body.to, ["hr@example.com"]);
  assert.equal(body.from, env.CONTACT_FROM_EMAIL);
  assert.equal(body.reply_to, valid.email);
  assert.equal(
    body.subject,
    "Vinayak job application: Automation & PLC (Experienced) – Test Applicant",
  );
  assert.ok(
    body.html.includes("&lt;b&gt;panels&lt;/b&gt; &amp; &quot;HMIs&quot;"),
  );
  assert.ok(!body.html.includes("<b>panels"));
  assert.ok(body.text.includes("LinkedIn or CV link: " + valid.profile_url));
  assert.equal(sent.headers["Idempotency-Key"], "vinayak-careers-" + id);
  assert.equal(sent.headers.Authorization, "Bearer legacy-key");
});
test("default recipient is the enquiry inbox and blank optional fields are omitted", async () => {
  let body;
  await handleCareers(
    request({ ...valid, experience: "Fresher", years: "", city: "" }),
    {
      env,
      allow: () => true,
      send: async (_, options) => {
        body = JSON.parse(options.body);
        return Response.json({ id: "mock" });
      },
    },
  );
  assert.deepEqual(body.to, ["info@vinayakautomation.com"]);
  assert.match(body.subject, /\(Fresher\)/);
  assert.ok(!body.text.includes("Current city"));
});
test("provider rejection, malformed acceptance and timeout never report success", async () => {
  for (const send of [
    async () => Response.json({ error: "denied" }, { status: 403 }),
    async () => Response.json({}),
    async () => Response.json({ id: "" }),
    async () => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    },
  ])
    assert.equal(
      (await handleCareers(request(), { env, send, allow: () => true })).status,
      502,
    );
});
test("throttled requests never call provider", async () => {
  assert.equal(
    (
      await handleCareers(request(), {
        env,
        allow: () => false,
        send: () => {
          throw new Error("should not send");
        },
      })
    ).status,
    429,
  );
  for (let i = 0; i < 5; i++)
    assert.equal(careersRateLimit("test-ip", 1000), true);
  assert.equal(careersRateLimit("test-ip", 1000), false);
  assert.equal(careersRateLimit("test-ip", 601001), true);
});
