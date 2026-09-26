import { randomUUID } from "node:crypto";
const limits = {
  name: 100,
  email: 254,
  phone_number: 30,
  product_name: 200,
  message: 5000,
};
const labels = {
  name: "Your name",
  email: "Email address",
  phone_number: "Phone number",
  product_name: "Product or project",
  message: "Requirement",
};
export const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
export function validateContact(input) {
  const fields = {},
    data = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { fields: { form: "Invalid request." }, data };
  for (const [key, max] of Object.entries(limits)) {
    const value = typeof input[key] === "string" ? input[key].trim() : "";
    if (!value) fields[key] = `${labels[key]} is required.`;
    else if (value.length > max)
      fields[key] = `${labels[key]} must be ${max} characters or fewer.`;
    else if (
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value) ||
      (key !== "message" && /[\r\n]/.test(value))
    )
      fields[key] = "Please remove invalid characters.";
    data[key] = value;
  }
  if (data.email && !EMAIL.test(data.email))
    fields.email = "Enter a valid email address.";
  if (
    data.phone_number &&
    (!/^[+\d\s().-]+$/.test(data.phone_number) ||
      data.phone_number.replace(/\D/g, "").length < 7 ||
      data.phone_number.replace(/\D/g, "").length > 15)
  )
    fields.phone_number =
      "Enter a valid phone number, including the area or country code.";
  if (data.message && data.message.length < 10)
    fields.message =
      "Please provide at least 10 characters about your requirement.";
  if (input.website) fields.form = "Unable to submit this request.";
  return { fields, data };
}
export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const requests = new Map();
export function rateLimit(key, now = Date.now()) {
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
export async function handleContact(
  request,
  { env = process.env, send = fetch, allow = rateLimit } = {},
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
  const { data, fields } = validateContact(input);
  if (Object.keys(fields).length)
    return json({ error: "Please check the highlighted fields.", fields }, 400);
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
          "Online enquiries are temporarily unavailable. Please email info@vinayakautomation.com or call 040-27804951.",
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
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `vinayak-${id}`,
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: data.email,
        subject: `Vinayak enquiry: ${data.product_name}`,
        text: Object.entries(data)
          .map(([k, v]) => `${labels[k]}: ${v}`)
          .join("\n\n"),
        html: `<h2>Vinayak Automation website enquiry</h2>${Object.entries(data)
          .map(
            ([k, v]) =>
              `<p><strong>${labels[k]}:</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`,
          )
          .join("")}`,
      }),
    });
    if (!response.ok)
      return json(
        {
          error:
            "Your enquiry could not be accepted for sending. Please retry or contact info@vinayakautomation.com.",
        },
        502,
      );
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id)
      return json(
        {
          error:
            "We could not confirm that your enquiry was accepted. Please retry or contact us directly.",
        },
        502,
      );
    return json({ success: true });
  } catch {
    return json(
      {
        error:
          "We could not confirm that your enquiry was accepted. Please retry with the same details or contact us directly.",
      },
      502,
    );
  }
}
