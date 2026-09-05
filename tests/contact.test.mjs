import test from "node:test";
import assert from "node:assert/strict";
import {
  handleContact,
  validateContact,
  escapeHtml,
  rateLimit,
} from "../lib/contact.mjs";
const valid = {
  name: "Test Engineer",
  email: "engineer@example.com",
  phone_number: "+91 98765 43210",
  product_name: "Emotron VSS",
  message: "Request a quotation for one drive.",
  website: "",
};
const env = {
  RESEND_API_KEY: "test-only",
  CONTACT_FROM_EMAIL: "Vinayak <website@vinayakautomation.com>",
};
const request = (data = valid, headers = {}) =>
  new Request("https://preview.example/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
test("valid international enquiry passes and fields are trimmed", () => {
  assert.deepEqual(validateContact(valid).fields, {});
  assert.equal(validateContact({ ...valid, name: " Test " }).data.name, "Test");
});
test("invalid, missing and oversized fields are rejected", () => {
  for (const [field, value] of [
    ["email", "invalid"],
    ["phone_number", "12"],
    ["name", " "],
    ["message", "short"],
    ["product_name", "x".repeat(201)],
    ["name", "Bad\r\nHeader"],
  ])
    assert.ok(validateContact({ ...valid, [field]: value }).fields[field]);
  assert.ok(validateContact({ ...valid, website: "spam" }).fields.form);
});
test("HTML is escaped", () =>
  assert.equal(escapeHtml("<script>\"&'"), "&lt;script&gt;&quot;&amp;&#39;"));
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
    [request(valid, { origin: "https://evil.example" }), 403],
    [request("a".repeat(17000)), 413],
    [request(valid, { "content-type": "text/plain" }), 415],
    [new Request("https://preview.example/api/contact"), 405],
  ])
    assert.equal((await handleContact(req, deps)).status, code);
  assert.equal(calls, 0);
});
test("missing configuration and testing sender fail honestly", async () => {
  for (const e of [
    {},
    { resend: "test", CONTACT_FROM_EMAIL: "onboarding@resend.dev" },
  ])
    assert.equal((await handleContact(request(), { env: e })).status, 503);
});
test("provider acceptance uses Vinayak recipient and stable idempotency", async () => {
  let sent;
  const id = "12345678-1234-1234-1234-123456789abc";
  const response = await handleContact(
    request(
      { ...valid, message: "Please quote <b>one</b> drive." },
      { "idempotency-key": id },
    ),
    {
      env: { ...env, RESEND_API_KEY: undefined, resend: "legacy-key" },
      allow: () => true,
      send: async (url, options) => {
        assert.equal(url, "https://api.resend.com/emails");
        sent = options;
        return Response.json({ id: "mock-email-id" });
      },
    },
  );
  assert.equal(response.status, 200);
  const body = JSON.parse(sent.body);
  assert.deepEqual(body.to, ["info@vinayakautomation.com"]);
  assert.equal(body.reply_to, valid.email);
  assert.ok(body.html.includes("&lt;b&gt;"));
  assert.equal(sent.headers["Idempotency-Key"], "vinayak-" + id);
  assert.equal(sent.headers.Authorization, "Bearer legacy-key");
});
test("provider rejection, malformed acceptance and network failure never report success", async () => {
  for (const send of [
    async () => Response.json({ error: "denied" }, { status: 403 }),
    async () => Response.json({}),
    async () => {
      throw new Error("timeout");
    },
  ])
    assert.equal(
      (await handleContact(request(), { env, send, allow: () => true })).status,
      502,
    );
});
test("throttled requests never call provider", async () => {
  assert.equal(
    (
      await handleContact(request(), {
        env,
        allow: () => false,
        send: () => {
          throw new Error("should not send");
        },
      })
    ).status,
    429,
  );
  for (let i = 0; i < 5; i++) assert.equal(rateLimit("test-ip", 1000), true);
  assert.equal(rateLimit("test-ip", 1000), false);
  assert.equal(rateLimit("test-ip", 601001), true);
});
