import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="bg-[#eaf7f9] px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2
            id="why-choose-us-heading"
            className="mb-3 font-heading text-4xl font-medium tracking-tight text-gray-900 text-balance md:text-5xl"
          >
            Why Choose Wanderlust
          </h2>
          <p className="text-sm text-gray-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10">
                  <Icon
                    className="h-6 w-6 text-brand"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="mb-2.5 font-heading text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
