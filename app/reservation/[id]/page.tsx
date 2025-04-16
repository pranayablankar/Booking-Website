"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { BottomNavbar } from "@/components/bottom-navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, CalendarIcon, Users, Check } from "lucide-react"
import { allListings } from "@/app/data/listings"
import { format, addDays, differenceInDays } from "date-fns"

export default function ReservationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [listing, setListing] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  })
  const [guests, setGuests] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal">("credit-card")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Find the listing with the matching ID
    const foundListing = allListings.find((item) => item.id === params.id)
    setListing(foundListing)
    setIsLoading(false)
  }, [params.id])

  const calculateTotalPrice = () => {
    if (!listing || !dateRange.from || !dateRange.to) return 0
    const nights = differenceInDays(dateRange.to, dateRange.from)
    const basePrice = listing.price * nights
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic form validation
    const errors: Record<string, string> = {}

    if (paymentMethod === "credit-card") {
      const cardNumber = (document.getElementById("card-number") as HTMLInputElement).value
      const cardName = (document.getElementById("card-name") as HTMLInputElement).value
      const expiry = (document.getElementById("expiry") as HTMLInputElement).value
      const cvv = (document.getElementById("cvv") as HTMLInputElement).value

      if (!cardNumber) errors.cardNumber = "Card number is required"
      if (!cardName) errors.cardName = "Cardholder name is required"
      if (!expiry) errors.expiry = "Expiry date is required"
      if (!cvv) errors.cvv = "CVV is required"
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsConfirmed(true)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral"></div>
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

  const priceDetails = calculateTotalPrice()

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {isConfirmed ? (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-teal" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Your reservation at {listing.title} has been confirmed. We've sent a confirmation email with all the
              details.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                  <p className="text-gray-600 mb-2">{listing.location}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="font-medium">Check-in:</span> {format(dateRange.from, "MMM dd, yyyy")}
                    </div>
                    <div>
                      <span className="font-medium">Check-out:</span>{" "}
                      {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : ""}
                    </div>
                    <div>
                      <span className="font-medium">Guests:</span> {guests}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push(`/listing/${listing.id}`)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Listing
              </Button>
              <Button onClick={() => router.push("/")} className="bg-coral hover:bg-coral/90">
                Explore More Stays
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button onClick={() => router.back()} variant="ghost" className="mb-6 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to listing
            </Button>

            <h1 className="text-2xl md:text-3xl font-bold mb-6">Complete your reservation</h1>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Reservation Form */}
              <div className="lg:w-2/3">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Your trip</h2>

                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Dates</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarIcon className="h-5 w-5 text-coral" />
                          <span className="font-medium">
                            {dateRange.from && dateRange.to
                              ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                              : "Select dates"}
                          </span>
                        </div>
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={(range) => setDateRange(range as { from: Date; to: Date | undefined })}
                          className="rounded-md border"
                          numberOfMonths={1}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Guests</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-coral" />
                          <span className="font-medium">
                            {guests} guest{guests !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            disabled={guests <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-4">{guests}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(Math.min(listing.guests, guests + 1))}
                            disabled={guests >= listing.guests}
                          >
                            +
                          </Button>
                          <span className="ml-4 text-sm text-gray-500">(Max: {listing.guests} guests)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Payment information</h2>

                    <Tabs defaultValue="credit-card" onValueChange={(value) => setPaymentMethod(value as any)}>
                      <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="credit-card" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Credit Card
                        </TabsTrigger>
                        <TabsTrigger value="paypal">
                          <svg className="h-4 w-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.403 2.981l-1.12 7.106c-.083.519.275.981.798.981h4.606c.524 0 .968-.382 1.05-.9l.878-5.571c.083-.518.527-.9 1.05-.9h1.512c4.35 0 7.716-1.747 8.698-6.8.288-1.487.197-2.738-.673-3.692z" />
                          </svg>
                          PayPal
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="credit-card">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              className={formErrors.cardNumber ? "border-red-500" : ""}
                            />
                            {formErrors.cardNumber && (
                              <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="card-name">Cardholder Name</Label>
                            <Input
                              id="card-name"
                              placeholder="John Doe"
                              className={formErrors.cardName ? "border-red-500" : ""}
                            />
                            {formErrors.cardName && <p className="text-red-500 text-sm mt-1">{formErrors.cardName}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                className={formErrors.expiry ? "border-red-500" : ""}
                              />
                              {formErrors.expiry && <p className="text-red-500 text-sm mt-1">{formErrors.expiry}</p>}
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" className={formErrors.cvv ? "border-red-500" : ""} />
                              {formErrors.cvv && <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal">
                        <div className="text-center py-8">
                          <p className="mb-4">You'll be redirected to PayPal to complete your payment.</p>
                          <svg className="h-12 w-12 mx-auto text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.403 2.981l-1.12 7.106c-.083.519.275.981.798.981h4.606c.524 0 .968-.382 1.05-.9l.878-5.571c.083-.518.527-.9 1.05-.9h1.512c4.35 0 7.716-1.747 8.698-6.8.288-1.487.197-2.738-.673-3.692z" />
                          </svg>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Cancellation policy</h2>
                    <p className="text-gray-600 mb-4">
                      Free cancellation before {format(addDays(new Date(), 7), "MMM dd")}. Cancel before check-in on{" "}
                      {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "your check-in date"} for a partial
                      refund.
                    </p>
                    <div className="flex items-start gap-2">
                      <Checkbox id="terms" className="mt-1" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-coral hover:underline">
                          House Rules
                        </Link>
                        ,{" "}
                        <Link href="#" className="text-coral hover:underline">
                          Cancellation Policy
                        </Link>
                        , and{" "}
                        <Link href="#" className="text-coral hover:underline">
                          Terms of Service
                        </Link>
                        .
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-coral hover:bg-coral/90 py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      `Confirm and Pay $${priceDetails.total}`
                    )}
                  </Button>
                </form>
              </div>

              {/* Price Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <Image
                        src={listing.images[0] || "/placeholder.svg"}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium line-clamp-1">{listing.title}</h3>
                      <p className="text-sm text-gray-500">{listing.location}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{listing.propertyType}</span>
                        <span className="mx-2">•</span>
                        <span className="text-xs">
                          {listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="text-xs">
                          {listing.baths} bath{listing.baths !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 border-b">
                    <h3 className="font-semibold text-lg mb-4">Price details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>
                          ${listing.price} x {priceDetails.nights} night{priceDetails.nights !== 1 ? "s" : ""}
                        </span>
                        <span>${priceDetails.basePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>${priceDetails.cleaningFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>${priceDetails.serviceFee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total (USD)</span>
                      <span>${priceDetails.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
      <BottomNavbar />
    </main>
  )
}
