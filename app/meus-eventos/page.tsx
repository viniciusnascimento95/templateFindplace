"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Plus,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calculator,
  Mail,
  MessageSquare,
} from "lucide-react"
import { EventCreationModal } from "@/components/event-creation-modal"
import { CostCalculator } from "@/components/cost-calculator"
import { DrinkCalculator } from "@/components/drink-calculator"

// Mock data para eventos
const mockEvents = [
  {
    id: "1",
    name: "Casamento Sarah & João",
    date: "2024-06-15",
    location: "Villa Bisutti",
    guests: 150,
    budget: 45000,
    spent: 32000,
    status: "planning",
    progress: 70,
    countdown: 45,
    tasks: {
      completed: 12,
      total: 18,
    },
  },
  {
    id: "2",
    name: "Evento Corporativo Tech Summit",
    date: "2024-04-20",
    location: "Centro de Convenções",
    guests: 300,
    budget: 25000,
    spent: 18500,
    status: "confirmed",
    progress: 85,
    countdown: 15,
    tasks: {
      completed: 15,
      total: 17,
    },
  },
  {
    id: "3",
    name: "Aniversário 30 anos",
    date: "2024-07-10",
    location: "A definir",
    guests: 80,
    budget: 8000,
    spent: 2500,
    status: "draft",
    progress: 25,
    countdown: 90,
    tasks: {
      completed: 3,
      total: 12,
    },
  },
]

export default function MyEventsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showCostCalculator, setShowCostCalculator] = useState(false)
  const [showDrinkCalculator, setShowDrinkCalculator] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success-100 text-success-800 border-success-200"
      case "planning":
        return "bg-warning-100 text-warning-800 border-warning-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "planning":
        return "Planejando"
      case "draft":
        return "Rascunho"
      default:
        return "Desconhecido"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Meus Eventos</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Gerencie todos os seus eventos em um só lugar
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCostCalculator(true)}
              className="border-brand-200 hover:bg-brand-50 text-xs sm:text-sm h-10 sm:h-auto"
            >
              <Calculator className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Calculadora de Custos</span>
              <span className="sm:hidden">Custos</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDrinkCalculator(true)}
              className="border-brand-200 hover:bg-brand-50 text-xs sm:text-sm h-10 sm:h-auto"
            >
              <Calculator className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Calculadora de Bebidas</span>
              <span className="sm:hidden">Bebidas</span>
            </Button>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-gradient text-xs sm:text-sm h-10 sm:h-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total de Eventos</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{events.length}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Próximo Evento</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">15 dias</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-warning-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Convidados</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">530</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Orçamento Total</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">R$ 78k</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-success-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200">
            <TabsTrigger value="all">Todos os Eventos</TabsTrigger>
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            <TabsTrigger value="planning">Em Planejamento</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event.id} className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
                      <div className="space-y-2">
                        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                          {event.name}
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            {new Date(event.date).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                            {event.guests} convidados
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-start">
                        <Badge className={`${getStatusColor(event.status)} border text-xs`}>
                          {getStatusLabel(event.status)}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progresso do planejamento</span>
                        <span className="font-medium">{event.progress}%</span>
                      </div>
                      <Progress value={event.progress} className="h-2" />
                    </div>

                    {/* Stats Grid - Mobile Optimized */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                      <div className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-brand-600">{event.countdown}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">dias restantes</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-success-600">
                          {event.tasks.completed}/{event.tasks.total}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">tarefas concluídas</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-warning-600">
                          R$ {(event.spent / 1000).toFixed(0)}k
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">gasto até agora</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-purple-600">
                          R$ {(event.budget / 1000).toFixed(0)}k
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">orçamento total</div>
                      </div>
                    </div>

                    {/* Action Buttons - Mobile Optimized */}
                    <div className="grid grid-cols-2 sm:flex gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm" className="bg-transparent text-xs sm:text-sm h-9 sm:h-auto">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Ver Tarefas</span>
                        <span className="sm:hidden">Tarefas</span>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent text-xs sm:text-sm h-9 sm:h-auto">
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Orçamentos</span>
                        <span className="sm:hidden">Orçam.</span>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent text-xs sm:text-sm h-9 sm:h-auto">
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">RSVP</span>
                        <span className="sm:hidden">RSVP</span>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent text-xs sm:text-sm h-9 sm:h-auto">
                        <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Fornecedores</span>
                        <span className="sm:hidden">Fornec.</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Próximos eventos</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Eventos que acontecerão nos próximos 30 dias aparecerão aqui.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="planning">
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Eventos em planejamento</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Eventos que ainda estão sendo organizados aparecerão aqui.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Eventos concluídos</h3>
              <p className="text-gray-600 dark:text-gray-400">Eventos que já aconteceram aparecerão aqui.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <EventCreationModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <CostCalculator isOpen={showCostCalculator} onClose={() => setShowCostCalculator(false)} />
      <DrinkCalculator isOpen={showDrinkCalculator} onClose={() => setShowDrinkCalculator(false)} />
    </main>
  )
}
