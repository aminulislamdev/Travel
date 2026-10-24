import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/Wanderlast-1.png"

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 py-4 px-6 md:px-12 flex items-center justify-between text-white">
      {/* Logo - Using local image from public/assets */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={logo}
          alt="Wanderlust Logo"
          width={140}
          height={40}
          className="object-contain"
        />
      </Link>

      <div className="hidden md:flex gap-8 text-sm font-medium">
        <Link href="#" className="hover:text-blue-300 transition">Destinations</Link>
        <Link href="#" className="hover:text-blue-300 transition">How it Works</Link>
        <Link href="#" className="hover:text-blue-300 transition">Reviews</Link>
        <Link href="#" className="hover:text-blue-300 transition">About</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="#" className="text-sm font-medium hover:text-blue-300">Login</Link>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
          Sign Up
        </Button>
      </div>
    </nav>
  );
}