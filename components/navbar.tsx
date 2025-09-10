"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Menu, X, Calendar, Users, Building2 } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FindePlace</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-brand-600 transition-colors flex items-center gap-2">
            <Search className="h-4 w-4" />
            Buscar
          </Link>
          <Link
            href="/locais"
            className="text-sm font-medium hover:text-brand-600 transition-colors flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            Locais
          </Link>
          <Link
            href="/meus-eventos"
            className="text-sm font-medium hover:text-brand-600 transition-colors flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Meus Eventos
            <Badge variant="secondary" className="ml-1 text-xs">
              Novo
            </Badge>
          </Link>
          <Link
            href="/fornecedores"
            className="text-sm font-medium hover:text-brand-600 transition-colors flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Fornecedores
          </Link>
          <Link href="/como-funciona" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Como Funciona
          </Link>
          <Link href="/contato" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Contato
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>

          <ModeToggle />

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" className="border-brand-200 hover:bg-brand-50 bg-transparent">
              Entrar
            </Button>
            <Button className="btn-gradient">Cadastrar</Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur dark:bg-gray-900/95">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="h-5 w-5 text-brand-600" />
              <span className="font-medium">Buscar</span>
            </Link>
            <Link
              href="/locais"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Building2 className="h-5 w-5 text-brand-600" />
              <span className="font-medium">Locais</span>
            </Link>
            <Link
              href="/meus-eventos"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-5 w-5 text-brand-600" />
              <span className="font-medium">Meus Eventos</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                Novo
              </Badge>
            </Link>
            <Link
              href="/fornecedores"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-5 w-5 text-brand-600" />
              <span className="font-medium">Fornecedores</span>
            </Link>
            <Link
              href="/como-funciona"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Como Funciona</span>
            </Link>
            <Link
              href="/contato"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Contato</span>
            </Link>

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" className="flex-1 border-brand-200 hover:bg-brand-50 bg-transparent">
                Entrar
              </Button>
              <Button className="flex-1 btn-gradient">Cadastrar</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
