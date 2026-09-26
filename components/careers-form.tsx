"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, LoaderCircle } from "lucide-react";
import { disciplines, experienceLevels } from "@/lib/careers-options.mjs";
type Field = {
  name: string;
  label: string;
  type?: string;
  auto?: string;
  max: number;
  required?: boolean;
  options?: string[];
  inputMode?: "numeric" | "decimal" | "url";
  pattern?: string;
  placeholder?: string;
};
const fields: Field[] = [
  { name: "name", label: "Full name", auto: "name", max: 100, required: true },
  {
    name: "email",
    label: "Email address",
    type: "email",
    auto: "email",
    max: 254,
    required: true,
  },
  {
    name: "phone_number",
    label: "Phone number",
    type: "tel",
    auto: "tel",
    max: 30,
    required: true,
  },
  {
    name: "discipline",
    label: "Discipline",
    max: 60,
    required: true,
    options: disciplines,
  },
  {
    name: "experience",
    label: "Experience",
    max: 20,
    required: true,
    options: experienceLevels,
  },
  {
    name: "years",
    label: "Years of experience (optional)",
    auto: "off",
    max: 4,
    inputMode: "decimal",
    pattern: "\\d{1,2}(\\.\\d)?",
  },
  {
    name: "city",
    label: "Current city (optional)",
    auto: "address-level2",
    max: 100,
  },
  {
    name: "profile_url",
    label: "LinkedIn or CV link (optional)",
    type: "url",
    auto: "url",
    max: 500,
    pattern: "https?://.+",
    placeholder: "https://",
  },
];
export function CareersForm() {
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
    setMessage("Submitting your application…");
    try {
      const response = await fetch("/api/careers", {
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
            "Your application could not be submitted. Please try again.",
        );
      }
      setStatus("success");
      setMessage(
        "Your application has been accepted for sending to our team. Thank you for your interest in Vinayak Automation Products.",
      );
      form.reset();
      requestId.current = "";
      previousPayload.current = "";
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name === "TimeoutError"
          ? "We could not confirm the result in time. Retry with the same details or email your CV to us."
          : error instanceof Error && error.name === "TypeError"
            ? "We could not connect. Your details are still here; please try again."
            : error instanceof Error
              ? error.message
              : "Please try again or email your CV to us.",
      );
    }
    requestAnimationFrame(() => notice.current?.focus());
  }
  const describe = (name: string) =>
    errors[name] ? `careers-${name}-error` : undefined;
  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="form-fields">
        {fields.map((f) => (
          <div className="form-field" key={f.name}>
            <label htmlFor={"careers-" + f.name}>{f.label}</label>
            {f.options ? (
              <div className="select-wrap">
                <select
                  id={"careers-" + f.name}
                  name={f.name}
                  required
                  defaultValue=""
                  aria-invalid={!!errors[f.name]}
                  aria-describedby={describe(f.name)}
                >
                  <option value="" disabled>
                    Choose…
                  </option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} aria-hidden="true" />
              </div>
            ) : (
              <input
                id={"careers-" + f.name}
                name={f.name}
                type={f.type || "text"}
                autoComplete={f.auto}
                inputMode={f.inputMode}
                pattern={f.pattern}
                placeholder={f.placeholder}
                maxLength={f.max}
                required={f.required}
                aria-invalid={!!errors[f.name]}
                aria-describedby={describe(f.name)}
              />
            )}
            {errors[f.name] && (
              <span id={`careers-${f.name}-error`} className="field-error">
                {errors[f.name]}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="form-field">
        <label htmlFor="careers-note">About you</label>
        <textarea
          id="careers-note"
          name="note"
          rows={5}
          required
          minLength={10}
          maxLength={3000}
          placeholder="Qualification, the work you have done or want to do, and when you could join…"
          aria-invalid={!!errors.note}
          aria-describedby={describe("note")}
        />
        {errors.note && (
          <span id="careers-note-error" className="field-error">
            {errors.note}
          </span>
        )}
      </div>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="careers-website">Leave this field empty</label>
        <input
          id="careers-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="form-privacy">
        Emailed to our team, not stored on this website. Links only, no files.
        See our <Link href="/privacy">privacy notice</Link>.
      </p>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            Submitting <LoaderCircle size={18} className="spin" />
          </>
        ) : (
          <>
            Send application <ArrowUpRight size={18} />
          </>
        )}
      </button>
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
