import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Encontre o local perfeito para o seu evento
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Espaços para eventos corporativos, casamentos, reuniões, treinamentos e muito mais
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input type="text" placeholder="Buscar por cidade, bairro ou tipo de evento..." className="pl-10 h-12" />
            </div>
            <Button size="lg" className="h-12">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
