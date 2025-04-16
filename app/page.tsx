"use client"

import { motion } from "framer-motion"
import { BottomNavbar } from "@/components/bottom-navbar"
import { CategoryScroller } from "@/components/category-scroller"
import { FeaturedListings } from "@/components/featured-listings"
import { SearchBar } from "@/components/search-bar"
import { WaveDivider } from "@/components/wave-divider"
import { Testimonials } from "@/components/testimonials"
import { AppPromotion } from "@/components/app-promotion"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Destinations } from "@/components/destinations"
import { AboutUs } from "@/components/about-us"

export default function Home() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full bg-gradient-to-b from-skyBlue to-teal flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 w-full max-w-5xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md"
          >
            Find Your Perfect{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sand"
            >
              Beach Getaway
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            Discover stunning tropical destinations and book your dream vacation today
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <SearchBar />
          </motion.div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <CategoryScroller />

        <WaveDivider />

        <FeaturedListings />

        {/* Promotional Section */}
        <section className="my-12 bg-skyBlue/10 rounded-2xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Experience Paradise Like Never Before</h2>
              <p className="text-gray-700 mb-6">
                Join thousands of travelers who have discovered their perfect tropical getaway with us. From beachfront
                villas to luxury island resorts, we have everything you need for an unforgettable vacation.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-teal flex items-center justify-center text-white">
                    <span className="font-bold">1</span>
                  </div>
                  <span className="ml-2 font-medium">Find your destination</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-coral flex items-center justify-center text-white">
                    <span className="font-bold">2</span>
                  </div>
                  <span className="ml-2 font-medium">Book instantly</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-sand flex items-center justify-center text-gray-700">
                    <span className="font-bold">3</span>
                  </div>
                  <span className="ml-2 font-medium">Enjoy paradise</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-80 rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=2033&auto=format&fit=crop')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </div>
        </section>
      </div>

      {/* Destinations Section */}
      <Destinations />

      {/* About Us Section */}
      <AboutUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* App Promotion Section */}
      <AppPromotion />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />

      <BottomNavbar />
    </main>
  )
}
