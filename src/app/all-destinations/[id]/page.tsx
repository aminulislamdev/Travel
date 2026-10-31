
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";
import EditDestination from "@/components/destination/EditDestination";
import DeleteDestination from "@/components/destination/DeleteDestination";
import BookingCard from "@/components/booking/BookingCard";
import { GetTokenServer } from "@/lib/GetTokenServer";


type Destination = {
  _id?: string;
  destinationName: string;
  country: string;
  price: number | string;
  duration: string;
  imageUrl: string;
  description?: string;
};

async function getDestination(id: string): Promise<Destination> {
  const jwtToken = await GetTokenServer()
  const res = await fetch(
    `https://travel-server-swart.vercel.app/all-destination/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      cache: "no-store",
    }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch destination");
  }

  const destination: Destination = await res.json();

  if (!destination) {
    notFound();
  }

  return destination;
}
export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  let dest: Destination;

  try {
    dest = await getDestination(id);
  } catch (error) {
    console.error("DETAILS PAGE ERROR:", error);
    throw error;
  }

  const highlights = [
    "Beautiful natural landscapes",
    "Unique local experiences",
    "Comfortable accommodation",
    "Explore popular attractions",
    "Memorable sightseeing tours",
  ];

  return (
    <main className="min-h-screen bg-[#f8fafb] text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        {/* Navigation */}
        <div className="mb-6 flex min-h-16 w-full items-center justify-between gap-4 pt-10">
          <Link
            href="/all-destinations"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#00a6c0]"
          >
            <ArrowLeft size={18} />
            Back to destinations
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <EditDestination initialData={dest} />
            <DeleteDestination
              destinationId={dest._id as string}
              destinationName={dest.destinationName ?? ""}
            />
          </div>
        </div>
        {/* Hero image */}
        <section className="relative mb-10 h-75 overflow-hidden rounded-3xl bg-gray-200 shadow-sm sm:h-100 lg:h-120">
          {dest.imageUrl?.trim() ? (
            <Image
              src={dest.imageUrl}
              alt={dest.destinationName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition duration-700 hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              No image available
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
              <MapPin size={16} />
              {dest.country}
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {dest.destinationName}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <Star size={17} className="fill-yellow-400 text-yellow-400" />
                <strong className="text-white">4.9</strong>
                <span>(234 reviews)</span>
              </span>

              <span className="flex items-center gap-2">
                <Clock3 size={17} />
                {dest.duration}
              </span>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Destination information */}
          <div className="space-y-9 lg:col-span-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00a6c0]">
                  Discover the destination
                </p>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  About this place
                </h2>
              </div>

              <p className="text-base leading-8 text-gray-600">
                {dest.description ||
                  `Discover the beauty of ${dest.destinationName}, located in ${dest.country}. Enjoy memorable sightseeing, explore local culture, and experience a wonderful ${dest.duration} journey filled with new adventures.`}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl bg-[#f0fbfc] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#00a6c0] shadow-sm">
                    <CalendarDays size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Trip duration</p>
                    <p className="mt-1 font-semibold">{dest.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-[#f0fbfc] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#00a6c0] shadow-sm">
                    <MapPin size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="mt-1 font-semibold">{dest.country}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Highlights */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00a6c0]">
                What makes it special
              </p>

              <h2 className="mb-7 text-2xl font-bold tracking-tight">
                Trip highlights
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5f9fb] text-[#0096ad]">
                      <Check size={15} strokeWidth={2.5} />
                    </span>
                    <p className="text-sm leading-6 text-gray-600">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking card */}
          <BookingCard dest={dest} />
        </div>

        {/* Bottom navigation */}
        <div className="mt-10 flex justify-center border-t border-gray-200 pt-8">
          <Link
            href="/all-destinations"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#00a6c0] hover:text-[#00879c]"
          >
            <ArrowLeft size={16} />
            Explore more destinations
          </Link>
        </div>
      </div>
    </main>
  );
}
