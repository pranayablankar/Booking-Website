import { Button } from "@/components/ui/button"
import { PalmTree } from "@/components/ui/icons"

export function AppPromotion() {
  return (
    <section className="py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-skyBlue to-teal opacity-20" aria-hidden="true"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <PalmTree className="h-8 w-8 text-coral" />
                <h3 className="text-2xl font-bold">Tropical Explorer App</h3>
              </div>

              <h2 className="text-3xl font-bold mb-4">Take Paradise With You</h2>
              <p className="text-gray-700 mb-6">
                Download our mobile app to browse and book tropical getaways on the go. Get exclusive app-only deals and
                manage your bookings with ease.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black hover:bg-black/90 text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path>
                    <path d="M16 3v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M3 11h18"></path>
                    <path d="M19 16v6"></path>
                    <path d="M22 19l-3-3-3 3"></path>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-xs">Download on the</span>
                    <span className="text-sm font-semibold">App Store</span>
                  </div>
                </Button>

                <Button className="bg-black hover:bg-black/90 text-white flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-xs">GET IT ON</span>
                    <span className="text-sm font-semibold">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="md:w-1/2 relative min-h-[300px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop')",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
