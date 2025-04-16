import Image from "next/image"
import Link from "next/link"
import { BottomNavbar } from "@/components/bottom-navbar"
import { Footer } from "@/components/footer"
import { WaveDivider } from "@/components/wave-divider"
import { PalmTree, Surfboard } from "@/components/ui/icons"
import { Compass, Map, Mountain, Ship, Umbrella, Waves } from "lucide-react"

const destinations = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    tagline: "Island of the Gods",
    description:
      "Experience the perfect blend of spiritual tranquility and beachside luxury in this Indonesian paradise.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop",
    activities: ["Surfing", "Temple Visits", "Rice Terraces", "Beach Clubs"],
    icon: <PalmTree className="h-5 w-5" />,
  },
  {
    id: "maldives",
    name: "Maldives",
    tagline: "Paradise on Earth",
    description: "Discover overwater bungalows and pristine coral reefs in this breathtaking island nation.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop",
    activities: ["Snorkeling", "Diving", "Overwater Villas", "Island Hopping"],
    icon: <Ship className="h-5 w-5" />,
  },
  {
    id: "maui",
    name: "Maui, Hawaii",
    tagline: "Valley Isle Magic",
    description:
      "From volcanic landscapes to lush rainforests and pristine beaches, Maui offers diverse natural beauty.",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=2070&auto=format&fit=crop",
    activities: ["Road to Hana", "Whale Watching", "Volcano Hiking", "Luaus"],
    icon: <Mountain className="h-5 w-5" />,
  },
  {
    id: "tulum",
    name: "Tulum, Mexico",
    tagline: "Bohemian Beach Bliss",
    description: "Ancient Mayan ruins meet bohemian beach vibes in this trendy Mexican destination.",
    image: "https://images.unsplash.com/photo-1682553064442-8f1c1a9a1e67?q=80&w=2070&auto=format&fit=crop",
    activities: ["Cenote Swimming", "Mayan Ruins", "Beach Yoga", "Eco Resorts"],
    icon: <Surfboard className="h-5 w-5" />,
  },
  {
    id: "seychelles",
    name: "Seychelles",
    tagline: "Untouched Beauty",
    description: "Granite boulders, white sand beaches, and turquoise waters define this African island paradise.",
    image: "https://images.unsplash.com/photo-1589979481223-deb893043163?q=80&w=2071&auto=format&fit=crop",
    activities: ["Beach Hopping", "Nature Reserves", "Island Tours", "Creole Cuisine"],
    icon: <Umbrella className="h-5 w-5" />,
  },
  {
    id: "phuket",
    name: "Phuket, Thailand",
    tagline: "Pearl of the Andaman",
    description: "Thailand's largest island offers a perfect mix of nightlife, culture, and stunning beaches.",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2070&auto=format&fit=crop",
    activities: ["Island Tours", "Thai Cuisine", "Muay Thai", "Beach Clubs"],
    icon: <Map className="h-5 w-5" />,
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    tagline: "Pure Life Adventure",
    description: "Experience 'Pura Vida' with rainforests, volcanoes, and both Caribbean and Pacific beaches.",
    image: "https://images.unsplash.com/photo-1580086319619-3ed498161c77?q=80&w=2069&auto=format&fit=crop",
    activities: ["Zip Lining", "Surfing", "Wildlife Watching", "Hot Springs"],
    icon: <Waves className="h-5 w-5" />,
  },
  {
    id: "fiji",
    name: "Fiji Islands",
    tagline: "Where Happiness Finds You",
    description: "Experience the legendary Fijian hospitality across 333 tropical islands in the South Pacific.",
    image: "https://images.unsplash.com/photo-1607968565043-36af90dde238?q=80&w=2069&auto=format&fit=crop",
    activities: ["Snorkeling", "Village Visits", "Kava Ceremonies", "Island Hopping"],
    icon: <Compass className="h-5 w-5" />,
  },
]

export default function DestinationsPage() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full bg-gradient-to-b from-skyBlue to-teal flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=2074&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Explore <span className="text-sand">Tropical Destinations</span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover paradise in these breathtaking locations around the world
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Destinations */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/listings?destination=${destination.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <div className="flex items-center gap-2 mb-1">
                    {destination.icon}
                    <h3 className="text-xl font-bold drop-shadow-md">{destination.name}</h3>
                  </div>
                  <p className="text-sm drop-shadow-md">{destination.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <WaveDivider />

        {/* Destination Details */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Discover Your Perfect Getaway</h2>

          {destinations.map((destination, index) => (
            <div key={destination.id} className="mb-16 last:mb-0">
              <div
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-2 mb-2">
                    {destination.icon}
                    <h3 className="text-2xl font-bold text-teal">{destination.name}</h3>
                  </div>
                  <p className="text-xl text-coral mb-4">{destination.tagline}</p>
                  <p className="text-gray-700 mb-6">{destination.description}</p>

                  <h4 className="font-semibold mb-3">Popular Activities:</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {destination.activities.map((activity) => (
                      <span key={activity} className="bg-skyBlue/10 text-skyBlue px-3 py-1 rounded-full text-sm">
                        {activity}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/listings?destination=${destination.id}`}
                    className="inline-block bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Explore {destination.name} Stays
                  </Link>
                </div>
              </div>

              {index < destinations.length - 1 && (
                <div className="my-16">
                  <WaveDivider />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="py-12 px-6 bg-skyBlue/10 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Tropical Adventure?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Start planning your dream vacation today. Our curated selection of tropical stays awaits!
          </p>
          <Link
            href="/listings"
            className="inline-block bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors"
          >
            Browse All Tropical Stays
          </Link>
        </section>
      </div>

      <Footer />
      <BottomNavbar />
    </main>
  )
}
