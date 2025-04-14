import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Entre em Contato</h1>
          <p className="text-muted-foreground">
            Estamos aqui para ajudar você a encontrar o local perfeito para o seu evento
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">E-mail</h3>
                  <p className="text-muted-foreground">contato@findeplace.com.br</p>
                  <p className="text-muted-foreground">suporte@findeplace.com.br</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <p className="text-muted-foreground">(11) 99999-9999</p>
                  <p className="text-muted-foreground">(11) 3333-3333</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Endereço</h3>
                  <p className="text-muted-foreground">Av. Paulista, 1000 - Bela Vista</p>
                  <p className="text-muted-foreground">São Paulo - SP, 01310-100</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Horário de Atendimento</h3>
                  <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                  <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-3">Redes Sociais</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
            <ContactForm />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-medium text-lg mb-2">Como funciona o FindePlace?</h3>
              <p className="text-muted-foreground">
                O FindePlace é uma plataforma que conecta pessoas que buscam locais para eventos com proprietários de
                espaços. Você pode pesquisar, filtrar e entrar em contato diretamente com os responsáveis pelos locais.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-medium text-lg mb-2">É gratuito usar o FindePlace?</h3>
              <p className="text-muted-foreground">
                Sim, a busca e o contato com os locais são totalmente gratuitos para os usuários. Apenas os
                proprietários de espaços pagam uma taxa para anunciar seus locais na plataforma.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-medium text-lg mb-2">Como posso anunciar meu espaço?</h3>
              <p className="text-muted-foreground">
                Para anunciar seu espaço, basta criar uma conta como proprietário e seguir as instruções para cadastrar
                seu local. Você poderá adicionar fotos, descrições e todos os detalhes necessários.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-medium text-lg mb-2">Posso cancelar uma reserva?</h3>
              <p className="text-muted-foreground">
                As políticas de cancelamento variam de acordo com cada local. Recomendamos verificar as condições
                diretamente com o proprietário do espaço antes de confirmar sua reserva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
