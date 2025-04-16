"use client"

import Link from "next/link"
import { Home, Map, Search, User } from "lucide-react"

export function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden z-50">
      <div className="flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-coral">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link href="/listings" className="flex flex-col items-center text-gray-500 hover:text-coral transition-colors">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Explore</span>
        </Link>

        <Link
          href="/destinations"
          className="flex flex-col items-center text-gray-500 hover:text-coral transition-colors"
        >
          <Map className="h-6 w-6" />
          <span className="text-xs mt-1">Destinations</span>
        </Link>

        <Link href="/about-us" className="flex flex-col items-center text-gray-500 hover:text-coral transition-colors">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">About Us</span>
        </Link>
      </div>
    </div>
  )
}
