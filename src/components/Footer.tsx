"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-background/50">
      <div className="mx-auto max-w-7xl py-12 px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {/* Company Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Six Square Builders</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building quality homes and landmarks with a commitment to
              excellence, transparency, and on-time delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 pl-40">
            <h4 className="text-base font-medium">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/flats" className="hover:text-foreground transition-colors">
                  Flats for Sale
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pl-40">
            <h4 className="text-base font-medium">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex flex-col">
                <span className="font-medium text-foreground">Email</span>
                <span>ssbuilders2012@yahoo.com</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium text-foreground">Phone</span>
                <span>(+91) 80154-07730</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium text-foreground">Address</span>
                <span>No. 270, 6th Main Rd, Sadasiva Nagar, Madipakkam,
                  <br />Chennai – 600091</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4 pl-40">
            <h4 className="text-base font-medium">Follow Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.linkedin.com/company/six-square-builders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Skyline Constructions. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};