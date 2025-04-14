"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { Venue } from "@/lib/data"

interface VenueContactFormProps {
  venue: Venue
}

export function VenueContactForm({ venue }: VenueContactFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulando envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Solicitação enviada!</h3>
        <p className="text-muted-foreground mb-4">
          Sua solicitação de orçamento para {venue.name} foi enviada com sucesso. Em breve entraremos em contato.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Enviar nova solicitação
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nome
        </label>
        <Input id="name" placeholder="Seu nome completo" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <Input id="email" type="email" placeholder="seu@email.com" required />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Telefone
        </label>
        <Input id="phone" placeholder="(11) 99999-9999" required />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Data do evento
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              type="button"
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
        <label htmlFor="guests" className="block text-sm font-medium mb-1">
          Número de convidados
        </label>
        <Input id="guests" type="number" placeholder="50" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensagem
        </label>
        <Textarea
          id="message"
          placeholder="Descreva seu evento e quaisquer necessidades específicas"
          rows={4}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Solicitar orçamento"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, você concorda com nossos Termos de Serviço e Política de Privacidade.
      </p>
    </form>
  )
}
