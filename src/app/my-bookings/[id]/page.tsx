import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, CheckCircle2, Clock, CreditCard, User } from "lucide-react";
import { GetTokenServer } from "@/lib/GetTokenServer";

type Booking = {
  _id: string;
  username: string;
  email: string;
  destinationName: string;
  country: string;
  price: number;
  departureDate: string;
  bookingDate: string;
  imageUrl: string;
  status: string;
};

async function getBooking(id: string): Promise<Booking | null> {
  const jwtToken = await GetTokenServer()

  const res = await fetch(`https://travel-server-swart.vercel.app/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) {
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-20 px-6 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          href="/my-bookings"
          className="inline-flex items-center gap-2 text-md font-medium text-gray-500 hover:text-[#00a6c0] transition mb-8 mt-10"
        >
          <ArrowLeft size={16} />
          Back to My Bookings
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Header Image */}
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={booking.imageUrl}
              alt={booking.destinationName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
                  {booking.destinationName}
                </h1>
                <p className="text-white/80 flex items-center gap-2">
                  <MapPin size={16} /> {booking.country}
                </p>
              </div>
              <div>
                {booking.status === "Pending" ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-500 text-white shadow-sm">
                    <Clock size={16} /> Pending
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-green-500 text-white shadow-sm">
                    <CheckCircle2 size={16} /> Confirmed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Left Column - Trip Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">Trip Details</h2>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#00a6c0]/10 text-[#00a6c0] rounded-lg">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Departure Date</p>
                  <p className="font-medium text-gray-900">{booking.departureDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#00a6c0]/10 text-[#00a6c0] rounded-lg">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="font-medium text-[#00a6c0] text-lg">${booking.price}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">Booking Information</h2>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booked By</p>
                  <p className="font-medium text-gray-900">{booking.username}</p>
                  <p className="text-sm text-gray-500">{booking.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-mono text-sm text-gray-900">{booking._id}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Booked on: {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}