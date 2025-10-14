"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-background/50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-base font-semibold">Skyline Constructions</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Building quality homes and landmarks with a commitment to
              excellence, transparency, and on-time delivery.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/flats" className="hover:text-foreground">
                  Flats for Sale
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>sales@skylineconstructions.com</li>
              <li>(+1) 555-010-2020</li>
              <li>221B Riverside Drive, Metropolis, NY 10001</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium">Follow</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">Instagram</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Skyline Constructions. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};