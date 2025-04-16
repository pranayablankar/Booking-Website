"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2, MapPin, Search, Users, X } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

const popularDestinations = [
  "Bali, Indonesia",
  "Maldives",
  "Tulum, Mexico",
  "Maui, Hawaii",
  "Phuket, Thailand",
  "Seychelles",
  "Cancun, Mexico",
  "Santorini, Greece",
  "Fiji Islands",
  "Bora Bora, French Polynesia",
]

export function SearchBar() {
  const [date, setDate] = useState<Date>()
  const [guests, setGuests] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Filter destinations based on search query
    if (searchQuery.trim() === "") {
      setSuggestions([])
    } else {
      const filtered = popularDestinations.filter((destination) =>
        destination.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSuggestions(filtered)
    }
  }, [searchQuery])

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      // Navigate to listings page with search params
      router.push(`/listings?destination=${encodeURIComponent(searchQuery)}&guests=${guests}`)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSuggestions(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center gap-2">
      <div className="relative w-full md:w-1/3">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Where to?"
          className="pl-10 pr-10 py-6 rounded-full border-none focus-visible:ring-skyBlue"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={clearSearch}
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin className="h-4 w-4 text-coral mr-2" />
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-1/3 justify-start text-left font-normal py-6 rounded-full border-none"
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
            {date ? format(date, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      <div className="relative w-full md:w-1/4">
        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <select
          className="w-full pl-10 pr-4 py-6 rounded-full border-none focus-visible:ring-skyBlue appearance-none bg-transparent"
          value={guests}
          onChange={(e) => setGuests(Number.parseInt(e.target.value))}
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5+ Guests</option>
        </select>
      </div>

      <Button
        className="w-full md:w-auto rounded-full bg-coral hover:bg-coral/90 text-white py-6 px-6"
        onClick={handleSearch}
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="h-5 w-5 mr-2" />
            Search
          </>
        )}
      </Button>
    </div>
  )
}
