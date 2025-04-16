"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home, Hotel, Map, Mountain, Ship, Umbrella } from "lucide-react"
import { PalmTree, Surfboard } from "@/components/ui/icons"

export const categories = [
  { name: "Beachfront", icon: <PalmTree className="h-5 w-5" />, filter: "Beachfront" },
  { name: "Islands", icon: <Ship className="h-5 w-5" />, filter: "Islands" },
  { name: "Surfing", icon: <Surfboard className="h-5 w-5" />, filter: "Surfing" },
  { name: "Cabins", icon: <Home className="h-5 w-5" />, filter: "Cabins" },
  { name: "Tropical", icon: <Umbrella className="h-5 w-5" />, filter: "Tropical" },
  { name: "Luxe", icon: <Hotel className="h-5 w-5" />, filter: "Luxe" },
  { name: "Mountains", icon: <Mountain className="h-5 w-5" />, filter: "Mountains" },
  { name: "Amazing views", icon: <Map className="h-5 w-5" />, filter: "Amazing views" },
]

interface CategoryScrollerProps {
  selectedCategory?: string
  onSelectCategory?: (category: string) => void
}

export function CategoryScroller({ selectedCategory, onSelectCategory }: CategoryScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = 320

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      if (selectedCategory === category) {
        // If already selected, deselect it
        onSelectCategory("")
      } else {
        // Otherwise select it
        onSelectCategory(category)
      }
    }
  }

  return (
    <div className="relative w-full my-6">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md bg-white h-8 w-8"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 py-2 px-8 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl border-2 transition-all whitespace-nowrap
              ${
                selectedCategory === category.name
                  ? "border-skyBlue text-skyBlue bg-skyBlue/10"
                  : "hover:border-skyBlue hover:text-skyBlue"
              }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.icon}
            <span className="text-xs font-medium">{category.name}</span>
          </Button>
        ))}
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md bg-white h-8 w-8"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
