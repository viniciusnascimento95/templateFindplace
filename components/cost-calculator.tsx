"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Users, DollarSign, TrendingUp } from "lucide-react"

interface CostCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

export function CostCalculator({ isOpen, onClose }: CostCalculatorProps) {
  const [guests, setGuests] = useState<number>(100)
  const [eventType, setEventType] = useState<string>("")
  const [style, setStyle] = useState<string>("")
  const [budget, setBudget] = useState<number>(0)

  const calculateEstimate = () => {
    let basePrice = 0

    // Preço base por tipo de evento
    switch (eventType) {
      case "wedding":
        basePrice = 300
        break
      case "corporate":
        basePrice = 150
        break
      case "birthday":
        basePrice = 100
        break
      case "graduation":
        basePrice = 120
        break
      default:
        basePrice = 150
    }

    // Multiplicador por estilo
    let styleMultiplier = 1
    switch (style) {
      case "luxury":
        styleMultiplier = 2.5
        break
      case "formal":
        styleMultiplier = 1.8
        break
      case "modern":
        styleMultiplier = 1.5
        break
      case "rustic":
        styleMultiplier = 1.3
        break
      case "casual":
        styleMultiplier = 1
        break
      default:
        styleMultiplier = 1.2
    }

    return Math.round(basePrice * guests * styleMultiplier)
  }

  const estimate = calculateEstimate()

  const breakdown = {
    venue: Math.round(estimate * 0.35),
    food: Math.round(estimate * 0.3),
    decoration: Math.round(estimate * 0.15),
    entertainment: Math.round(estimate * 0.1),
    photography: Math.round(estimate * 0.1),
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Calculadora de Custos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Número de Convidados
              </label>
              <Input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Evento</label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Casamento</SelectItem>
                  <SelectItem value="corporate">Evento Corporativo</SelectItem>
                  <SelectItem value="birthday">Aniversário</SelectItem>
                  <SelectItem value="graduation">Formatura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estilo do Evento</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="luxury">Luxo</SelectItem>
                  <SelectItem value="rustic">Rústico</SelectItem>
                  <SelectItem value="modern">Moderno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Seu Orçamento (R$)
              </label>
              <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                placeholder="25000"
              />
            </div>
          </div>

          {eventType && style && guests > 0 && (
            <div className="space-y-4">
              <Card className="border-brand-200 bg-gradient-to-r from-brand-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-brand-600" />
                    Estimativa de Custo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">R$ {estimate.toLocaleString("pt-BR")}</div>
                    <div className="text-sm text-gray-600">
                      Aproximadamente R$ {Math.round(estimate / guests)} por convidado
                    </div>
                    {budget > 0 && (
                      <div
                        className={`mt-2 text-sm font-medium ${
                          budget >= estimate ? "text-success-600" : "text-warning-600"
                        }`}
                      >
                        {budget >= estimate
                          ? `✓ Dentro do orçamento (sobra R$ ${(budget - estimate).toLocaleString("pt-BR")})`
                          : `⚠ Acima do orçamento (falta R$ ${(estimate - budget).toLocaleString("pt-BR")})`}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição Estimada dos Custos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "Local/Espaço", value: breakdown.venue, color: "bg-brand-500" },
                      { label: "Alimentação", value: breakdown.food, color: "bg-purple-500" },
                      { label: "Decoração", value: breakdown.decoration, color: "bg-pink-500" },
                      { label: "Entretenimento", value: breakdown.entertainment, color: "bg-blue-500" },
                      { label: "Fotografia", value: breakdown.photography, color: "bg-green-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${item.color}`}></div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <div className="text-sm font-semibold">R$ {item.value.toLocaleString("pt-BR")}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Dicas para economizar:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Considere eventos em dias da semana para descontos</li>
                  <li>• Negocie pacotes fechados com fornecedores</li>
                  <li>• Opte por decorações sazonais e locais</li>
                  <li>• Compare pelo menos 3 orçamentos para cada serviço</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
