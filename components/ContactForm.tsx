"use client";

import { useState, type FormEvent } from "react";

const reasons = [
  "I'm a retailer",
  "I'm a brand or supplier",
  "I'm curious about ThisOne.ai",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      reason: data.get("reason"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
        <p className="font-bold text-brand-dark">Thanks for reaching out!</p>
        <p className="mt-2 text-sm text-muted">We&rsquo;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-black/5 bg-white p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" name="firstName" required />
        <Field label="Last Name" name="lastName" required />
      </div>
      <Field label="Email" name="email" type="email" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone Number" name="phone" type="tel" />
        <Field label="Company Name" name="company" />
      </div>

      <label className="block text-sm font-medium text-foreground">
        How can we assist you?
        <select
          name="reason"
          defaultValue=""
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        >
          <option value="" disabled>
            Select an option
          </option>
          {reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-foreground">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </label>

      {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-brand focus:outline-none"
      />
    </label>
  );
}
