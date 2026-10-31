"use client";

import { useSyncExternalStore, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import TravelStats from "@/components/profile/TravelStats";
import { GetTokenClient } from "@/lib/GetTokenClient";

type ExtendedUser = {
  name: string;
  email: string;
  image?: string | null;
  createdAt: Date;
  nationality?: string;
};

type Booking = {
  _id: string;
  price: number;
  country: string;
  departureDate: string;
};

const subscribe = () => () => { };
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchBookings = async () => {
        try {
          const token = await GetTokenClient();
          const res = await fetch(`https://travel-server-swart.vercel.app/all-booking/${session.user.email}`,
            { headers: { Authorization: `Bearer ${token}` }}
          );
          const data: Booking[] = await res.json();
          setBookings(data);
        } catch (error) {
          console.error("Failed to load bookings:", error);
        } finally {
          setLoadingBookings(false);
        }
      };
      fetchBookings();
    }
  }, [session?.user?.email]);

  if (!mounted || isPending) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fafafa]"><p className="text-gray-500">Loading profile...</p></div>;
  }

  if (!session?.user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#fafafa]"><p className="text-gray-500">Please log in to view your profile.</p></div>;
  }

  const user = session.user as unknown as ExtendedUser;

  // ক্যালকুলেশন
  const totalBookings = bookings.length;
  const totalSpent = bookings.reduce((sum, b) => sum + Number(b.price || 0), 0);
  const countriesVisited = new Set(bookings.map((b) => b.country)).size;
  const today = new Date().toISOString().split("T")[0];
  const upcomingTrips = bookings.filter((b) => b.departureDate > today).length;

  const stats = {
    totalBookings,
    countriesVisited,
    upcomingTrips,
    totalSpent: totalSpent.toLocaleString("en-US"),
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-6 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto my-10">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-3">My Profile</h1>
          <p className="text-gray-500 text-sm">Manage your account settings and travel preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* বাম দিকের কার্ড */}
          <ProfileSidebar user={user} />

          {/* ডান দিকের স্ট্যাটস */}
          <TravelStats loading={loadingBookings} stats={stats} />
        </div>
      </div>
    </div>
  );
}