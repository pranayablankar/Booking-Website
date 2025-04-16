"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BottomNavbar } from "@/components/bottom-navbar"
import { ListingCard } from "@/components/listing-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown, Filter, Loader2, Map, SlidersHorizontal, X } from "lucide-react"
import { Footer } from "@/components/footer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CategoryScroller } from "@/components/category-scroller"
import { allListings } from "@/app/data/listings"

// Property types and amenities for filters
const propertyTypes = ["Villa", "Bungalow", "Apartment", "Cottage", "House", "Treehouse", "Cabin"]
const amenitiesOptions = ["Pool", "Wifi", "Kitchen", "Air conditioning", "Beachfront", "Ocean view", "Hot tub"]

export default function ListingsPage() {
  const searchParams = useSearchParams()
  const destinationParam = searchParams.get("destination")
  const guestsParam = searchParams.get("guests")

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600])
  const [minPrice, setMinPrice] = useState<string>("0")
  const [maxPrice, setMaxPrice] = useState<string>("600")
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [guestCount, setGuestCount] = useState<number>(guestsParam ? Number.parseInt(guestsParam) : 1)
  const [minRating, setMinRating] = useState<number>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  // Temporary filter states (for Apply button)
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 600])
  const [tempMinPrice, setTempMinPrice] = useState<string>("0")
  const [tempMaxPrice, setTempMaxPrice] = useState<string>("600")
  const [tempPropertyTypes, setTempPropertyTypes] = useState<string[]>([])
  const [tempAmenities, setTempAmenities] = useState<string[]>([])
  const [tempGuestCount, setTempGuestCount] = useState<number>(1)
  const [tempMinRating, setTempMinRating] = useState<number>(0)

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<string>("Best Match")
  const [filteredListings, setFilteredListings] = useState(allListings)
  const [activeFilters, setActiveFilters] = useState<number>(0)

  // Initialize filters from URL params
  useEffect(() => {
    if (guestsParam) {
      const guests = Number.parseInt(guestsParam)
      setGuestCount(guests)
      setTempGuestCount(guests)
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [guestsParam])

  // Initialize temp filters with current filters
  useEffect(() => {
    setTempPriceRange(priceRange)
    setTempMinPrice(minPrice)
    setTempMaxPrice(maxPrice)
    setTempPropertyTypes(selectedPropertyTypes)
    setTempAmenities(selectedAmenities)
    setTempGuestCount(guestCount)
    setTempMinRating(minRating)
  }, [priceRange, minPrice, maxPrice, selectedPropertyTypes, selectedAmenities, guestCount, minRating])

  // Apply filters
  useEffect(() => {
    let filtered = [...allListings]

    // Filter by destination if provided
    if (destinationParam) {
      filtered = filtered.filter((listing) => listing.location.toLowerCase().includes(destinationParam.toLowerCase()))
    }

    // Filter by price range
    filtered = filtered.filter((listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1])

    // Filter by property type
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter((listing) => selectedPropertyTypes.includes(listing.propertyType))
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((listing) => selectedAmenities.every((amenity) => listing.amenities.includes(amenity)))
    }

    // Filter by guest count
    filtered = filtered.filter((listing) => listing.guests >= guestCount)

    // Filter by minimum rating
    filtered = filtered.filter((listing) => listing.rating >= minRating)

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((listing) => listing.categories && listing.categories.includes(selectedCategory))
    }

    // Apply sorting
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortOption === "Top Rated") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredListings(filtered)

    // Count active filters
    let count = 0
    if (priceRange[0] > 0 || priceRange[1] < 600) count++
    if (selectedPropertyTypes.length > 0) count++
    if (selectedAmenities.length > 0) count++
    if (guestCount > 1) count++
    if (minRating > 0) count++
    if (selectedCategory) count++
    setActiveFilters(count)
  }, [
    destinationParam,
    priceRange,
    selectedPropertyTypes,
    selectedAmenities,
    guestCount,
    minRating,
    sortOption,
    selectedCategory,
  ])

  // Apply temp filters to actual filters
  const applyFilters = () => {
    setPriceRange(tempPriceRange)
    setMinPrice(tempMinPrice)
    setMaxPrice(tempMaxPrice)
    setSelectedPropertyTypes(tempPropertyTypes)
    setSelectedAmenities(tempAmenities)
    setGuestCount(tempGuestCount)
    setMinRating(tempMinRating)
  }

  // Handle price input changes
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTempMinPrice(value)
    if (value && !isNaN(Number(value))) {
      setTempPriceRange([Number(value), tempPriceRange[1]])
    }
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTempMaxPrice(value)
    if (value && !isNaN(Number(value))) {
      setTempPriceRange([tempPriceRange[0], Number(value)])
    }
  }

  // Handle property type selection
  const togglePropertyType = (type: string) => {
    setTempPropertyTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  // Handle amenity selection
  const toggleAmenity = (amenity: string) => {
    setTempAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 600])
    setMinPrice("0")
    setMaxPrice("600")
    setSelectedPropertyTypes([])
    setSelectedAmenities([])
    setGuestCount(1)
    setMinRating(0)
    setSelectedCategory("")

    // Reset temp filters too
    setTempPriceRange([0, 600])
    setTempMinPrice("0")
    setTempMaxPrice("600")
    setTempPropertyTypes([])
    setTempAmenities([])
    setTempGuestCount(1)
    setTempMinRating(0)
  }

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  // Filter component for both desktop sidebar and mobile sheet
  const FilterControls = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={isMobile ? "px-2" : ""}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Price range</h3>
          {activeFilters > 0 && !isMobile && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
              Reset all
            </Button>
          )}
        </div>
        <Slider value={tempPriceRange} min={0} max={600} step={10} onValueChange={setTempPriceRange} className="mb-2" />
        <div className="flex justify-between mt-2">
          <div className="relative rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <Input
              type="number"
              value={tempMinPrice}
              onChange={handleMinPriceChange}
              className="pl-7 w-24"
              placeholder="Min"
            />
          </div>
          <span className="mx-2 self-center">-</span>
          <div className="relative rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
            <Input
              type="number"
              value={tempMaxPrice}
              onChange={handleMaxPriceChange}
              className="pl-7 w-24"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Property type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`${type}${isMobile ? "-mobile" : ""}`}
                checked={tempPropertyTypes.includes(type)}
                onCheckedChange={() => togglePropertyType(type)}
                className="mr-2"
              />
              <Label htmlFor={`${type}${isMobile ? "-mobile" : ""}`}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Amenities</h3>
        <div className="space-y-2">
          {amenitiesOptions.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <Checkbox
                id={`${amenity}${isMobile ? "-mobile" : ""}`}
                checked={tempAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
                className="mr-2"
              />
              <Label htmlFor={`${amenity}${isMobile ? "-mobile" : ""}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Minimum rating</h3>
        <div className="flex items-center gap-2">
          {[0, 3, 3.5, 4, 4.5].map((rating) => (
            <Button
              key={rating}
              variant={tempMinRating === rating ? "default" : "outline"}
              className={`px-3 py-1 h-8 ${tempMinRating === rating ? "bg-coral hover:bg-coral/90" : ""}`}
              onClick={() => setTempMinRating(rating)}
            >
              {rating > 0 ? `${rating}+` : "Any"}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Minimum guests</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={tempGuestCount === 1 ? "default" : "outline"}
            className={`px-3 py-1 h-8 ${tempGuestCount === 1 ? "bg-coral hover:bg-coral/90" : ""}`}
            onClick={() => setTempGuestCount(1)}
          >
            1+
          </Button>
          <Button
            variant={tempGuestCount === 2 ? "default" : "outline"}
            className={`px-3 py-1 h-8 ${tempGuestCount === 2 ? "bg-coral hover:bg-coral/90" : ""}`}
            onClick={() => setTempGuestCount(2)}
          >
            2+
          </Button>
          <Button
            variant={tempGuestCount === 4 ? "default" : "outline"}
            className={`px-3 py-1 h-8 ${tempGuestCount === 4 ? "bg-coral hover:bg-coral/90" : ""}`}
            onClick={() => setTempGuestCount(4)}
          >
            4+
          </Button>
          <Button
            variant={tempGuestCount === 6 ? "default" : "outline"}
            className={`px-3 py-1 h-8 ${tempGuestCount === 6 ? "bg-coral hover:bg-coral/90" : ""}`}
            onClick={() => setTempGuestCount(6)}
          >
            6+
          </Button>
        </div>
      </div>

      <Button
        className="w-full bg-coral hover:bg-coral/90 mb-4"
        onClick={() => {
          applyFilters()
          if (isMobile) {
            // Close the sheet on mobile after applying filters
            const closeButton = document.querySelector(".sheet-close") as HTMLElement
            if (closeButton) closeButton.click()
          }
        }}
      >
        Apply Filters
      </Button>

      {isMobile && (
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset all filters
        </Button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {destinationParam ? `Stays in ${destinationParam}` : "Tropical Stays"}
            </h1>
            {!isLoading && (
              <p className="text-muted-foreground">
                {filteredListings.length} {filteredListings.length === 1 ? "place" : "places"} to stay
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showMap ? "default" : "outline"}
              className={`hidden md:flex items-center gap-2 ${showMap ? "bg-coral hover:bg-coral/90" : ""}`}
              onClick={() => setShowMap(!showMap)}
            >
              <Map className="h-4 w-4" />
              {showMap ? "Hide Map" : "Show Map"}
            </Button>
            <Button
              variant="outline"
              className="flex md:hidden items-center gap-2"
              onClick={() => setShowMap(!showMap)}
            >
              <Map className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden md:inline">Sort: {sortOption}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("Best Match")}>Best Match</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("Price: Low to High")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("Price: High to Low")}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("Top Rated")}>Top Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category Scroller */}
        <CategoryScroller selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />

        {/* Active filters display */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {priceRange[0] > 0 || priceRange[1] < 600 ? (
              <Button variant="outline" size="sm" className="h-8 bg-gray-100 gap-1">
                ${priceRange[0]} - ${priceRange[1]}
                <X
                  className="h-3 w-3 ml-1"
                  onClick={() => {
                    setPriceRange([0, 600])
                    setMinPrice("0")
                    setMaxPrice("600")
                    setTempPriceRange([0, 600])
                    setTempMinPrice("0")
                    setTempMaxPrice("600")
                  }}
                />
              </Button>
            ) : null}

            {selectedCategory && (
              <Button variant="outline" size="sm" className="h-8 bg-gray-100 gap-1">
                {selectedCategory}
                <X className="h-3 w-3 ml-1" onClick={() => setSelectedCategory("")} />
              </Button>
            )}

            {selectedPropertyTypes.map((type) => (
              <Button key={type} variant="outline" size="sm" className="h-8 bg-gray-100 gap-1">
                {type}
                <X className="h-3 w-3 ml-1" onClick={() => togglePropertyType(type)} />
              </Button>
            ))}

            {selectedAmenities.map((amenity) => (
              <Button key={amenity} variant="outline" size="sm" className="h-8 bg-gray-100 gap-1">
                {amenity}
                <X className="h-3 w-3 ml-1" onClick={() => toggleAmenity(amenity)} />
              </Button>
            ))}

            {guestCount > 1 && (
              <Button variant="outline" size="sm" className="h-8 bg-gray-100 gap-1">
                {guestCount}+ guests
                <X className="h-3 w-3 ml-1" onClick={() => setGuestCount(1)} />
              </Button>
            )}

            {minRating > 0 && (
              <Button variant="outline" size="sm" className="h-8 bg-gray-100 gap-1">
                {minRating}+ rating
                <X className="h-3 w-3 ml-1" onClick={() => setMinRating(0)} />
              </Button>
            )}

            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={resetFilters}>
              Clear all
            </Button>
          </div>
        )}

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Filter className="h-4 w-4" />
                Filters {activeFilters > 0 && `(${activeFilters})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] overflow-y-auto sheet-close">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <FilterControls isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters - Desktop Only */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              <FilterControls />
            </div>
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-coral animate-spin mb-4" />
                <p className="text-muted-foreground">Loading tropical getaways...</p>
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} {...listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?q=80&w=2069&auto=format&fit=crop"
                    alt="No results"
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">No matches found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search for a different location
                </p>
                <Button onClick={resetFilters} className="bg-coral hover:bg-coral/90">
                  Reset all filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Map View (Simplified) */}
        {showMap && !isLoading && (
          <div className="mt-8 bg-gray-100 rounded-xl overflow-hidden relative h-[500px]">
            <div className="absolute inset-0 bg-gray-200">
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Map View</p>
                  <p className="text-gray-500 text-sm">Showing {filteredListings.length} properties in this area</p>
                </div>
              </div>
            </div>
            <Button
              className="absolute top-4 right-4 bg-white text-gray-800 hover:bg-gray-100 shadow-md"
              onClick={() => setShowMap(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Close Map
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      <BottomNavbar />
    </main>
  )
}
