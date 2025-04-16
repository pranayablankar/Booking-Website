import { ListingCard } from "@/components/listing-card"

// Updated data with real beach images
const featuredListings = [
  {
    id: "1",
    title: "Beachfront Villa with Infinity Pool",
    location: "Bali, Indonesia",
    price: 250,
    rating: 4.97,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517619370736-d2974d8b9d11?q=80&w=2070&auto=format&fit=crop",
    ],
    tags: ["Popular"],
  },
  {
    id: "2",
    title: "Tropical Treehouse with Ocean View",
    location: "Tulum, Mexico",
    price: 175,
    rating: 4.85,
    reviewCount: 96,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573548842355-73bb50e50323?q=80&w=2070&auto=format&fit=crop",
    ],
    tags: ["New"],
  },
  {
    id: "3",
    title: "Luxury Beach Cottage",
    location: "Maui, Hawaii",
    price: 320,
    rating: 4.92,
    reviewCount: 215,
    images: [
      "https://images.unsplash.com/photo-1505881402582-c5bc11054f91?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2025&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
    ],
  },
  {
    id: "4",
    title: "Oceanfront Bungalow with Private Beach",
    location: "Maldives",
    price: 450,
    rating: 4.99,
    reviewCount: 87,
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2074&auto=format&fit=crop",
    ],
    tags: ["Superhost"],
  },
]

export function FeaturedListings() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Featured Tropical Getaways</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredListings.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  )
}
