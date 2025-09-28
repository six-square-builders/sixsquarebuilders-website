// src/app/contact/page.tsx
"use client";

import { Suspense } from "react";

// Import the actual contact form UI
import ContactInner from "./ContactInner";

export default function ContactPage() {
  // Wrap the inner component in Suspense to satisfy Next.js
  return (
    <Suspense fallback={<div className="p-8">Loading…</div>}>
      <ContactInner />
    </Suspense>
  );
}
