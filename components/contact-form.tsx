"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [subject, setSubject] = useState<string>("")

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
      <div className="text-center py-6 border rounded-lg p-8">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Mensagem enviada!</h3>
        <p className="text-muted-foreground mb-4">
          Agradecemos seu contato. Nossa equipe responderá o mais breve possível.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Enviar nova mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Telefone
        </label>
        <Input id="phone" placeholder="(11) 99999-9999" />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          Assunto
        </label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger id="subject">
            <SelectValue placeholder="Selecione um assunto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="info">Informações gerais</SelectItem>
            <SelectItem value="support">Suporte</SelectItem>
            <SelectItem value="partnership">Parcerias</SelectItem>
            <SelectItem value="suggestion">Sugestões</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensagem
        </label>
        <Textarea id="message" placeholder="Digite sua mensagem aqui..." rows={5} required />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  )
}
