"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { Building2, Calendar, LogOut, MapPin, Menu, Search, User, Users, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 h-14 sm:h-16">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-brand-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold gradient-text">FindePlace</span>
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
            {!mounted ? (
              <div className="w-[150px] h-10" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-sm font-medium hover:text-brand-600 transition-colors flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={logout} className="text-gray-500 hover:text-red-600 transition-colors" title="Sair">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" className="border-brand-200 hover:bg-brand-50 bg-transparent" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button className="btn-gradient" asChild>
                  <Link href="/signup">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur dark:bg-gray-900/95 absolute top-full left-0 right-0 z-50">
          <div className="container py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="h-5 w-5 text-brand-600" />
              <span className="font-medium">Buscar</span>
            </Link>
            <Link
              href="/locais"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <Building2 className="h-5 w-5 text-brand-600" />
              <span className="font-medium">Locais</span>
            </Link>
            <Link
              href="/meus-eventos"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-base"
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
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-5 w-5 text-brand-600" />
              <span className="font-medium">Fornecedores</span>
            </Link>
            <Link
              href="/como-funciona"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Como Funciona</span>
            </Link>
            <Link
              href="/contato"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Contato</span>
            </Link>

            <div className="flex flex-col gap-3 pt-4 border-t">
              {!mounted ? null : user ? (
                <>
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-brand-900 dark:text-gray-100">{user.name}</span>
                      <span className="text-xs text-gray-500 truncate">{user.email}</span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 text-brand-600" />
                    <span className="font-medium">Meu Painel</span>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-transparent text-base h-11"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full border-brand-200 hover:bg-brand-50 bg-transparent text-base h-11"
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Entrar</Link>
                  </Button>
                  <Button className="w-full btn-gradient text-base h-11" asChild>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>Cadastrar</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
