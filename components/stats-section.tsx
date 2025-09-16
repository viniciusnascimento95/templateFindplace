import { TrendingUp, Users, MapPin, Star } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: MapPin,
      number: "500+",
      label: "Locais Cadastrados",
      description: "Espaços verificados em todo o Brasil",
    },
    {
      icon: Users,
      number: "1.000+",
      label: "Fornecedores Ativos",
      description: "Profissionais qualificados e avaliados",
    },
    {
      icon: TrendingUp,
      number: "5.000+",
      label: "Eventos Realizados",
      description: "Eventos bem-sucedidos através da plataforma",
    },
    {
      icon: Star,
      number: "4.9",
      label: "Avaliação Média",
      description: "Satisfação dos nossos usuários",
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-brand-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Números que Impressionam</h2>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
            Milhares de eventos realizados com sucesso através da nossa plataforma
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">{stat.label}</div>
              <div className="text-xs sm:text-sm lg:text-base text-white/80">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
