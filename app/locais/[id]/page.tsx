import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { venues } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Star, Check, ArrowLeft } from "lucide-react"
import { VenueContactForm } from "@/components/venue-contact-form"

export default function VenuePage({ params }: { params: { id: string } }) {
  const venue = venues.find((v) => v.id === params.id)

  if (!venue) {
    notFound()
  }

  return (
    <main className="min-h-screen pb-16">
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image src={venue.images[0] || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
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
                {venue.location.address}, {venue.location.neighborhood}, {venue.location.city}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-4">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{venue.rating}</span>
                <span className="text-muted-foreground ml-1">({venue.reviews} avaliações)</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {venue.eventTypes.map((type) => (
                  <Badge key={type} variant="secondary">
                    {getEventTypeLabel(type)}
                  </Badge>
                ))}
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
                <TabsTrigger value="features">Infraestrutura</TabsTrigger>
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
                        <div className="font-medium">{venue.capacity.seated} pessoas</div>
                        <div className="text-sm text-muted-foreground">Sentadas</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border rounded-lg">
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="font-medium">{venue.capacity.standing} pessoas</div>
                        <div className="text-sm text-muted-foreground">Em pé</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Preço</h3>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold">
                      R$ {venue.price.min.toLocaleString("pt-BR")}
                      {venue.price.max > venue.price.min && (
                        <span className="text-muted-foreground font-normal">
                          {" "}
                          - R$ {venue.price.max.toLocaleString("pt-BR")}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      O preço pode variar de acordo com a data, duração e serviços adicionais
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Infraestrutura</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-primary" />
                      <span>{getFeatureLabel(feature)}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="location">
                <h2 className="text-2xl font-semibold mb-4">Localização</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {venue.location.address}, {venue.location.neighborhood}, {venue.location.city}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <div className="bg-muted p-6 rounded-lg sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Solicitar orçamento</h3>
              <VenueContactForm venue={venue} />
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div>
          <h2 className="text-2xl font-semibold mb-6">Outros espaços que podem te interessar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venues
              .filter((v) => v.id !== venue.id)
              .slice(0, 3)
              .map((relatedVenue) => (
                <Link key={relatedVenue.id} href={`/locais/${relatedVenue.id}`} className="group">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={relatedVenue.images[0] || "/placeholder.svg"}
                      alt={relatedVenue.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold mt-2">{relatedVenue.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>
                      {relatedVenue.location.neighborhood}, {relatedVenue.location.city}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
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

function getFeatureLabel(feature: string): string {
  const labels = {
    ac: "Ar-condicionado",
    wifi: "Internet/Wi-Fi",
    projector: "Projetor",
    kitchen: "Cozinha",
    parking: "Estacionamento",
    accessibility: "Acessibilidade",
    tables: "Mesas",
    chairs: "Cadeiras",
  }
  return labels[feature as keyof typeof labels] || feature
}
