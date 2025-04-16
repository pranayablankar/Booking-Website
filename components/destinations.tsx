import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    tagline: "Island of the Gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop",
  },
  {
    id: "maldives",
    name: "Maldives",
    tagline: "Paradise on Earth",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop",
  },
  {
    id: "maui",
    name: "Maui, Hawaii",
    tagline: "Valley Isle Magic",
    image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "tulum",
    name: "Tulum, Mexico",
    tagline: "Bohemian Beach Bliss",
    image: "https://images.unsplash.com/photo-1682553064442-8f1c1a9a1e67?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "seychelles",
    name: "Seychelles",
    tagline: "Untouched Beauty",
    image: "https://images.unsplash.com/photo-1589979481223-deb893043163?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "phuket",
    name: "Phuket, Thailand",
    tagline: "Pearl of the Andaman",
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2070&auto=format&fit=crop",
  },
]

export function Destinations() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Explore Top Tropical Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover paradise in these breathtaking locations around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h3 className="text-xl font-bold mb-1 drop-shadow-md">{destination.name}</h3>
                <p className="text-sm drop-shadow-md">{destination.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
