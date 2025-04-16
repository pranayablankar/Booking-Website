"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MessageCircle, Shield, Star, Award } from "lucide-react"

interface HostProfileProps {
  name: string
  image: string
  joinDate: string
  isSuperhost?: boolean
  responseRate?: number
  responseTime?: string
}

export function HostProfile({
  name,
  image,
  joinDate,
  isSuperhost = false,
  responseRate = 98,
  responseTime = "within an hour",
}: HostProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t border-b py-8 my-8"
    >
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative">
          <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-coral">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          {isSuperhost && (
            <div className="absolute -bottom-2 -right-2 bg-coral text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Award className="h-3 w-3 mr-1" />
              Superhost
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">Hosted by {name}</h3>
          <p className="text-gray-500 mb-3">Joined in {joinDate}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-coral mr-1" />
              <span className="text-sm">289 Reviews</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-coral mr-1" />
              <span className="text-sm">Identity verified</span>
            </div>
            {isSuperhost && (
              <div className="flex items-center">
                <Award className="h-4 w-4 text-coral mr-1" />
                <span className="text-sm">Superhost</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 mb-4">
            Hi, I'm {name}! I love sharing my beautiful properties with travelers from around the world. I'm always
            available to help make your stay perfect and can provide local recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <div className="font-medium">Response rate</div>
              <div className="text-gray-500">{responseRate}%</div>
            </div>
            <div className="sm:ml-8">
              <div className="font-medium">Response time</div>
              <div className="text-gray-500">{responseTime}</div>
            </div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact Host
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
