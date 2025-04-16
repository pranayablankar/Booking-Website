import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PalmTree } from "@/components/ui/icons"
import { Mail } from "lucide-react"

export function Newsletter() {
  return (
    <section className="py-12 px-4 bg-skyBlue/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-coral/10 p-3 rounded-full">
            <Mail className="h-8 w-8 text-coral" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-3">Get Tropical Updates</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive deals, travel tips, and inspiration for your next beach getaway.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-full border-skyBlue focus-visible:ring-teal"
          />
          <Button className="bg-coral hover:bg-coral/90 rounded-full px-6">Subscribe</Button>
        </div>

        <div className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
          <PalmTree className="h-4 w-4" />
          <span>We respect your privacy and will never share your email</span>
        </div>
      </div>
    </section>
  )
}
