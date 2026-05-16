"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { withBasePath } from "@/lib/site";


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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src={withBasePath("/icon.png")}
            alt="Six Square Builders Logo"
            width={160}
            height={40}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>


        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
          >
            Enquire Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border bg-background/60 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background/95 shadow-lg md:hidden">
          <nav id="mobile-navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="min-h-11 rounded-md px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 min-h-11 rounded-md bg-primary px-3 py-3 text-center text-base font-semibold text-primary-foreground shadow hover:opacity-90"
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
