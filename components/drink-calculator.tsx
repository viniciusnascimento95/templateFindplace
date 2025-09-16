"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wine, Users, Clock, Thermometer } from "lucide-react"

interface DrinkCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

export function DrinkCalculator({ isOpen, onClose }: DrinkCalculatorProps) {
  const [guests, setGuests] = useState<number>(100)
  const [duration, setDuration] = useState<number>(4)
  const [season, setSeason] = useState<string>("")
  const [eventType, setEventType] = useState<string>("")

  const calculateDrinks = () => {
    if (!season || !eventType || guests === 0 || duration === 0) return null

    // Multiplicadores baseados na estação
    const seasonMultiplier = {
      summer: { beer: 1.5, wine: 0.8, spirits: 1.2, water: 2, soft: 1.3 },
      winter: { beer: 0.8, wine: 1.3, spirits: 1.1, water: 1, soft: 0.8 },
      spring: { beer: 1.2, wine: 1.1, spirits: 1, water: 1.2, soft: 1.1 },
      autumn: { beer: 1, wine: 1.2, spirits: 1, water: 1, soft: 1 },
    }[season] || { beer: 1, wine: 1, spirits: 1, water: 1, soft: 1 }

    // Multiplicadores baseados no tipo de evento
    const eventMultiplier = {
      wedding: { beer: 1.2, wine: 1.5, spirits: 1.3, water: 1, soft: 0.8 },
      corporate: { beer: 0.8, wine: 1.2, spirits: 0.7, water: 1.5, soft: 1.2 },
      birthday: { beer: 1.3, wine: 1, spirits: 1.4, water: 1, soft: 1.3 },
      casual: { beer: 1.5, wine: 0.8, spirits: 1.2, water: 1, soft: 1.4 },
    }[eventType] || { beer: 1, wine: 1, spirits: 1, water: 1, soft: 1 }

    // Consumo base por pessoa por hora
    const baseConsumption = {
      beer: 0.3, // litros
      wine: 0.15, // litros
      spirits: 0.05, // litros
      water: 0.2, // litros
      soft: 0.2, // litros
    }

    const results = {
      beer: Math.ceil(guests * duration * baseConsumption.beer * seasonMultiplier.beer * eventMultiplier.beer),
      wine: Math.ceil(guests * duration * baseConsumption.wine * seasonMultiplier.wine * eventMultiplier.wine),
      spirits: Math.ceil(
        guests * duration * baseConsumption.spirits * seasonMultiplier.spirits * eventMultiplier.spirits,
      ),
      water: Math.ceil(guests * duration * baseConsumption.water * seasonMultiplier.water * eventMultiplier.water),
      soft: Math.ceil(guests * duration * baseConsumption.soft * seasonMultiplier.soft * eventMultiplier.soft),
    }

    return {
      beer: { liters: results.beer, bottles: Math.ceil(results.beer / 0.35) }, // garrafas de 350ml
      wine: { liters: results.wine, bottles: Math.ceil(results.wine / 0.75) }, // garrafas de 750ml
      spirits: { liters: results.spirits, bottles: Math.ceil(results.spirits / 1) }, // garrafas de 1L
      water: { liters: results.water, bottles: Math.ceil(results.water / 0.5) }, // garrafas de 500ml
      soft: { liters: results.soft, bottles: Math.ceil(results.soft / 0.35) }, // latas de 350ml
    }
  }

  const drinkEstimate = calculateDrinks()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text flex items-center gap-2">
            <Wine className="h-6 w-6" />
            Calculadora de Bebidas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Número de Convidados
              </label>
              <Input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                placeholder="100"
                className="w-full"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Duração (horas)
              </label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="4"
                className="w-full"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium mb-2">
                <Thermometer className="inline h-4 w-4 mr-1" />
                Época do Ano
              </label>
              <Select value={season} onValueChange={setSeason} className="w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a época" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">Verão</SelectItem>
                  <SelectItem value="winter">Inverno</SelectItem>
                  <SelectItem value="spring">Primavera</SelectItem>
                  <SelectItem value="autumn">Outono</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium mb-2">Tipo de Evento</label>
              <Select value={eventType} onValueChange={setEventType} className="w-full">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Casamento</SelectItem>
                  <SelectItem value="corporate">Evento Corporativo</SelectItem>
                  <SelectItem value="birthday">Aniversário</SelectItem>
                  <SelectItem value="casual">Evento Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {drinkEstimate && (
            <div className="space-y-4">
              <Card className="border-brand-200 bg-gradient-to-r from-brand-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-xl">Estimativa de Bebidas</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                          <span className="font-medium">Cerveja</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{drinkEstimate.beer.bottles} garrafas</div>
                          <div className="text-sm text-gray-600">{drinkEstimate.beer.liters}L</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span className="font-medium">Vinho</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{drinkEstimate.wine.bottles} garrafas</div>
                          <div className="text-sm text-gray-600">{drinkEstimate.wine.liters}L</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-amber-600 rounded"></div>
                          <span className="font-medium">Destilados</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{drinkEstimate.spirits.bottles} garrafas</div>
                          <div className="text-sm text-gray-600">{drinkEstimate.spirits.liters}L</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="font-medium">Água</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{drinkEstimate.water.bottles} garrafas</div>
                          <div className="text-sm text-gray-600">{drinkEstimate.water.liters}L</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="font-medium">Refrigerantes</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{drinkEstimate.soft.bottles} latas</div>
                          <div className="text-sm text-gray-600">{drinkEstimate.soft.liters}L</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-brand-100 rounded-lg border-2 border-brand-200">
                        <span className="font-semibold text-brand-800">Gelo Estimado</span>
                        <div className="text-right">
                          <div className="font-bold text-brand-800">{Math.ceil(guests * 0.5)}kg</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">⚠️ Dicas importantes:</h4>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  <li>• Sempre compre 10-15% a mais para garantir</li>
                  <li>• Considere as preferências do seu público</li>
                  <li>• Tenha opções sem álcool para todos</li>
                  <li>• Mantenha as bebidas na temperatura ideal</li>
                  <li>• Calcule gelo extra para dias quentes</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline" className="w-full sm:w-auto bg-transparent">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
