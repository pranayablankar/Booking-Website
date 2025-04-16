import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    rating: 5,
    text: "Our stay at the beachfront villa was absolutely magical! The booking process was seamless, and the property exceeded all our expectations. Can't wait to book our next tropical getaway!",
  },
  {
    id: 2,
    name: "James Wilson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Tropical Explorer made finding our dream vacation spot so easy. The photos were accurate, the host was responsive, and the beach was even more beautiful than we imagined!",
  },
  {
    id: 3,
    name: "Sophia Chen",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    rating: 4,
    text: "We've used many booking platforms, but Tropical Explorer stands out for its curated selection of beautiful beach properties. The app made our entire trip planning stress-free.",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of travelers choose Tropical Explorer for their beach getaways
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-skyBlue">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? "fill-sand text-sand" : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
