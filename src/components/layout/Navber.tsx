import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 py-4 px-6 md:px-12 flex items-center justify-between text-white">
      <div className="text-2xl font-bold tracking-tight text-blue-400">
        Wanderlust
      </div>
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