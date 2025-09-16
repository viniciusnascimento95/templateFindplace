"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SupplierFilters } from "@/components/supplier-filters"
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
  Filter,
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
              Fornecedores
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conecte-se com os melhores profissionais para tornar seu evento inesquecível
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar fornecedores..."
                className="pl-10 h-11 sm:h-12 bg-white/80 backdrop-blur-sm border-indigo-200 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none border-indigo-200 hover:bg-indigo-50 bg-transparent h-11"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filtros de Fornecedores</SheetTitle>
                    <SheetDescription>Refine sua busca por fornecedores</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <SupplierFilters />
                  </div>
                </SheetContent>
              </Sheet>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="flex-1 sm:w-[200px] h-11 bg-white/80 backdrop-blur-sm border-indigo-200">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Melhor Avaliação</SelectItem>
                  <SelectItem value="reviews">Mais Avaliações</SelectItem>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Buttons - Mobile Optimized */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-2 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border-indigo-200 hover:bg-indigo-50 bg-transparent"
                  }`}
                >
                  <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredSuppliers.map((supplier) => {
            const CategoryIcon = getCategoryIcon(supplier.category)
            return (
              <Card
                key={supplier.id}
                className="transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-1 sm:gap-2 truncate">
                          <span className="truncate">{supplier.name}</span>
                          {supplier.verified && (
                            <Award
                              className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 flex-shrink-0"
                              title="Fornecedor Verificado"
                            />
                          )}
                        </h3>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">
                            {supplier.location.neighborhood}, {supplier.location.city}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(supplier.id)}
                      className="text-gray-400 hover:text-red-500 h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${favorites.includes(supplier.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{supplier.description}</p>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-sm sm:text-base">{supplier.rating}</span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">({supplier.reviews})</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryLabel(supplier.category)}
                    </Badge>
                  </div>

                  {/* Services - Mobile Optimized */}
                  <div className="flex flex-wrap gap-1">
                    {supplier.services.slice(0, 2).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-indigo-200">
                        {service}
                      </Badge>
                    ))}
                    {supplier.services.length > 2 && (
                      <Badge variant="outline" className="text-xs border-indigo-200">
                        +{supplier.services.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Stats - Mobile Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Responde em {supplier.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{supplier.completedEvents} eventos</span>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    <span className="font-medium text-green-600 text-xs sm:text-sm">{supplier.priceRange}</span>
                  </div>

                  {/* Contact Buttons - Mobile Optimized */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4 border-t">
                    <div className="flex gap-2 sm:flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent text-xs sm:text-sm h-9 sm:h-8"
                      >
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Ligar</span>
                        <span className="sm:hidden">Tel</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent text-xs sm:text-sm h-9 sm:h-8"
                      >
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Email</span>
                        <span className="sm:hidden">Email</span>
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm h-9 sm:h-8 sm:flex-1"
                    >
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
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum fornecedor encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Tente ajustar os filtros ou termos de busca para encontrar fornecedores que atendam às suas necessidades.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              variant="outline"
              className="border-indigo-200 hover:bg-indigo-50"
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">É um fornecedor?</h3>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Cadastre-se na nossa plataforma e conecte-se com milhares de organizadores de eventos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
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
