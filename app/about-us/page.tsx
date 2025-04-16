import Image from "next/image"
import Link from "next/link"
import { BottomNavbar } from "@/components/bottom-navbar"
import { Footer } from "@/components/footer"
import { WaveDivider } from "@/components/wave-divider"
import { PalmTree } from "@/components/ui/icons"
import { Award, Heart, Compass, Users, Clock, Umbrella, Star } from "lucide-react"

export default function AboutUsPage() {
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
                "url('https://images.unsplash.com/photo-1602002418082-dd4a3f5b4f82?q=80&w=1974&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            About <span className="text-sand">Tropical Explorer</span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto">Your Tropical Travel Companion</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Our Story Section */}
        <section className="py-12">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6 text-lg">
                  Tropical Explorer connects beach lovers to the most stunning tropical stays worldwide. We curate the
                  most breathtaking beachfront villas, luxurious resorts, and hidden gems across the world's most
                  beautiful coastlines.
                </p>
                <p className="text-gray-700 mb-6 text-lg">
                  Our mission is to make it easy to find, book, and enjoy paradise with personalized service and
                  top-rated accommodations. We believe everyone deserves to experience the magic of tropical
                  destinations, which is why we've simplified the booking process and provide detailed information about
                  each property.
                </p>
                <p className="text-gray-700 text-lg">
                  Whether you're planning a romantic getaway, family vacation, or solo adventure, Tropical Explorer is
                  your trusted companion for creating unforgettable memories in paradise.
                </p>
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
        </section>

        <WaveDivider />

        {/* Our Values */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-full bg-coral/10 flex items-center justify-center mb-4">
                <Umbrella className="h-7 w-7 text-coral" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Relaxation</h3>
              <p className="text-gray-600">
                We believe in the power of relaxation and rejuvenation. Every property we feature is selected for its
                ability to provide a truly peaceful escape from everyday life.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-full bg-skyBlue/10 flex items-center justify-center mb-4">
                <Compass className="h-7 w-7 text-skyBlue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Booking</h3>
              <p className="text-gray-600">
                We're committed to making your booking experience as smooth as the ocean breeze. Our platform is
                designed to be intuitive, transparent, and hassle-free.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                <Star className="h-7 w-7 text-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Hosts</h3>
              <p className="text-gray-600">
                We partner only with the most reliable and hospitable hosts who share our passion for creating
                exceptional tropical experiences for our guests.
              </p>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Why Choose Us */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Tropical Explorer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-coral/10 flex-shrink-0 flex items-center justify-center">
                <Award className="h-6 w-6 text-coral" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
                <p className="text-gray-600">
                  We personally vet each property to ensure it meets our high standards for quality, comfort, and that
                  special tropical magic.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-skyBlue/10 flex-shrink-0 flex items-center justify-center">
                <Heart className="h-6 w-6 text-skyBlue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
                <p className="text-gray-600">
                  We understand that every traveler is unique, which is why we offer personalized recommendations based
                  on your preferences.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-teal/10 flex-shrink-0 flex items-center justify-center">
                <Users className="h-6 w-6 text-teal" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                <p className="text-gray-600">
                  Our team of travel enthusiasts and local experts provide insider knowledge to help you discover hidden
                  gems and authentic experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-sand/20 flex-shrink-0 flex items-center justify-center">
                <Clock className="h-6 w-6 text-sand" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated customer support team is available around the clock to assist with any questions or
                  concerns during your booking or stay.
                </p>
              </div>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* Our Team */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4 border-4 border-skyBlue">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Emma Rodriguez</h3>
              <p className="text-coral">Founder & CEO</p>
              <p className="text-gray-600 mt-2">
                Beach lover and travel enthusiast with a passion for connecting people with paradise.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4 border-4 border-coral">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">James Wilson</h3>
              <p className="text-skyBlue">Head of Destinations</p>
              <p className="text-gray-600 mt-2">
                Former travel guide with extensive knowledge of the world's most beautiful tropical locations.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4 border-4 border-teal">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sophia Chen</h3>
              <p className="text-coral">Customer Experience</p>
              <p className="text-gray-600 mt-2">
                Dedicated to ensuring every guest has an unforgettable tropical experience from booking to checkout.
              </p>
            </div>

            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4 border-4 border-sand">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                  alt="Team member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Michael Torres</h3>
              <p className="text-skyBlue">Property Curator</p>
              <p className="text-gray-600 mt-2">
                Expert in hospitality with a keen eye for properties that offer both luxury and authentic local
                experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 px-6 bg-skyBlue/10 rounded-2xl text-center mt-12">
          <div className="flex items-center justify-center mb-6">
            <PalmTree className="h-10 w-10 text-coral mr-2" />
            <h2 className="text-3xl font-bold">Join Our Tropical Community</h2>
          </div>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Ready to discover your perfect tropical getaway? Start exploring our curated selection of paradise stays
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/listings"
              className="inline-block bg-coral hover:bg-coral/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors"
            >
              Browse Tropical Stays
            </Link>
            <Link
              href="/destinations"
              className="inline-block bg-teal hover:bg-teal/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors"
            >
              Explore Destinations
            </Link>
          </div>
        </section>
      </div>

      <Footer />
      <BottomNavbar />
    </main>
  )
}
