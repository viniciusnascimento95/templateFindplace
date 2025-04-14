export type Venue = {
  id: string
  name: string
  description: string
  location: {
    city: string
    neighborhood: string
    address: string
  }
  price: {
    min: number
    max: number
  }
  capacity: {
    seated: number
    standing: number
  }
  features: string[]
  eventTypes: string[]
  rating: number
  reviews: number
  images: string[]
}

export const venues: Venue[] = [
  {
    id: "1",
    name: "Espaço Corporate Center",
    description:
      "Espaço moderno e sofisticado para eventos corporativos, com infraestrutura completa e localização privilegiada.",
    location: {
      city: "São Paulo",
      neighborhood: "Itaim Bibi",
      address: "Av. Brigadeiro Faria Lima, 3477",
    },
    price: {
      min: 5000,
      max: 15000,
    },
    capacity: {
      seated: 200,
      standing: 350,
    },
    features: ["ac", "wifi", "projector", "parking", "accessibility", "tables", "chairs", "kitchen"],
    eventTypes: ["corporate", "training", "meeting"],
    rating: 4.8,
    reviews: 124,
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    id: "2",
    name: "Villa Bisutti",
    description: "Espaço elegante e sofisticado para casamentos e eventos sociais, com jardim e decoração de luxo.",
    location: {
      city: "São Paulo",
      neighborhood: "Vila Olímpia",
      address: "Rua Casa do Ator, 577",
    },
    price: {
      min: 10000,
      max: 30000,
    },
    capacity: {
      seated: 350,
      standing: 500,
    },
    features: ["ac", "wifi", "parking", "accessibility", "tables", "chairs", "kitchen"],
    eventTypes: ["wedding", "party", "corporate"],
    rating: 4.9,
    reviews: 256,
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    id: "3",
    name: "Centro de Convenções Rebouças",
    description: "Centro de convenções com múltiplos auditórios e salas para eventos de grande porte e treinamentos.",
    location: {
      city: "São Paulo",
      neighborhood: "Pinheiros",
      address: "Av. Rebouças, 600",
    },
    price: {
      min: 3000,
      max: 20000,
    },
    capacity: {
      seated: 500,
      standing: 800,
    },
    features: ["ac", "wifi", "projector", "parking", "accessibility", "tables", "chairs"],
    eventTypes: ["corporate", "training", "meeting"],
    rating: 4.6,
    reviews: 189,
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    id: "4",
    name: "Espaço Jardins",
    description:
      "Espaço ao ar livre com área coberta, perfeito para eventos sociais e corporativos em ambiente natural.",
    location: {
      city: "São Paulo",
      neighborhood: "Jardins",
      address: "Rua Haddock Lobo, 1327",
    },
    price: {
      min: 4000,
      max: 12000,
    },
    capacity: {
      seated: 150,
      standing: 250,
    },
    features: ["wifi", "parking", "accessibility", "tables", "chairs", "kitchen"],
    eventTypes: ["wedding", "party", "corporate"],
    rating: 4.7,
    reviews: 98,
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    id: "5",
    name: "Tech Hub Coworking",
    description: "Espaço moderno de coworking com salas de reunião e auditório para eventos de tecnologia e startups.",
    location: {
      city: "São Paulo",
      neighborhood: "Vila Madalena",
      address: "Rua Girassol, 525",
    },
    price: {
      min: 1500,
      max: 5000,
    },
    capacity: {
      seated: 80,
      standing: 120,
    },
    features: ["ac", "wifi", "projector", "accessibility", "tables", "chairs"],
    eventTypes: ["meeting", "training", "corporate"],
    rating: 4.5,
    reviews: 76,
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
  {
    id: "6",
    name: "Mansão Eventos",
    description: "Mansão histórica com jardim e piscina, ideal para casamentos e eventos sociais de luxo.",
    location: {
      city: "São Paulo",
      neighborhood: "Morumbi",
      address: "Av. Giovanni Gronchi, 5700",
    },
    price: {
      min: 15000,
      max: 40000,
    },
    capacity: {
      seated: 300,
      standing: 500,
    },
    features: ["ac", "wifi", "parking", "accessibility", "tables", "chairs", "kitchen"],
    eventTypes: ["wedding", "party"],
    rating: 4.9,
    reviews: 145,
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  },
]
