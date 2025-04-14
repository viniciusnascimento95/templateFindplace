import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Menu } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FindePlace</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium">
            Início
          </Link>
          <Link href="/locais" className="text-sm font-medium">
            Locais
          </Link>
          <Link href="/como-funciona" className="text-sm font-medium">
            Como Funciona
          </Link>
          <Link href="/contato" className="text-sm font-medium">
            Contato
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Pesquisar</span>
          </Button>
          <ModeToggle />
          <Button variant="outline" className="hidden md:inline-flex">
            Entrar
          </Button>
          <Button className="hidden md:inline-flex">Cadastrar</Button>
        </div>
      </div>
    </header>
  )
}
