import Image from "next/image"
import { Umbrella, Compass, Waves } from "lucide-react"

export function AboutUs() {
  return (
    <section className="py-12 px-4 bg-skyBlue/5">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Who We Are</h2>
          <p className="text-xl text-teal font-medium">Your Tropical Travel Companion</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/2">
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4 text-lg">
                Tropical Explorer connects beach lovers to the most stunning tropical stays worldwide. We curate the
                most breathtaking beachfront villas, luxurious resorts, and hidden gems across the world's most
                beautiful coastlines.
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                Our mission is to make it easy to find, book, and enjoy paradise with personalized service and top-rated
                accommodations. We believe everyone deserves to experience the magic of tropical destinations, which is
                why we've simplified the booking process and provide detailed information about each property.
              </p>
              <p className="text-gray-700 text-lg">
                Whether you're planning a romantic getaway, family vacation, or solo adventure, Tropical Explorer is
                your trusted companion for creating unforgettable memories in paradise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-coral/10 flex items-center justify-center mb-3">
                  <Umbrella className="h-7 w-7 text-coral" />
                </div>
                <h3 className="font-semibold mb-1">Relaxation</h3>
                <p className="text-sm text-gray-600">Curated for ultimate peace and tranquility</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-skyBlue/10 flex items-center justify-center mb-3">
                  <Compass className="h-7 w-7 text-skyBlue" />
                </div>
                <h3 className="font-semibold mb-1">Easy Booking</h3>
                <p className="text-sm text-gray-600">Simple, secure, and stress-free process</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                  <Waves className="h-7 w-7 text-teal" />
                </div>
                <h3 className="font-semibold mb-1">Ocean Vibes</h3>
                <p className="text-sm text-gray-600">Properties with stunning water views</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1602002418082-dd4a3f5b4f82?q=80&w=1974&auto=format&fit=crop"
                alt="People enjoying tropical vacation"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 w-40 h-40 rounded-lg overflow-hidden border-4 border-white shadow-lg hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
                alt="Tropical destination"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
