import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Michael Chen",
    location: "Singapore",
    text: "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    image: "/assets/person2.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "Swiss Alps adventure exceeded all expectations! The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    image: "/assets/person1.png",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-16 bg-white px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2
              id="testimonials-heading"
              className="mb-2 font-heading text-4xl font-medium tracking-tight text-gray-900 text-balance md:text-5xl"
            >
              What Travelers Say
            </h2>
            <p className="text-sm text-gray-500">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous testimonials"
              className="h-10 w-10 rounded-full border-gray-300 text-gray-400 hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next testimonials"
              className="h-10 w-10 rounded-full border-gray-300 text-gray-400 hover:border-brand hover:text-brand"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-16 xl:gap-20">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="group flex flex-col rounded-md border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md md:p-6"
            >
              <div className="flex flex-1 items-center gap-4 sm:gap-5">
                <blockquote className="flex-1 text-sm leading-relaxed text-gray-600">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                <div className="relative aspect-4/5 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100 sm:w-28 lg:w-32">
                  <Image
                    src={review.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <figcaption className="mt-6">
                <p className="border-l-2 border-brand pl-3 text-sm font-semibold text-brand">
                  {review.name}
                </p>
                <p className="mt-0.5 pl-3.5 text-xs text-gray-500">
                  {review.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
