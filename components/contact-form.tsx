"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
export function ContactForm({ initialProduct }: { initialProduct: string }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const requestId = useRef("");
  const previousPayload = useRef("");
  const notice = useRef<HTMLDivElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const payload = JSON.stringify(data);
    if (previousPayload.current !== payload) {
      requestId.current = crypto.randomUUID();
      previousPayload.current = payload;
    }
    setErrors({});
    setStatus("sending");
    setMessage("Submitting your enquiry…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestId.current,
        },
        body: payload,
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.fields || {});
        throw new Error(
          result.error ||
            "Your enquiry could not be submitted. Please try again.",
        );
      }
      setStatus("success");
      setMessage(
        "Your enquiry has been accepted for sending to our team. Thank you for getting in touch.",
      );
      form.reset();
      requestId.current = "";
      previousPayload.current = "";
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name === "TimeoutError"
          ? "We could not confirm the result in time. Retry with the same details or contact us by phone."
          : error instanceof Error && error.name === "TypeError"
            ? "We could not connect. Your details are still here; please try again."
            : error instanceof Error
              ? error.message
              : "Please try again or contact us by phone.",
      );
    }
    requestAnimationFrame(() => notice.current?.focus());
  }
  const fields = [
    { name: "name", label: "Your name", auto: "name", type: "text", max: 100 },
    {
      name: "email",
      label: "Email address",
      auto: "email",
      type: "email",
      max: 254,
    },
    {
      name: "phone_number",
      label: "Phone number",
      auto: "tel",
      type: "tel",
      max: 30,
    },
    {
      name: "product_name",
      label: "Product or project",
      auto: "off",
      type: "text",
      max: 200,
    },
  ];
  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="form-fields">
        {fields.map((f) => (
          <div className="form-field" key={f.name}>
            <label htmlFor={f.name}>{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              autoComplete={f.auto}
              maxLength={f.max}
              required
              defaultValue={
                f.name === "product_name" ? initialProduct : undefined
              }
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? f.name + "-error" : undefined}
            />
            {errors[f.name] && (
              <span id={f.name + "-error"} className="field-error">
                {errors[f.name]}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="form-field">
        <label htmlFor="message">Tell us about your requirement</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          placeholder="Model, quantity, application, delivery city…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" className="field-error">
            {errors.message}
          </span>
        )}
      </div>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            Submitting <LoaderCircle size={18} className="spin" />
          </>
        ) : (
          <>
            Send enquiry <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="form-privacy form-privacy-after">
        We use the details you provide to respond to your enquiry. Read our{" "}
        <Link href="/privacy">privacy notice</Link>.
      </p>
      <div
        ref={notice}
        tabIndex={-1}
        aria-live="polite"
        role="status"
        className={`form-notice ${status}`}
      >
        {message}
      </div>
    </form>
  );
}
