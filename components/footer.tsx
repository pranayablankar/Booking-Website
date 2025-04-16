"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PalmTree } from "@/components/ui/icons"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight

      // Check if user has scrolled to the bottom 300px of the page
      if (scrollY + windowHeight > documentHeight - 300) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Set visible by default after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

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
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const socialItem = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
  }

  return (
    <footer className="relative bg-white border-t overflow-hidden">
      {/* Wave Background */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-16 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#7ED6DF"
            fillOpacity="0.1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,261.3C672,277,768,267,864,245.3C960,224,1056,192,1152,197.3C1248,203,1344,245,1392,266.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
          <path
            fill="#FF6B6B"
            fillOpacity="0.1"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="
                M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,250.7C960,267,1056,277,1152,266.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <motion.div variants={item}>
            <div className="flex items-center gap-2 mb-4">
              <PalmTree className="h-6 w-6 text-coral" />
              <span className="text-xl font-bold text-teal">Tropical Explorer</span>
            </div>
            <p className="text-gray-600 mb-4">
              Discover and book the perfect tropical getaway. From beachfront villas to luxury resorts, we have
              everything you need for an unforgettable vacation.
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
              className="flex space-x-4"
            >
              <motion.div variants={socialItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-500 hover:text-coral transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={socialItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-500 hover:text-coral transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={socialItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-500 hover:text-coral transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={socialItem} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-500 hover:text-coral transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/about-us" className="text-gray-600 hover:text-coral transition-colors">
                  About Us
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/destinations" className="text-gray-600 hover:text-coral transition-colors">
                  Destinations
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Careers
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Blog
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Partners
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Help Center
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Safety Information
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Cancellation Options
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  COVID-19 Response
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Report a Concern
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MapPin className="h-5 w-5 text-coral" />
                <span className="text-gray-600">123 Beach Avenue, Paradise Island</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Phone className="h-5 w-5 text-coral" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail className="h-5 w-5 text-coral" />
                <span className="text-gray-600">info@tropicalexplorer.com</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border-t mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Tropical Explorer. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Terms of Service
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Cookie Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="#" className="text-gray-600 hover:text-coral transition-colors">
                  Sitemap
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
