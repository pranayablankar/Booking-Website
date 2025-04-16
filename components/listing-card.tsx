"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"

interface ListingCardProps {
  id: string
  title: string
  location: string
  price: number
  rating: number
  reviewCount: number
  images: string[]
  tags?: string[]
}

export function ListingCard({ id, title, location, price, rating, reviewCount, images, tags = [] }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite((prev) => !prev)
  }

  return (
    <Link href={`/listing/${id}`}>
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          {images.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-coral text-coral" : ""}`} />
          </Button>

          {tags.length > 0 && (
            <div className="absolute left-2 top-2">
              {tags.map((tag) => (
                <Badge key={tag} className="mr-1 bg-coral text-white">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
              <p className="text-muted-foreground text-sm">{location}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-sand text-sand mr-1" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground ml-1">({reviewCount})</span>
            </div>
          </div>

          <p className="mt-2 font-semibold">
            ${price} <span className="text-muted-foreground font-normal">night</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
