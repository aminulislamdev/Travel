import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import Image from "next/image";
import banner from "../../../public/assets/Banner.png"

export default function Hero() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={banner}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 w-full max-w-5xl mt-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Discover Your <br /> Next Adventure
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Explore handpicked destinations and unforgettable experiences around the world.
        </p>

        {/* Floating Search Bar */}
        <div className="bg-white rounded-xl p-4 shadow-2xl flex flex-col md:flex-row gap-4 items-center text-gray-800 mt-12 w-full max-w-4xl mx-auto">
          <div className="flex-1 flex items-center gap-2 md:border-r pr-4 w-full">
            <MapPin className="text-gray-400" />
            <div className="flex flex-col w-full text-left">
              <label className="text-xs font-semibold text-gray-500">Location</label>
              <input type="text" placeholder="Where to?" className="outline-none text-sm bg-transparent" />
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 md:border-r pr-4 w-full">
            <Calendar className="text-gray-400" />
            <div className="flex flex-col w-full text-left">
              <label className="text-xs font-semibold text-gray-500">Check-in</label>
              <input type="text" placeholder="Add date" className="outline-none text-sm bg-transparent" />
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 md:border-r pr-4 w-full">
            <Calendar className="text-gray-400" />
            <div className="flex flex-col w-full text-left">
              <label className="text-xs font-semibold text-gray-500">Check-out</label>
              <input type="text" placeholder="Add date" className="outline-none text-sm bg-transparent" />
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 w-full">
            <Users className="text-gray-400" />
            <div className="flex flex-col w-full text-left">
              <label className="text-xs font-semibold text-gray-500">Guests</label>
              <input type="text" placeholder="2 Adults" className="outline-none text-sm bg-transparent" />
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 w-full md:w-auto px-8 py-6 rounded-lg mt-2 md:mt-0">
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
        </div>
      </div>
    </section>
  );
}