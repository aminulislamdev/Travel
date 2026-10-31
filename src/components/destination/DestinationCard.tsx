import Image from "next/image";
import Link from "next/link";

export type Destination = {
  _id?: string;
  destinationName: string;
  country: string;
  price: number | string;
  duration: string;
  imageUrl: string;
};

export default function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <div className="flex w-full flex-col group h-full">
      <Link
        href={`/all-destinations/${dest._id}`}
        className="flex flex-col h-full cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative mb-4 h-60 w-full overflow-hidden rounded-md bg-gray-100 shadow-sm">
          {dest.imageUrl?.trim() ? (
            <Image
              src={dest.imageUrl}
              alt={dest.destinationName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No Image
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded bg-white/95 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
            4.8
            <svg className="h-3 w-3 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col grow">
          {/* Location */}
          <div className="mb-2 flex items-center gap-1.5 text-[13px] text-gray-500">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {dest.country}
          </div>

          {/* Title & Price */}
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="font-serif text-[20px] font-semibold text-gray-900 transition-colors group-hover:text-[#00a6c0] line-clamp-1">
              {dest.destinationName}
            </h3>
            <div className="mt-0.5 shrink-0 whitespace-nowrap text-right">
              <span className="text-[17px] font-semibold text-gray-900">
                ${dest.price}
              </span>
              <span className="text-[11px] text-gray-500">/person</span>
            </div>
          </div>

          {/* Duration */}
          <div className="mb-5 flex items-center gap-1.5 text-[13px] text-gray-500">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {dest.duration}
          </div>

          {/* Book Now Button */}
          <div className="mt-auto flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#00a6c0] transition-colors group-hover:text-[#00879c]">
            BOOK NOW
            <svg className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}