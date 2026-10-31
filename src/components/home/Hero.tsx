import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/Banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60"
        />
      </div>

      <div className="relative z-10 mx-auto mb-8 max-w-4xl px-4 text-center text-white md:mb-24">
        <h1
          id="hero-heading"
          className="mb-4 font-heading text-5xl leading-tight font-semibold text-balance md:text-7xl"
        >
          Discover Your <br /> Next Adventure
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed font-light text-pretty text-gray-200 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/all-destination"
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-blue-400 px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark sm:w-auto"
          >
            EXPLORE NOW <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/all-destination"
            className="w-full rounded-sm border border-white/30 bg-white/20 px-8 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/30 sm:w-auto"
          >
            VIEW DESTINATIONS
          </Link>
        </div>
      </div>

      <div className="relative z-20 mt-4 w-full md:absolute md:bottom-0 md:mt-0">
        <form
          action="/#destinations"
          role="search"
          aria-label="Search destinations"
          className="mx-auto flex w-full flex-col items-stretch border-t border-white/20 bg-white/20 backdrop-blur-md md:flex-row md:items-center"
        >
          <div className="flex-1 border-b border-white/20 px-6 py-3 text-left md:border-r md:border-b-0">
            <label
              htmlFor="search-location"
              className="mb-1 block text-xs font-medium text-white/90"
            >
              Location
            </label>
            <input
              id="search-location"
              name="location"
              type="text"
              autoComplete="off"
              placeholder="Address, City or Zip"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
            />
          </div>

          <div className="flex-1 border-b border-white/20 px-6 py-3 text-left md:border-r md:border-b-0">
            <label
              htmlFor="search-duration"
              className="mb-1 block text-xs font-medium text-white/90"
            >
              Date/Duration
            </label>
            <input
              id="search-duration"
              name="duration"
              type="text"
              autoComplete="off"
              placeholder="Anytime, 3 Days"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
            />
          </div>

          <div className="flex-1 border-b border-white/20 px-6 py-3 text-left md:border-r md:border-b-0">
            <label
              htmlFor="search-budget"
              className="mb-1 block text-xs font-medium text-white/90"
            >
              Budget
            </label>
            <input
              id="search-budget"
              name="budget"
              type="text"
              autoComplete="off"
              placeholder="$0 - $3000"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
            />
          </div>

          <div className="flex-1 border-b border-white/20 px-6 py-3 text-left md:border-b-0">
            <label
              htmlFor="search-people"
              className="mb-1 block text-xs font-medium text-white/90"
            >
              People
            </label>
            <input
              id="search-people"
              name="people"
              type="text"
              autoComplete="off"
              placeholder="5-10"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 bg-blue-400 px-10 py-4 font-semibold text-white transition hover:bg-brand-dark md:w-auto md:py-6"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="text-lg">Search</span>
          </button>
        </form>
      </div>
    </section>
  );
}
