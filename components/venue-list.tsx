"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { api } from "@/lib/api"
import { Heart, Loader2, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"

export interface ApiVenue {
  id: number,
  name: string,
  description: string,
  capacity: number,
  basePrice: number,
  status: string,
  createdAt: string,
  updatedAt: string,
  ownerId: number,
  address: {
    id: number,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    venueId: number
  },
  images: [
    {
      id: number,
      url: string,
      venueId: number
    }
  ],
  owner: {
    name: string,
    email: string,
    createdAt: string
  }

}

export function VenueList() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [venues, setVenues] = useState<ApiVenue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVenues() {
      try {
        const response = await api.get("/venues")
        // the backend may return an array directly or inside a data property, etc.
        setVenues(response.data)
      } catch (err) {
        console.error("Failed to fetch venues", err)
      } finally {
        setLoading(false)
      }
    }
    loadVenues()
  }, [])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((fav) => String(fav) !== String(id)) : [...prevFavorites, id],
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (venues.length === 0) {
    return (
      <div className="text-center p-12 text-muted-foreground">
        Nenhum local encontrado.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <Card key={venue.id} className="overflow-hidden">
          <div className="relative h-48 bg-muted">
            <Image
              src={(venue.images && venue.images[0].url) || "/placeholder.svg?height=300&width=500"}
              alt={venue.name}
              fill
              className="object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background/90 rounded-full"
              onClick={(e) => toggleFavorite(String(venue.id), e)}
            >
              <Heart className={`h-5 w-5 ${favorites.includes(String(venue.id)) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Favoritar</span>
            </Button>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{venue.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {venue.address.city}, {venue.address.state}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{venue.description}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge variant="secondary" className="text-xs">
                Local
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  Capacidade p/ {venue.capacity} pessoas
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="font-semibold">
              R$ {Number(venue.basePrice).toLocaleString("pt-BR")}
            </div>
            <Link href={`/locais/${venue.id}`}>
              <Button>Ver detalhes</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
