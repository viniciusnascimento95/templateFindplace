import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Users, MapPin, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-40"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-brand-200 rounded-full blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-50 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-200 rounded-full blur-xl opacity-60 animate-pulse delay-500"></div>

      <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm border border-brand-200"
          >
            <Sparkles className="w-4 h-4 mr-2 text-brand-600" />
            Plataforma completa para eventos
          </Badge>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Organize eventos</span>
            <br />
            <span className="text-gray-900 dark:text-white">inesquecíveis</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Conectamos organizadores e fornecedores para criar experiências únicas. Encontre locais, gerencie orçamentos
            e organize seus eventos com facilidade.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex flex-col gap-3 p-3 sm:p-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por cidade, tipo de evento..."
                  className="pl-12 h-12 sm:h-14 border-0 bg-transparent text-base sm:text-lg placeholder:text-gray-500 focus-visible:ring-0"
                />
              </div>
              <Button
                size="lg"
                className="btn-gradient h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-xl"
              >
                Buscar
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Locais</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Fornecedores</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-success-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">5000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
