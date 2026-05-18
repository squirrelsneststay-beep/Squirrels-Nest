"use client";

import { useActionState } from "react";
import { Button } from "@/components/Button";
import { submitContact, type ContactResult } from "./actions";

const initialState: ContactResult | null = null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state?.ok) {
    return (
      <div
        className="md:col-span-7 space-y-6"
        role="status"
        aria-live="polite"
      >
        <p
          className="font-mono-eyebrow"
          style={{ color: "var(--lef-bark)" }}
        >
          Thank you
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "var(--fs-48)",
            color: "var(--lef-forest)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          Your message is on its way.
        </h2>
        <p
          style={{
            fontSize: "var(--fs-18)",
            color: "var(--lef-charcoal)",
            lineHeight: 1.6,
            maxWidth: "32rem",
          }}
        >
          We&apos;ll reply within a day. If you don&apos;t hear back, check your spam folder — or write to us again.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="md:col-span-7 space-y-8" noValidate>
      {/* Honeypot — visually hidden but present in the DOM. Bots fill every
          field; humans don't see this one. Filled = silently discarded. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="website">Website (leave blank)</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Your name" name="name" type="text" placeholder="Jane Doe" required autoComplete="name" />
      <Field label="Email" name="email" type="email" placeholder="jane@email.com" required autoComplete="email" />
      <Field label="Approximate dates" name="dates" type="text" placeholder="Late October, 2-3 nights" autoComplete="off" />

      <div>
        <label
          htmlFor="message"
          className="font-mono-eyebrow block mb-3"
          style={{ color: "var(--lef-bark)" }}
        >
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          placeholder="Tell us a little about your stay..."
          className="w-full bg-transparent border-0 border-b pb-4 outline-none resize-none"
          style={{
            borderColor: "var(--lef-bark)",
            fontFamily: "var(--font-geist)",
            fontSize: "var(--fs-22)",
            color: "var(--lef-forest)",
          }}
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          aria-live="assertive"
          className="font-mono-eyebrow"
          style={{ color: "#9b2c2c" }}
        >
          {state.error}
        </p>
      )}

      <div className="pt-6">
        <Button variant="forest" type="submit" disabled={pending}>
          {pending ? "Sending..." : "Send message"}
        </Button>
        <p
          className="mt-6 font-mono-eyebrow"
          style={{ color: "var(--lef-bark)" }}
        >
          Replies usually arrive within a day.
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}

function Field({ label, name, type, placeholder, required, autoComplete }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono-eyebrow block mb-3"
        style={{ color: "var(--lef-bark)" }}
      >
        {label}
        {required && <span aria-hidden style={{ marginLeft: "0.25rem", opacity: 0.6 }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        maxLength={name === "email" ? 320 : 200}
        className="w-full bg-transparent border-0 border-b pb-4 outline-none"
        style={{
          borderColor: "var(--lef-bark)",
          fontFamily: "var(--font-geist)",
          fontSize: "var(--fs-22)",
          color: "var(--lef-forest)",
        }}
      />
    </div>
  );
}
