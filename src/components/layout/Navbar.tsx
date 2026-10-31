"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/assets/Wanderlast.png";
import { useSession } from "@/lib/auth-client";
import UserNav from "./UserNav"; 

const links = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/all-destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

export default function Navbar() {
  const { isPending } = useSession();
  const pathname = usePathname();

  if (isPending) {
    return (
      <header className="absolute inset-x-0 top-0 z-50 border-b border-gray-100 bg-white h-14.25">
      </header>
    );
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-gray-100 bg-white">
      <nav
        aria-label="Main navigation"
        className="relative flex items-center justify-between px-6 py-3 md:px-10"
      >
        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  active
                    ? "text-[#00a6c0] font-bold"
                    : "text-gray-700 transition hover:text-[#00a6c0]"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <details className="relative md:hidden group">
          <summary className="flex cursor-pointer list-none items-center rounded-md p-2 text-gray-700 transition hover:bg-gray-100 [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" aria-hidden="true" />
          </summary>
          <div className="absolute left-0 top-full mt-3 w-56 rounded-lg border border-gray-100 bg-white p-2 shadow-xl">
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${isActive(link.href)
                    ? "bg-[#00a6c0]/10 text-[#00a6c0] font-bold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#00a6c0]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* মোবাইলের জন্য UserNav */}
            <div className="mt-2 border-t border-gray-100 pt-2 md:hidden">
              <UserNav />
            </div>
          </div>
        </details>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" aria-label="Wanderlust home">
            <Image
              src={logo}
              alt=""
              width={150}
              height={24}
              priority
              className="h-6 w-auto"
            />
          </Link>
        </div>

       
        <div className="ml-auto hidden items-center gap-5 md:flex">
          <UserNav />
        </div>
      </nav>
    </header>
  );
}