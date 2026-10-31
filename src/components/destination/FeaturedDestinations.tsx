"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DestinationCard, { type Destination } from "./DestinationCard";

export default function FeaturedDestinations({ data }: { data: Destination[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, data.length - itemsToShow);
  const activeIndex = Math.min(currentIndex, maxIndex);

  const progress =
    maxIndex === 0 ? 100 : ((activeIndex + 1) / (maxIndex + 1)) * 100;

  const nextSlide = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 font-sans">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h2 className="mb-2 font-serif text-4xl tracking-tight text-gray-900 md:text-5xl">
            Featured Destinations
          </h2>
          <p className="text-sm text-gray-500">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/all-destinations"
          className="mt-1 inline-flex items-center gap-2 border border-[#00a6c0] px-6 py-3 text-sm font-bold tracking-wider text-[#00a6c0] transition-colors hover:bg-[#00a6c0] hover:text-white md:mt-0"
        >
          ALL DESTINATIONS
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Slider */}
      {data.length > 0 ? (
        <>
          <div className="mb-8 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                // প্রতিটি item-এর প্রস্থ = containerWidth / itemsToShow
                // তাই এক ধাপ = 100 / itemsToShow %
                transform: `translateX(-${activeIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {data.map((dest, index) => (
                <div
                  key={dest._id ?? `${dest.destinationName}-${index}`}
                  className="shrink-0 px-2.5"
                  style={{
                    // fixed width — flex gap-এর উপর নির্ভর না করে হিসাব রাখা সহজ
                    width: `${100 / itemsToShow}%`,
                  }}
                >
                  <DestinationCard dest={dest} />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-5">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">
                {Math.min(activeIndex + 1, data.length)} / {Math.max(1, maxIndex + 1)}
              </span>

              <div className="hidden h-1 w-32 overflow-hidden rounded-full bg-gray-200 sm:block">
                <div
                  className="h-full bg-gray-800 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevSlide}
                disabled={activeIndex === 0}
                aria-label="Previous destinations"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextSlide}
                disabled={activeIndex >= maxIndex}
                aria-label="Next destinations"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="py-16 text-center text-gray-500">
          No featured destinations available.
        </div>
      )}
    </section>
  );
}