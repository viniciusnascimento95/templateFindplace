"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Star,
  Users,
  Camera,
  Music,
  Utensils,
  Car,
  Flower,
  Cake,
  Heart,
  Phone,
  Mail,
  Award,
  Clock,
  DollarSign,
} from "lucide-react"

// Mock data para fornecedores
const mockSuppliers = [
  {
    id: "1",
    name: "Fotografia Momentos",
    category: "photography",
    description: "Especialistas em fotografia de casamentos e eventos corporativos com mais de 10 anos de experiência.",
    location: {
      city: "São Paulo",
      neighborhood: "Vila Madalena",
    },
    rating: 4.9,
    reviews: 156,
    priceRange: "R$ 2.000 - R$ 8.000",
    services: ["Fotografia", "Filmagem", "Drone", "Álbum"],
    portfolio: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    contact: {
      phone: "(11) 99999-1234",
      email: "contato@fotografiamomentos.com",
      website: "www.fotografiamomentos.com",
    },
    verified: true,
    responseTime: "2 horas",
    completedEvents: 250,
  },
  {
    id: "2",
    name: "Catering Delícias",
    category: "catering",
    description: "Buffet completo para eventos de todos os tamanhos, com cardápios personalizados e serviço impecável.",
    location: {
      city: "São Paulo",
      neighborhood: "Itaim Bibi",
    },
    rating: 4.8,
    reviews: 203,
    priceRange: "R$ 45 - R$ 120 por pessoa",
    services: ["Buffet Completo", "Coquetel", "Coffee Break", "Sobremesas"],
    portfolio: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    contact: {
      phone: "(11) 99999-5678",
      email: "eventos@cateringdelicias.com",
      website: "www.cateringdelicias.com",
    },
    verified: true,
    responseTime: "1 hora",
    completedEvents: 180,
  },
  {
    id: "3",
    name: "DJ Music Pro",
    category: "entertainment",
    description: "DJs profissionais e equipamentos de som de alta qualidade para todos os tipos de eventos.",
    location: {
      city: "São Paulo",
      neighborhood: "Pinheiros",
    },
    rating: 4.7,
    reviews: 89,
    priceRange: "R$ 800 - R$ 3.500",
    services: ["DJ", "Som", "Iluminação", "Karaokê"],
    portfolio: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    contact: {
      phone: "(11) 99999-9012",
      email: "contato@djmusicpro.com",
      website: "www.djmusicpro.com",
    },
    verified: true,
    responseTime: "3 horas",
    completedEvents: 120,
  },
  {
    id: "4",
    name: "Flores & Decoração",
    category: "decoration",
    description: "Decoração floral e cenográfica para casamentos e eventos especiais com toque artístico único.",
    location: {
      city: "São Paulo",
      neighborhood: "Jardins",
    },
    rating: 4.9,
    reviews: 134,
    priceRange: "R$ 1.500 - R$ 12.000",
    services: ["Arranjos Florais", "Decoração", "Cenografia", "Mobiliário"],
    portfolio: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    contact: {
      phone: "(11) 99999-3456",
      email: "contato@floresdecoração.com",
      website: "www.floresdecoração.com",
    },
    verified: true,
    responseTime: "4 horas",
    completedEvents: 95,
  },
  {
    id: "5",
    name: "Transporte VIP",
    category: "transport",
    description: "Frota de veículos executivos e ônibus para transporte de convidados em eventos corporativos.",
    location: {
      city: "São Paulo",
      neighborhood: "Morumbi",
    },
    rating: 4.6,
    reviews: 67,
    priceRange: "R$ 200 - R$ 800 por veículo",
    services: ["Carros Executivos", "Ônibus", "Van", "Motorista"],
    portfolio: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    contact: {
      phone: "(11) 99999-7890",
      email: "reservas@transportevip.com",
      website: "www.transportevip.com",
    },
    verified: false,
    responseTime: "6 horas",
    completedEvents: 75,
  },
  {
    id: "6",
    name: "Doces & Bolos Artesanais",
    category: "desserts",
    description: "Confeitaria especializada em bolos de casamento e doces finos para eventos sofisticados.",
    location: {
      city: "São Paulo",
      neighborhood: "Vila Olímpia",
    },
    rating: 4.8,
    reviews: 112,
    priceRange: "R$ 15 - R$ 45 por pessoa",
    services: ["Bolos de Casamento", "Doces Finos", "Cupcakes", "Macarons"],
    portfolio: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    contact: {
      phone: "(11) 99999-2468",
      email: "pedidos@docesbolos.com",
      website: "www.docesbolos.com",
    },
    verified: true,
    responseTime: "2 horas",
    completedEvents: 160,
  },
]

const categories = [
  { id: "all", label: "Todos", icon: Users },
  { id: "photography", label: "Fotografia", icon: Camera },
  { id: "catering", label: "Buffet", icon: Utensils },
  { id: "entertainment", label: "Entretenimento", icon: Music },
  { id: "decoration", label: "Decoração", icon: Flower },
  { id: "transport", label: "Transporte", icon: Car },
  { id: "desserts", label: "Doces", icon: Cake },
]

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(mockSuppliers)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const filteredSuppliers = suppliers
    .filter((supplier) => {
      const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory
      const matchesSearch =
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.icon : Users
  }

  const getCategoryLabel = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.label : "Outros"
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Fornecedores</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conecte-se com os melhores profissionais para tornar seu evento inesquecível
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar fornecedores, serviços ou especialidades..."
                className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-brand-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] h-12 bg-white/80 backdrop-blur-sm border-brand-200">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Melhor Avaliação</SelectItem>
                <SelectItem value="reviews">Mais Avaliações</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 bg-white/80 backdrop-blur-sm border border-brand-200">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-brand-600 data-[state=active]:text-white"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            {filteredSuppliers.length} fornecedor{filteredSuppliers.length !== 1 ? "es" : ""} encontrado
            {filteredSuppliers.length !== 1 ? "s" : ""}
            {selectedCategory !== "all" && ` em ${getCategoryLabel(selectedCategory)}`}
          </p>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuppliers.map((supplier) => {
            const CategoryIcon = getCategoryIcon(supplier.category)
            return (
              <Card key={supplier.id} className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <CategoryIcon className="h-6 w-6 text-brand-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          {supplier.name}
                          {supplier.verified && (
                            <Award className="h-5 w-5 text-brand-600" title="Fornecedor Verificado" />
                          )}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4" />
                          {supplier.location.neighborhood}, {supplier.location.city}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(supplier.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.includes(supplier.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{supplier.description}</p>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{supplier.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">({supplier.reviews} avaliações)</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryLabel(supplier.category)}
                    </Badge>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1">
                    {supplier.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-brand-200">
                        {service}
                      </Badge>
                    ))}
                    {supplier.services.length > 3 && (
                      <Badge variant="outline" className="text-xs border-brand-200">
                        +{supplier.services.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>Responde em {supplier.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{supplier.completedEvents} eventos</span>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-success-600" />
                    <span className="font-medium text-success-600">{supplier.priceRange}</span>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button size="sm" className="flex-1 btn-gradient">
                      Ver Perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Nenhum fornecedor encontrado</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Tente ajustar os filtros ou termos de busca para encontrar fornecedores que atendam às suas necessidades.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              variant="outline"
              className="border-brand-200 hover:bg-brand-50"
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">É um fornecedor?</h3>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Cadastre-se na nossa plataforma e conecte-se com milhares de organizadores de eventos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-brand-600 hover:bg-gray-100">
                Cadastrar como Fornecedor
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
