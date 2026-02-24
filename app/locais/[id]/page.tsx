"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VenueContactForm } from "@/components/venue-contact-form"
import type { ApiVenue } from "@/components/venue-list"
import { api } from "@/lib/api"
import { ArrowLeft, Loader2, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function VenuePage() {
  const params = useParams()
  const [venue, setVenue] = useState<ApiVenue | null>(null)

  console.log(venue, "venue")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await api.get(`/venues/${params.id}`)
        setVenue(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (params.id) {
      fetchVenue()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h2 className="text-2xl font-bold">Local não encontrado</h2>
        <Link href="/locais" className="mt-4">
          <Button variant="outline">Voltar aos locais</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen pb-16">
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-muted">
        <Image src={(venue.images && venue.images.length > 0 && venue.images[0].url) ? venue.images[0].url : "/placeholder.svg?height=300&width=500"} alt={venue.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <Link href="/locais">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para resultados
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">{venue.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {venue.address.street}, {venue.address.city} - {venue.address.state}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">
                  Local
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="photos">Fotos</TabsTrigger>
                <TabsTrigger value="location">Localização</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Sobre o espaço</h2>
                  <p className="text-muted-foreground">{venue.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Capacidade</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="font-medium">Total: {venue.capacity} pessoas</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Preço Base</h3>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      R$ {Number(venue.basePrice).toLocaleString("pt-BR")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      O preço pode variar de acordo com a data, duração e serviços adicionais
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="photos">
                <h2 className="text-2xl font-semibold mb-4">Fotos do espaço</h2>
                {venue.images && venue.images.length > 0 ? (
                  <Dialog>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {venue.images.map((img, index) => (
                        <DialogTrigger key={img.id} asChild>
                          <div className="relative aspect-square sm:aspect-video bg-muted rounded-lg overflow-hidden border cursor-pointer group">
                            <Image src={img.url} alt={`${venue.name} - Foto ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        </DialogTrigger>
                      ))}
                    </div>

                    <DialogContent className="max-w-4xl w-[95vw] md:w-full p-4 md:p-10 border-none bg-black/60 backdrop-blur-sm">
                      <Carousel className="w-full max-w-4xl mx-auto relative group">
                        <CarouselContent>
                          {venue.images.map((img, index) => (
                            <CarouselItem key={img.id}>
                              <div className="relative aspect-[4/3] md:aspect-[16/9] w-full flex items-center justify-center rounded-lg overflow-hidden bg-black/40">
                                <Image src={img.url} alt={`${venue.name} - Foto ${index + 1}`} fill className="object-contain" />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 xl:-left-12 opacity-80 hover:opacity-100" />
                        <CarouselNext className="right-2 xl:-right-12 opacity-80 hover:opacity-100" />
                      </Carousel>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <p className="text-muted-foreground p-8 text-center border rounded-lg bg-muted/50">Nenhuma foto disponível para este espaço.</p>
                )}
              </TabsContent>
              <TabsContent value="location">
                <h2 className="text-2xl font-semibold mb-4">Localização</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {venue.address.street}, {venue.address.city} - {venue.address.state} / CEP: {venue.address.zipCode}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <div className="bg-muted p-6 rounded-lg sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Solicitar contato</h3>
              <VenueContactForm venue={venue} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
