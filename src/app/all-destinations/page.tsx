import Image from "next/image";
import Link from "next/link";

type Destination = {
  _id?: string;
  destinationName: string;
  country: string;
  price: number | string;
  duration: string;
  imageUrl: string;
};

const AllDestinationPage = async () => {
  const res = await fetch("https://travel-server-swart.vercel.app/all-destination");
  const destinations: Destination[] = (await res.json()) as Destination[];
  console.log(destinations);
  
  return (
    <div className="max-w-9xl mx-auto px-6 py-16 font-sans text-gray-900 bg-white ">

      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-[2.8rem] font-normal tracking-tight mb-2">Explore All Destinations</h1>
        <p className="text-gray-500 text-sm">Find your perfect travel experience from our curated collection</p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <select className="w-full appearance-none border border-gray-300 rounded px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer">
            <option>CATEGORY</option>
            <option>Adventure</option>
            <option>Wildlife</option>
            <option>Beach</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        <div className="relative flex-1">
          <select className="w-full appearance-none border border-gray-300 rounded px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer">
            <option>PRICE RANGE</option>
            <option>$0 - $1000</option>
            <option>$1000 - $3000</option>
            <option>$3000+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        <div className="relative flex-1">
          <select className="w-full appearance-none border border-gray-300 rounded px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer">
            <option>SORT BY</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* Result Count */}
      <p className="text-sm text-gray-500 mb-8">Showing {destinations.length} destinations</p>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {destinations.map((dest, index) => (
          <Link
            key={dest._id || index}
            href={`/all-destinations/${dest._id}`}  
            className="flex flex-col group cursor-pointer"
          >

            {/* Image Container */}
            <div className="relative h-55 w-full mb-4 overflow-hidden rounded-sm">

              {dest.imageUrl ? (
                <Image
                  src={dest.imageUrl}
                  alt={dest.destinationName || "Travel destination"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                  No image available
                </div>
              )}

              {/* Rating Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-sm text-sm font-medium flex items-center gap-1.5 shadow-sm">
                4.5 <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col grow">

              {/* Location */}
              <div className="flex items-center text-gray-500 text-xs mb-1.5">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {dest.country}
              </div>

              {/* Title and Price */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-[17px] text-gray-900">{dest.destinationName}</h3>
                <div className="text-right whitespace-nowrap">
                  <span className="font-medium text-gray-900">${dest.price}</span>
                  <span className="text-[11px] text-gray-500">/Person</span>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center text-gray-500 text-xs mb-4">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {dest.duration}
              </div>

              {/* Book Now Link */}
              <div className="mt-auto">
                <button className="flex items-center text-[#00a6c0] text-[11px] font-bold tracking-wider hover:text-[#00879c] transition-colors">
                  BOOK NOW
                  <svg className="w-3 h-3 ml-1.5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllDestinationPage;