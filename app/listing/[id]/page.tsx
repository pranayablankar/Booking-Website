"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { BottomNavbar } from "@/components/bottom-navbar"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MapPin,
  Share,
  Star,
  Users,
  Wifi,
  Utensils,
  Snowflake,
  Tv,
  Car,
  ChevronLeft,
  ArrowRight,
  Check,
} from "lucide-react"
import { PalmTree } from "@/components/ui/icons"
import { Footer } from "@/components/footer"
import { allListings } from "@/app/data/listings"
import { format } from "date-fns"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ImageGallery } from "@/components/image-gallery"
import { BookingWidget } from "@/components/booking-widget"
import { HostProfile } from "@/components/host-profile"
import { ThingsToKnow } from "@/components/things-to-know"

export default function ListingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [listing, setListing] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "reviews">("overview")
  const [isFavorite, setIsFavorite] = useState(false)
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false)
  const shareMenuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const headerScale = useTransform(scrollY, [0, 100], [0.95, 1])

  useEffect(() => {
    // Find the listing with the matching ID
    const foundListing = allListings.find((item) => item.id === params.id)
    setListing(foundListing)
    setIsLoading(false)
  }, [params.id])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleReserve = () => {
    router.push(`/reservation/${params.id}`)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const toggleShareMenu = () => {
    setIsShareMenuOpen(!isShareMenuOpen)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral mb-4"></div>
          <p className="text-gray-500 font-medium">Loading amazing places...</p>
        </motion.div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Listing not found</h1>
          <Link href="/listings" className="text-coral hover:underline">
            Browse other listings
          </Link>
        </div>
      </div>
    )
  }

  // Define amenities with icons
  const amenities = [
    { name: "Beachfront", icon: <PalmTree className="h-5 w-5" /> },
    { name: "Wifi", icon: <Wifi className="h-5 w-5" /> },
    { name: "Kitchen", icon: <Utensils className="h-5 w-5" /> },
    { name: "Air conditioning", icon: <Snowflake className="h-5 w-5" /> },
    { name: "TV", icon: <Tv className="h-5 w-5" /> },
    { name: "Free parking", icon: <Car className="h-5 w-5" /> },
  ]

  // Filter amenities based on what the listing has
  const listingAmenities = amenities.filter((amenity) => listing.amenities.includes(amenity.name))

  return (
    <main className="min-h-screen pb-16 md:pb-0 font-tropical">
      {/* Sticky Header on Scroll */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md transform-gpu"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold text-lg line-clamp-1">{listing.title}</h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 ${isFavorite ? "text-coral" : ""}`}
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-coral" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleShareMenu}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8 mt-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-2 font-tropical"
        >
          {listing.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-sand text-sand mr-1" />
            <span className="font-medium">{listing.rating}</span>
            <span className="mx-1">·</span>
            <span className="text-muted-foreground">{listing.reviewCount} reviews</span>
            <span className="mx-1">·</span>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-coral mr-1" />
              <span className="text-muted-foreground">{listing.location}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative" ref={shareMenuRef}>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleShareMenu}>
                <Share className="h-4 w-4" />
                <span className="hidden md:inline">Share</span>
              </Button>

              <AnimatePresence>
                {isShareMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden"
                  >
                    <div className="py-1">
                      {["Facebook", "Twitter", "WhatsApp", "Copy Link"].map((option, index) => (
                        <motion.a
                          key={option}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          {option}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-1 ${isFavorite ? "text-coral" : ""}`}
              onClick={toggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-coral" : ""}`} />
              <span className="hidden md:inline">Save</span>
            </Button>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <ImageGallery images={listing.images} title={listing.title} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex justify-between items-start mb-6"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {listing.propertyType} in {listing.location}
                </h2>
                <div className="text-sm text-muted-foreground">
                  {listing.guests} guests · {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? "s" : ""} ·{" "}
                  {listing.beds} bed{listing.beds !== 1 ? "s" : ""} · {listing.baths} bath
                  {listing.baths !== 1 ? "s" : ""}
                </div>
              </div>
            </motion.div>

            {/* Host Profile */}
            <HostProfile
              name="Sarah"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
              joinDate="January 2018"
              isSuperhost={true}
              responseRate={98}
              responseTime="within an hour"
            />

            {/* Tabs Navigation */}
            <div className="border-b mb-6">
              <div className="flex space-x-8">
                {["overview", "amenities", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 px-1 font-medium capitalize transition-all ${
                      activeTab === tab ? "border-b-2 border-coral text-coral" : "text-gray-500 hover:text-gray-800"
                    }`}
                    onClick={() => setActiveTab(tab as any)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-gray-700 mb-6 leading-relaxed text-lg"
                  >
                    {listing.description}
                  </motion.p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold mb-3 text-lg">Property highlights</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-coral/10 flex items-center justify-center">
                            <MapPin className="h-3 w-3 text-coral" />
                          </div>
                          <span>Prime location in {listing.location}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-coral/10 flex items-center justify-center">
                            <Star className="h-3 w-3 text-coral" />
                          </div>
                          <span>Rated {listing.rating} out of 5 stars</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-coral/10 flex items-center justify-center">
                            <Users className="h-3 w-3 text-coral" />
                          </div>
                          <span>Perfect for groups up to {listing.guests} people</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="font-semibold mb-3 text-lg">What's included</h3>
                      <ul className="space-y-2">
                        {listing.amenities.slice(0, 3).map((amenity: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-teal/10 flex items-center justify-center">
                              <Check className="h-3 w-3 text-teal" />
                            </div>
                            <span>{amenity}</span>
                          </li>
                        ))}
                        <li>
                          <button
                            className="text-coral hover:underline flex items-center mt-1"
                            onClick={() => setActiveTab("amenities")}
                          >
                            See all amenities
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "amenities" && (
                <motion.div
                  key="amenities"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {listingAmenities.map((amenity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
                      >
                        <div className="h-10 w-10 rounded-full bg-teal/10 flex items-center justify-center">
                          {amenity.icon}
                        </div>
                        <span className="font-medium">{amenity.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-6">
                    <Star className="h-6 w-6 fill-sand text-sand mr-2" />
                    <span className="text-xl font-semibold">
                      {listing.rating} · {listing.reviewCount} reviews
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {["Cleanliness", "Communication", "Check-in", "Accuracy"].map((category, index) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-gray-700">{category}</span>
                        <div className="flex items-center">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <motion.div
                              className="h-full bg-coral rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(4.7 + index * 0.1) * 20}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                            />
                          </div>
                          <span className="text-sm font-medium">{(4.7 + index * 0.1).toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <motion.div
                        key={review}
                        className="border-b pb-6 last:border-b-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + review * 0.1, duration: 0.5 }}
                      >
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-gray-200">
                              <Image
                                src={`https://images.unsplash.com/photo-${1580489944761 + review * 10000}-15a19d654956?q=80&w=1961&auto=format&fit=crop`}
                                alt={`Guest ${review}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">Guest {review}</div>
                              <div className="text-sm text-gray-500">
                                {format(new Date(2023, 11 - review, 15), "MMMM yyyy")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(listing.rating) ? "fill-sand text-sand" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {review === 1
                            ? `Absolutely stunning property! The views are incredible and the ${listing.propertyType} is even better than the pictures. We had an amazing stay and will definitely be back.`
                            : review === 2
                              ? `Perfect location right on the beach. The ${listing.propertyType} has everything you need for a comfortable stay. Highly recommend!`
                              : `Beautiful ${listing.propertyType} with great amenities. The only small issue was the WiFi being a bit spotty, but we were there to disconnect anyway. Would stay again!`}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="mt-4">
                      Show all {listing.reviewCount} reviews
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Things to Know Section */}
            <ThingsToKnow />

            {/* Location Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100 mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-coral mx-auto mb-2" />
                    <p className="font-medium">{listing.location}</p>
                    <p className="text-sm text-gray-500">Map view available after booking</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                Located in the heart of {listing.location}, this {listing.propertyType.toLowerCase()} offers easy access
                to local attractions, beaches, and restaurants. The neighborhood is known for its safety and beautiful
                surroundings.
              </p>
            </motion.div>
          </div>

          {/* Booking Widget */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <BookingWidget
              price={listing.price}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
              onReserve={handleReserve}
              maxGuests={listing.guests}
            />
          </motion.div>
        </div>

        {/* Similar Listings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">More places like this</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allListings
              .filter(
                (item) =>
                  item.id !== listing.id &&
                  (item.location === listing.location || item.propertyType === listing.propertyType),
              )
              .slice(0, 3)
              .map((similarListing, index) => (
                <motion.div
                  key={similarListing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/listing/${similarListing.id}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={similarListing.images[0] || "/placeholder.svg"}
                          alt={similarListing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold line-clamp-1">{similarListing.title}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-sand text-sand mr-1" />
                            <span className="text-sm">{similarListing.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{similarListing.location}</p>
                        <p className="font-semibold">
                          ${similarListing.price} <span className="font-normal text-gray-500">night</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />

      <BottomNavbar />
    </main>
  )
}
