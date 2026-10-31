import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative flex w-full items-center justify-center overflow-hidden px-6 py-28 text-center text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/CTA.png"
          alt=""
          fill
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[#071d26]/75" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <h2
          id="cta-heading"
          className="mb-4 font-heading text-4xl font-medium tracking-tight text-balance md:text-5xl"
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-sm text-white/80 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#destinations"
          className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-xs font-semibold tracking-wider text-gray-900 uppercase transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book Your Trip Today
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
