"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { venues } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Users, Star, Heart } from "lucide-react"

export function VenueList() {
  const [favorites, setFavorites] = useState<string[]>([])

  // Garantir que a função toggleFavorite não cause re-renderizações inesperadas
  // Modificar a função toggleFavorite:

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter((fav) => fav !== id) : [...prevFavorites, id],
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((venue) => (
        <Card key={venue.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={venue.images[0] || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background/90 rounded-full"
              onClick={(e) => toggleFavorite(venue.id, e)}
            >
              <Heart className={`h-5 w-5 ${favorites.includes(venue.id) ? "fill-red-500 text-red-500" : ""}`} />
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
                    {venue.location.neighborhood}, {venue.location.city}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{venue.rating}</span>
                <span className="text-muted-foreground text-xs ml-1">({venue.reviews})</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{venue.description}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {venue.eventTypes.slice(0, 3).map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {getEventTypeLabel(type)}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  Até {venue.capacity.seated} sentados / {venue.capacity.standing} em pé
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="font-semibold">
              R$ {venue.price.min.toLocaleString("pt-BR")}
              {venue.price.max > venue.price.min && (
                <span className="text-muted-foreground font-normal">
                  {" "}
                  - R$ {venue.price.max.toLocaleString("pt-BR")}
                </span>
              )}
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

function getEventTypeLabel(type: string): string {
  const labels = {
    corporate: "Corporativo",
    wedding: "Casamento",
    training: "Treinamento",
    meeting: "Reunião",
    party: "Festa",
  }
  return labels[type as keyof typeof labels] || type
}
