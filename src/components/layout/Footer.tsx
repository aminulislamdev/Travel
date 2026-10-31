import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "How it Works", href: "#" },
  { label: "Reviews", href: "#testimonials" },
  { label: "About Us", href: "#" },
];

const supportLinks = [
  { label: "Contact Us", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] px-6 pt-16 pb-8 text-white md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b border-gray-800 pb-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlust"
            width={160}
            height={45}
            className="mb-6 h-auto w-40 object-contain"
          />
          <p className="mb-6 text-sm text-gray-400">
            Subscribe to our newsletter for travel inspiration and exclusive
            deals.
          </p>
          <div className="flex max-w-sm gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
            />
            <Button
              type="button"
              aria-label="Subscribe to the newsletter"
              className="bg-brand hover:bg-brand-dark"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <nav aria-labelledby="footer-quick-links">
          <h3
            id="footer-quick-links"
            className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase"
          >
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-support-links">
          <h3
            id="footer-support-links"
            className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase"
          >
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <a
                href="mailto:hello@wanderlust.com"
                className="transition hover:text-white"
              >
                hello@wanderlust.com
              </a>
            </li>
            <li>
              <a
                href="tel:+15551234567"
                className="transition hover:text-white"
              >
                +1 (555) 123-4567
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between pt-8 text-sm text-gray-500 md:flex-row">
        <p>&copy; 2026 Wanderlust. All rights reserved.</p>

        <div className="mt-4 flex gap-4 md:mt-0">
          <a
            href="#"
            aria-label="Wanderlust on Facebook"
            className="rounded-full bg-gray-800 p-2 text-white transition hover:bg-brand"
          >
            <FaFacebookF className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="Wanderlust on Instagram"
            className="rounded-full bg-gray-800 p-2 text-white transition hover:bg-brand"
          >
            <FaInstagram className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#"
            aria-label="Wanderlust on Twitter"
            className="rounded-full bg-gray-800 p-2 text-white transition hover:bg-brand"
          >
            <FaTwitter className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
