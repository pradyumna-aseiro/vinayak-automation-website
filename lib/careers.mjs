import { randomUUID } from "node:crypto";
import { EMAIL, escapeHtml } from "./contact.mjs";
import { disciplines, experienceLevels } from "./careers-options.mjs";
// Job applications from the homepage careers section. The checks mirror
// lib/contact.mjs; the form takes no files, only an optional profile or CV link.
export { disciplines, experienceLevels };
const fields = {
  name: { label: "Full name", max: 100, required: true },
  email: { label: "Email address", max: 254, required: true },
  phone_number: { label: "Phone number", max: 30, required: true },
  discipline: { label: "Discipline", max: 60, required: true },
  experience: { label: "Experience", max: 20, required: true },
  years: { label: "Years of experience", max: 5 },
  city: { label: "Current city", max: 100 },
  profile_url: { label: "LinkedIn or CV link", max: 500 },
  note: { label: "About you", max: 3000, required: true },
};
const CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
export function validateCareers(input) {
  const errors = {},
    data = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { fields: { form: "Invalid request." }, data };
  for (const [key, { label, max, required }] of Object.entries(fields)) {
    const value = typeof input[key] === "string" ? input[key].trim() : "";
    if (!value) {
      if (required) errors[key] = `${label} is required.`;
    } else if (value.length > max)
      errors[key] = `${label} must be ${max} characters or fewer.`;
    else if (CONTROL.test(value) || (key !== "note" && /[\r\n]/.test(value)))
      errors[key] = "Please remove invalid characters.";
    data[key] = value;
  }
  if (data.email && !errors.email && !EMAIL.test(data.email))
    errors.email = "Enter a valid email address.";
  if (
    data.phone_number &&
    !errors.phone_number &&
    (!/^[+\d\s().-]+$/.test(data.phone_number) ||
      data.phone_number.replace(/\D/g, "").length < 7 ||
      data.phone_number.replace(/\D/g, "").length > 15)
  )
    errors.phone_number =
      "Enter a valid phone number, including the area or country code.";
  if (data.discipline && !disciplines.includes(data.discipline))
    errors.discipline = "Choose a discipline from the list.";
  if (data.experience && !experienceLevels.includes(data.experience))
    errors.experience = "Choose Fresher or Experienced.";
  if (
    data.years &&
    !errors.years &&
    (!/^\d{1,2}(\.\d)?$/.test(data.years) || Number(data.years) > 50)
  )
    errors.years = "Enter years of experience as a number, for example 3.";
  if (data.profile_url && !errors.profile_url) {
    let url;
    try {
      url = new URL(data.profile_url);
    } catch {
      url = null;
    }
    if (
      !url ||
      !["http:", "https:"].includes(url.protocol) ||
      !url.hostname ||
      /\s/.test(data.profile_url)
    )
      errors.profile_url =
        "Enter a full link starting with https://, or leave this blank.";
  }
  if (data.note && !errors.note && data.note.length < 10)
    errors.note = "Please write at least 10 characters about yourself.";
  if (input.website) errors.form = "Unable to submit this request.";
  return { fields: errors, data };
}
const requests = new Map();
export function careersRateLimit(key, now = Date.now()) {
  for (const [k, v] of requests) if (v.expires < now) requests.delete(k);
  const previous = requests.get(key);
  if (previous && previous.count >= 5) return false;
  if (previous) previous.count++;
  else {
    if (requests.size >= 10000) return false;
    requests.set(key, { count: 1, expires: now + 600000 });
  }
  return true;
}
const json = (body, status = 200, extra = {}) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
export async function handleCareers(
  request,
  { env = process.env, send = fetch, allow = careersRateLimit } = {},
) {
  if (request.method !== "POST")
    return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return json({ error: "Expected a JSON request." }, 415);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return json({ error: "Request origin is not allowed." }, 403);
  if (Number(request.headers.get("content-length")) > 16384)
    return json({ error: "Request is too large." }, 413);
  let input;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body) > 16384)
      return json({ error: "Request is too large." }, 413);
    input = JSON.parse(body);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  const { data, fields: invalid } = validateCareers(input);
  if (Object.keys(invalid).length)
    return json(
      { error: "Please check the highlighted fields.", fields: invalid },
      400,
    );
  const key = env.RESEND_API_KEY || env.resend;
  const sender = env.CONTACT_FROM_EMAIL;
  const recipient = env.CONTACT_TO_EMAIL || "info@vinayakautomation.com";
  const senderAddress = sender?.match(/<([^>]+)>/)?.[1] || sender;
  if (
    !key ||
    !senderAddress ||
    !EMAIL.test(senderAddress) ||
    senderAddress.endsWith("@resend.dev") ||
    !EMAIL.test(recipient) ||
    /[\r\n]/.test(sender)
  )
    return json(
      {
        error:
          "Online applications are temporarily unavailable. Please email your CV to info@vinayakautomation.com or call 040-27804951.",
      },
      503,
    );
  // This is an instance-local abuse throttle, not a distributed rate limiter.
  const ip =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    "local";
  if (!allow(ip))
    return json(
      {
        error:
          "Too many requests. Please wait a few minutes or contact us directly.",
      },
      429,
      { "Retry-After": "600" },
    );
  const suppliedId = request.headers.get("idempotency-key");
  const id =
    suppliedId && /^[0-9a-f-]{36}$/i.test(suppliedId)
      ? suppliedId
      : randomUUID();
  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => [fields[k].label, v]);
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `vinayak-careers-${id}`,
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: data.email,
        subject: `Vinayak job application: ${data.discipline} (${data.experience}) – ${data.name}`,
        text: rows.map(([label, v]) => `${label}: ${v}`).join("\n\n"),
        html: `<h2>Vinayak Automation website job application</h2>${rows
          .map(
            ([label, v]) =>
              `<p><strong>${label}:</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`,
          )
          .join("")}`,
      }),
    });
    if (!response.ok)
      return json(
        {
          error:
            "Your application could not be accepted for sending. Please retry or email info@vinayakautomation.com.",
        },
        502,
      );
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id)
      return json(
        {
          error:
            "We could not confirm that your application was accepted. Please retry or contact us directly.",
        },
        502,
      );
    return json({ success: true });
  } catch {
    return json(
      {
        error:
          "We could not confirm that your application was accepted. Please retry with the same details or contact us directly.",
      },
      502,
    );
  }
}
