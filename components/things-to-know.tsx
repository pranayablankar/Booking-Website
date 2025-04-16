"use client"

import { motion } from "framer-motion"
import { Clock, Home, AlertCircle } from "lucide-react"

export function ThingsToKnow() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="my-8">
      <h3 className="text-xl font-semibold mb-6">Things to know</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-3">
            <Home className="h-5 w-5 text-coral" />
            <h4 className="font-medium">House rules</h4>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>Check-in: After 3:00 PM</li>
            <li>Checkout: 11:00 AM</li>
            <li>No smoking</li>
            <li>No pets</li>
            <li>No parties or events</li>
          </ul>
        </motion.div>

        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-5 w-5 text-coral" />
            <h4 className="font-medium">Safety & property</h4>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>Carbon monoxide alarm</li>
            <li>Smoke alarm</li>
            <li>Security camera/recording device</li>
            <li>Pool/hot tub without gate or lock</li>
            <li>Nearby lake, river, other body of water</li>
          </ul>
        </motion.div>

        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-coral" />
            <h4 className="font-medium">Cancellation policy</h4>
          </div>
          <p className="text-gray-700 mb-2">Free cancellation before 48 hours of check-in.</p>
          <p className="text-gray-700 mb-2">
            Review the host's full cancellation policy which applies even if you cancel for illness or disruptions
            caused by COVID-19.
          </p>
          <a href="#" className="text-coral hover:underline text-sm">
            Learn more about cancellation policies
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
