import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Calendar, MessageSquare, Building, CheckCircle } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Como Funciona o FindePlace</h1>
          <p className="text-muted-foreground">
            Entenda como nossa plataforma conecta você aos melhores espaços para eventos
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Introdução */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Encontre o local perfeito em poucos passos</h2>
          <p className="text-lg text-muted-foreground">
            O FindePlace simplifica a busca por espaços para eventos, conectando você diretamente com os melhores locais
            disponíveis para qualquer tipo de ocasião.
          </p>
        </div>

        {/* Passos para usuários */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">Para quem busca um local</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">1. Busque</h3>
                <p className="text-muted-foreground">
                  Use nossa ferramenta de busca para encontrar locais por cidade, bairro ou tipo de evento. Navegue
                  pelos resultados para ver opções que atendam às suas necessidades.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">2. Filtre</h3>
                <p className="text-muted-foreground">
                  Refine sua busca com nossos filtros avançados: preço, capacidade, infraestrutura, tipo de evento e
                  localização. Encontre exatamente o que você precisa.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">3. Contate</h3>
                <p className="text-muted-foreground">
                  Entre em contato diretamente com os proprietários dos espaços através do formulário de contato ou
                  informações disponibilizadas. Solicite orçamentos e tire suas dúvidas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Exemplo de uso */}
        <div className="bg-muted/40 rounded-lg p-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Encontre o espaço ideal para seu evento</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="font-medium">Eventos corporativos</strong>: Salas de reunião, auditórios e
                    espaços para treinamentos com toda infraestrutura necessária.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="font-medium">Casamentos e festas</strong>: Salões, chácaras e espaços ao ar livre
                    para celebrações inesquecíveis.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="font-medium">Reuniões e workshops</strong>: Espaços versáteis para pequenos e
                    médios grupos com equipamentos audiovisuais.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="font-medium">Treinamentos</strong>: Ambientes adequados para capacitações e
                    cursos com mesas, cadeiras e projetores.
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/locais">
                  <Button>Explorar locais</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Exemplo de espaço para eventos"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Para proprietários */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Para proprietários de espaços</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">1. Cadastre seu espaço</h3>
                <p className="text-muted-foreground">
                  Crie uma conta como proprietário e cadastre seu espaço com fotos, descrições detalhadas, capacidade,
                  preços e todos os recursos disponíveis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">2. Gerencie disponibilidade</h3>
                <p className="text-muted-foreground">
                  Mantenha sua agenda atualizada, gerencie reservas e disponibilidade do seu espaço para maximizar a
                  ocupação e evitar conflitos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">3. Receba solicitações</h3>
                <p className="text-muted-foreground">
                  Receba solicitações de orçamento diretamente dos interessados, responda rapidamente e aumente suas
                  chances de fechar negócios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Pronto para começar?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Seja você um organizador de eventos buscando o espaço perfeito ou um proprietário querendo anunciar seu
            local, o FindePlace é a plataforma ideal para conectar oferta e demanda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/locais">
              <Button size="lg">Buscar locais</Button>
            </Link>
            <Link href="/contato">
              <Button variant="outline" size="lg">
                Fale conosco
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
