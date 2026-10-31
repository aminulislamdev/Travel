"use client";

import { useSession } from "@/lib/auth-client";
import { ArrowRight, Check, Headphones, ShieldCheck } from "lucide-react";

type Destination = {
  _id?: string;
  destinationName: string;
  country: string;
  price: number | string;
  duration: string;
  imageUrl: string;
  description?: string;
};

const BookingCard = ({ dest }: { dest: Destination }) => {

  const {_id, ...rest} = dest;

  const { data: session } = useSession();
  const user = session?.user;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const departureDate = new FormData(e.currentTarget).get("departureDate");
    const data ={
      username: user?.name,
      email: user?.email,
      profileImage: user?.image,
      ...rest,
      departureDate: departureDate,
      bookingDate: new Date().toISOString(),
    }
    
    const res = await fetch(`https://travel-server-swart.vercel.app/add-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    console.log(result);
  }

  return (
    <aside className="lg:sticky lg:top-8">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/50">
        <div className="border-b border-gray-100 p-6 sm:p-7">
          <p className="text-sm font-medium text-gray-500">
            Starting from
          </p>

          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-[#00a6c0]">
              ${Number(dest.price).toLocaleString("en-US")}
            </span>
            <span className="text-sm text-gray-500">/ person</span>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Your next adventure starts here.
          </p>

          <form onSubmit={handleBooking} >
            <div className="mt-6">
              <label
                htmlFor="travel-date"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Select your travel date
              </label>
              <input
                id="travel-date"
                type="date"
                name="departureDate"
                min={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#00a6c0] focus:ring-4 focus:ring-[#00a6c0]/10"
              />
            </div>
            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a6c0] px-5 py-4 text-[16px] font-bold text-white shadow-lg shadow-[#00a6c0]/20 transition hover:-translate-y-0.5 hover:bg-[#00879c] active:translate-y-0"
            >
              Book this trip
              <ArrowRight size={18} />
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-gray-400">
            Booking functionality can be connected to your backend.
          </p>
        </div>

        <div className="space-y-4 bg-gray-50/70 p-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <ShieldCheck size={19} className="shrink-0 text-[#00a6c0]" />
            Secure booking experience
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Check size={19} className="shrink-0 text-[#00a6c0]" />
            Destination details at a glance
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Headphones size={19} className="shrink-0 text-[#00a6c0]" />
            Travel support information
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs leading-5 text-gray-400">
        Prices and travel arrangements are subject to confirmation.
      </p>
    </aside>
  );
};

export default BookingCard;