"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/flats", label: "Flats for Sale" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
  {/* Replace Lucide icon + text with your logo */}
  <img
    src="/icon.png"       // your PNG file name
    alt="Skyline Constructions Logo"
    className="h-10 w-auto" // adjust size as needed
  />
</Link>


        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
          >
            Enquire Now
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}