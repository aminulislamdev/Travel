"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
// 👇 authClient ইমপোর্ট করুন (আপনার পাথ অনুযায়ী)
import { authClient, useSession } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };


  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/"); 
    router.refresh(); 
  };

  if (!session?.user) {
    return (
      <div className="hidden items-center gap-5 text-sm font-medium md:flex">
        <Link href="/sign-in" className="transition hover:text-[#00a6c0]">
          Login
        </Link>
        <Link
          href="/sign-up"
          className="rounded-md px-4 py-2 text-black transition border border-gray-200 shadow-sm hover:bg-gray-50"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className="outline-none focus:outline-none rounded-full ring-offset-2 focus:ring-2 focus:ring-[#00a6c0] transition-shadow">
        <Avatar className="h-9 w-9 cursor-pointer border border-gray-200">
          <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
          <AvatarFallback className="bg-[#00a6c0] text-white text-sm font-semibold">
            {getInitials(session.user.name || "User")}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-60 p-0 mt-2 shadow-lg border-gray-100" align="end">
        <div className="flex flex-col items-center justify-center p-6 border-b border-gray-100">
          <Avatar className="h-16 w-16 mb-3">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
            <AvatarFallback className="bg-[#00a6c0] text-white text-xl font-semibold">
              {getInitials(session.user.name || "User")}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-base font-semibold text-gray-900 truncate w-full text-center">
            {session.user.name}
          </h4>
          <p className="text-xs text-gray-500 truncate w-full text-center mt-0.5">
            {session.user.email}
          </p>
        </div>

        <div className="p-2 flex flex-col gap-1">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>

          {/* 👇 বাটনে নতুন ফাংশনটি কল করা হলো */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}