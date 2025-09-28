// src/app/contact/ContactInner.tsx
"use client";

import { useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";


export default function ContactPage() {
  const search = useSearchParams();
  const interest = search.get("interest") ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastPayloadRef = useRef<Record<string, any> | null>(null);

  // Replace with your Formspree endpoint ID
  // Visit https://formspree.io, create a form, then replace the URL below.
  // Example: const FORMSPREE_ENDPOINT = "https://formspree.io/f/abcdwxyz";
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkgqopaa"; // <- replace with your Formspree form URL

  const subject = useMemo(() => {
    return interest ? `Property enquiry: ${interest}` : "General enquiry";
  }, [interest]);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone: string) {
    if (!phone) return false;
    return /^[0-9+()\-\s]{7,}$/.test(phone);
  }

  async function sendToFormspree(payload: Record<string, any>) {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      // Formspree returns JSON with error details
      const data = await res.json().catch(() => ({}));
      throw new Error(
        data?.errors?.[0]?.message || data?.error || "Failed to send."
      );
    }
    return res.json().catch(() => ({}));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const project_name = String(data.get("interest") || interest || "").trim();

    // Client-side validation
    if (!name) {
      toast.error("Please enter your name.");
      form.querySelector<HTMLInputElement>("#name")?.focus();
      return;
    }
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      form.querySelector<HTMLInputElement>("#email")?.focus();
      return;
    }
    if (!phone || !validatePhone(phone)) {
      toast.error("Please enter a valid phone number.");
      form.querySelector<HTMLInputElement>("#phone")?.focus();
      return;
    }
    if (!message) {
      toast.error("Please enter a message.");
      form.querySelector<HTMLTextAreaElement>("#message")?.focus();
      return;
    }

    const payload = {
      name,
      email,
      phone,
      message,
      project_name, // hidden/derived field
      subject, // useful in your inbox
      _subject: subject, // some Formspree templates use _subject
      _replyto: email,
      _form_name: "Contact Page Enquiry",
    };

    lastPayloadRef.current = payload;

    try {
      setIsSubmitting(true);
      await sendToFormspree(payload);
      toast.success("Thanks! Your enquiry has been sent.");
      form.reset();
      // Preserve interest from URL after reset
      const interestInput = form.querySelector<HTMLInputElement>("#interest");
      if (interestInput && interest) interestInput.value = interest;
    } catch (error: any) {
      toast.error(error?.message || "Failed to send enquiry.", {
        action: {
          label: "Retry",
          onClick: async () => {
            if (!lastPayloadRef.current) return;
            try {
              setIsSubmitting(true);
              await sendToFormspree(lastPayloadRef.current);
              toast.success("Thanks! Your enquiry has been sent.");
              form.reset();
              const interestInput = form.querySelector<HTMLInputElement>("#interest");
              if (interestInput && interest) interestInput.value = interest;
            } catch (e: any) {
              toast.error(e?.message || "Still couldn't send. Please try later.");
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Get in touch for sales enquiries, project details, or partnerships. Our team will respond within one business day.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Form */}
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-lg border">
            <div
              className="h-28 w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop')",
              }}
              aria-hidden
            />
            <form onSubmit={handleSubmit} className="space-y-4 p-6" aria-label="Contact form">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    placeholder="Your name"
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    placeholder="(+1) 555-123-4567"
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium">
                    Interested In
                  </label>
                  <input
                    id="interest"
                    name="interest"
                    defaultValue={interest}
                    placeholder="e.g., skyline-2bhk-a1"
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us more about your requirements..."
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to our terms and consent to be contacted.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-60 hover:opacity-90"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Details */}
        <aside className="space-y-4">
          <div className="rounded-lg border p-4">
            <h2 className="text-base font-semibold">Office</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Skyline Constructions
              <br /> 221B Riverside Drive
              <br /> Metropolis, NY 10001
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="text-base font-semibold">Contact</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Phone: (+91) 8015407730
              <br /> Email: sales@skylineconstructions.com
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1506976785307-8732e854ad75?q=80&w=1200&auto=format&fit=crop"
              alt="Our office location"
              className="h-56 w-full object-cover"
            />
          </div>
        </aside>
      </section>
    </main>
  );
}