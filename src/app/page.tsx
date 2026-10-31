import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import FeaturedDestinations from "@/components/destination/FeaturedDestinations";

async function getDestinations() {
  const res = await fetch(
    "https://travel-server-swart.vercel.app/featured",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const result = await res.json();

  return Array.isArray(result)
    ? result
    : result.data ?? result.destinations ?? [];
}

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <>
    
      <main id="main-content" className="flex-1 bg-white font-sans">
        <Hero />
        <FeaturedDestinations data={destinations} />
        <WhyChooseUs />
        <Testimonials />
        <CTA />
      </main>
    
    </>
  );
}
