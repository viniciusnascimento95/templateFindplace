"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Users, MapPin, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface EventCreationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EventCreationModal({ isOpen, onClose }: EventCreationModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [eventType, setEventType] = useState<string>("")
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Aqui você implementaria a lógica de criação do evento
    console.log("Evento criado!")
    onClose()
    setStep(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">Criar Novo Evento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step >= stepNumber ? "bg-brand-600 text-white" : "bg-gray-200 text-gray-600",
                  )}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={cn("w-12 h-0.5 mx-2", step > stepNumber ? "bg-brand-600" : "bg-gray-200")} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Informações Básicas */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Básicas</h3>

              <div>
                <label className="block text-sm font-medium mb-2">Nome do Evento</label>
                <Input placeholder="Ex: Casamento Sarah & João" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Evento</label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de evento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Casamento</SelectItem>
                    <SelectItem value="corporate">Evento Corporativo</SelectItem>
                    <SelectItem value="birthday">Aniversário</SelectItem>
                    <SelectItem value="graduation">Formatura</SelectItem>
                    <SelectItem value="conference">Conferência</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Data do Evento</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição (Opcional)</label>
                <Textarea placeholder="Descreva seu evento..." rows={3} />
              </div>
            </div>
          )}

          {/* Step 2: Local e Convidados */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Local e Convidados</h3>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Local Preferido
                </label>
                <Input placeholder="Ex: São Paulo, SP ou nome do local" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Número de Convidados
                  </label>
                  <Input type="number" placeholder="150" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estilo do Evento</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Período do Evento</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Manhã (8h - 12h)</SelectItem>
                    <SelectItem value="afternoon">Tarde (12h - 18h)</SelectItem>
                    <SelectItem value="evening">Noite (18h - 23h)</SelectItem>
                    <SelectItem value="late">Madrugada (23h - 2h)</SelectItem>
                    <SelectItem value="all-day">Dia todo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Orçamento */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Orçamento e Finalização</h3>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  Orçamento Total (R$)
                </label>
                <Input type="number" placeholder="25000" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Prioridades</label>
                <div className="space-y-2">
                  {[
                    "Local/Espaço",
                    "Alimentação",
                    "Decoração",
                    "Música/Entretenimento",
                    "Fotografia/Filmagem",
                    "Transporte",
                  ].map((priority) => (
                    <label key={priority} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Observações Especiais</label>
                <Textarea
                  placeholder="Alguma necessidade especial, restrições alimentares, acessibilidade, etc."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={step === 1 ? onClose : handlePrevious}>
              {step === 1 ? "Cancelar" : "Anterior"}
            </Button>

            <Button onClick={step === 3 ? handleSubmit : handleNext} className="btn-gradient">
              {step === 3 ? "Criar Evento" : "Próximo"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
