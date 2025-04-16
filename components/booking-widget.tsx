"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronDown, ChevronUp, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addDays, differenceInDays } from "date-fns"

interface BookingWidgetProps {
  price: number
  rating: number
  reviewCount: number
  onReserve: () => void
  maxGuests: number
}

export function BookingWidget({ price, rating, reviewCount, onReserve, maxGuests }: BookingWidgetProps) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  })
  const [guests, setGuests] = useState(1)
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)

  const calculateTotalPrice = () => {
    if (!dateRange.from || !dateRange.to) return { basePrice: 0, nights: 0, cleaningFee: 0, serviceFee: 0, total: 0 }

    const nights = Math.max(1, differenceInDays(dateRange.to, dateRange.from))
    const basePrice = price * nights
    const cleaningFee = 85
    const serviceFee = Math.round(basePrice * 0.15)

    return {
      basePrice,
      nights,
      cleaningFee,
      serviceFee,
      total: basePrice + cleaningFee + serviceFee,
    }
  }

  const priceDetails = calculateTotalPrice()

  return (
    <Card className="sticky top-20 shadow-lg border-none overflow-hidden rounded-xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-muted-foreground"> night</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-sand text-sand mr-1" />
            <span className="font-medium">{rating}</span>
            <span className="mx-1">·</span>
            <span className="text-muted-foreground">{reviewCount} reviews</span>
          </div>
        </div>

        <div className="border rounded-lg mb-4 overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 divide-x">
            <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="text-xs font-medium text-gray-500">CHECK-IN</div>
              <div className="font-medium">{dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "Add date"}</div>
            </div>
            <div className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="text-xs font-medium text-gray-500">CHECKOUT</div>
              <div className="font-medium">{dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "Add date"}</div>
            </div>
          </div>
          <div
            className="border-t p-3 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setShowGuestPicker(!showGuestPicker)}
          >
            <div className="text-xs font-medium text-gray-500">GUESTS</div>
            <div className="flex justify-between items-center">
              <div className="font-medium">
                {guests} guest{guests !== 1 ? "s" : ""}
              </div>
              {showGuestPicker ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showGuestPicker && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="font-medium">Adults</div>
                    <div className="text-sm text-gray-500">Ages 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </Button>
                    <span className="w-4 text-center">{guests}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                      disabled={guests >= maxGuests}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  This place has a maximum of {maxGuests} guests, not including infants.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range) => setDateRange(range as { from: Date; to: Date | undefined })}
            className="rounded-lg border-none"
            classNames={{
              day_selected: "bg-coral text-white",
              day_today: "bg-accent text-accent-foreground",
              day_range_middle: "bg-coral/20",
              day_range_end: "bg-coral text-white",
            }}
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            className="w-full bg-coral hover:bg-coral/90 mb-4 py-6 text-lg font-semibold shadow-md rounded-xl"
            onClick={onReserve}
          >
            Reserve
          </Button>
        </motion.div>

        <div className="text-center text-sm text-muted-foreground mb-6">You won't be charged yet</div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <button className="underline" onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}>
              ${price} x {priceDetails.nights} nights
            </button>
            <span>${priceDetails.basePrice}</span>
          </div>
          <div className="flex justify-between">
            <button className="underline" onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}>
              Cleaning fee
            </button>
            <span>${priceDetails.cleaningFee}</span>
          </div>
          <div className="flex justify-between">
            <button className="underline" onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}>
              Service fee
            </button>
            <span>${priceDetails.serviceFee}</span>
          </div>
          <AnimatePresence>
            {showPriceBreakdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                  <p>The cleaning fee is set by the host to cover the cost of cleaning their space after your stay.</p>
                  <p>Service fee helps us run our platform and offer services like 24/7 support.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total before taxes</span>
            <span>${priceDetails.total}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Shield className="h-4 w-4" />
          <span>Your booking is protected by our secure payment system</span>
        </div>
      </CardContent>
    </Card>
  )
}
