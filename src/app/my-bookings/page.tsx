import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CheckCircle2, Clock, Calendar, MapPin, Eye } from "lucide-react";
import CancelBookingButton from "@/components/booking/CancelBookingButton";
import { GetTokenServer } from "@/lib/GetTokenServer";

// টাইপ ডিফাইন
type Booking = {
  _id: string;
  username: string;
  email: string;
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  bookingDate: string;
  status?: "Confirmed" | "Pending";
};

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <p className="text-gray-500">Please log in to view your bookings.</p>
      </div>
    );
  }

  const jwtToken = await GetTokenServer()

  const res = await fetch(`https://travel-server-swart.vercel.app/all-booking/${user.email}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    cache: "no-store",
  });

  const bookings: Booking[] = await res.json();

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-3">
            My Bookings
          </h1>
          <p className="text-gray-500 text-sm">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-lg p-16 text-center shadow-sm">
            <p className="text-gray-500 mb-4">You have no active bookings.</p>
            <Link
              href="/all-destinations"
              className="text-[#00a6c0] font-medium hover:underline"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-64 h-40 shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={booking.imageUrl}
                      alt={booking.destinationName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>

                  {/* Details & Price */}
                  <div className="grow">
                    {/* Status Badge */}
                    <div className="mb-2">
                      {booking.status === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
                          <Clock size={14} /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                          <CheckCircle2 size={14} /> Confirmed
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-serif font-medium mb-3">
                      {booking.destinationName}
                    </h2>

                    <div className="space-y-1.5 text-sm text-gray-500 mb-4">
                      <p className="flex items-center gap-2">
                        <Calendar size={14} /> Departure: {booking.departureDate}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin size={14} /> Booking ID: {booking._id.slice(-4)}
                      </p>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-semibold text-[#00a6c0]">
                      ${booking.price}
                    </p>
                  </div>

                  {/* Actions (Cancel & View) - ডান দিকে থাকবে */}
                  <div className="flex flex-row gap-3 w-full md:w-auto mt-4 md:mt-0 shrink-0 md:self-end">
                    <CancelBookingButton bookingId={booking._id} />
                    <Link
                      href={`/my-bookings/${booking._id}`}
                      className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded text-sm font-medium bg-[#00a6c0] text-white hover:bg-[#00879c] transition"
                    >
                      <Eye size={16} /> View
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;