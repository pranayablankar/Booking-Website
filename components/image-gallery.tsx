"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isFullscreen) {
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") setIsFullscreen(false)
    }
  }

  return (
    <>
      <div
        className="relative mb-8"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div
            className="md:col-span-1 aspect-video relative rounded-tl-xl rounded-bl-xl overflow-hidden cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          >
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className={`aspect-square relative overflow-hidden cursor-pointer ${
                  index === 1 ? "rounded-tr-xl" : index === 3 ? "rounded-br-xl" : ""
                }`}
                onClick={() => {
                  setCurrentImageIndex(index + 1)
                  setIsFullscreen(true)
                }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">+{images.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {(isHovering || isFullscreen) && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-md"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute right-4 bottom-4 z-10">
          <Button
            variant="ghost"
            className="bg-white/80 hover:bg-white shadow-md text-sm px-3 py-1 h-auto"
            onClick={() => setIsFullscreen(true)}
          >
            View all photos
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full z-10 p-2"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>

            <div className="absolute inset-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
