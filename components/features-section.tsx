import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, Calculator, CreditCard, Shield, Mail, TrendingUp, Users, MapPin, Clock } from "lucide-react"

export function FeaturesSection() {
  const organizerFeatures = [
    {
      icon: Search,
      title: "Busca Avançada",
      description:
        "Encontre locais e fornecedores com filtros inteligentes por localização, preço, capacidade e muito mais.",
    },
    {
      icon: Calendar,
      title: "Meus Eventos",
      description:
        "Organize todos os seus eventos em um só lugar. Gerencie fornecedores, orçamentos e listas de convidados.",
    },
    {
      icon: Calculator,
      title: "Calculadoras Inteligentes",
      description: "Estime custos e quantidade de bebidas com base no tipo de evento, número de convidados e estilo.",
    },
    {
      icon: Mail,
      title: "RSVP Automático",
      description: "Envie convites e gerencie confirmações via email e WhatsApp de forma automatizada.",
    },
    {
      icon: Clock,
      title: "Contagem Regressiva",
      description: "Acompanhe o tempo restante para seu evento e prazos de pagamento dos fornecedores.",
    },
    {
      icon: CreditCard,
      title: "Pagamento Seguro",
      description: "Pague fornecedores através da plataforma com garantia de entrega do produto ou serviço.",
    },
  ]

  const supplierFeatures = [
    {
      icon: MapPin,
      title: "Cadastro de Locais",
      description: "Cadastre seus espaços com fotos, descrições detalhadas e disponibilidade em tempo real.",
    },
    {
      icon: TrendingUp,
      title: "Anúncios Patrocinados",
      description: "Destaque seus serviços e alcance mais clientes com anúncios direcionados.",
    },
    {
      icon: Users,
      title: "Gestão de Clientes",
      description: "Gerencie leads, orçamentos e contratos em uma interface intuitiva.",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Envie campanhas segmentadas para públicos específicos e aumente suas vendas.",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Para Organizadores */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Para <span className="gradient-text">Organizadores</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ferramentas completas para planejar e executar eventos perfeitos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {organizerFeatures.map((feature, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-100 to-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Para Fornecedores */}
        <div className="bg-gradient-to-br from-brand-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Para <span className="gradient-text">Fornecedores</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Conecte-se com clientes e faça seu negócio crescer
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {supplierFeatures.map((feature, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white">
            <Shield className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 opacity-90" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Segurança e Garantia</h3>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-4 sm:mb-6 max-w-2xl mx-auto">
              Todos os pagamentos são protegidos e garantimos a entrega dos serviços contratados. Sua tranquilidade é
              nossa prioridade.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm sm:text-base">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm sm:text-base">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Garantia de Entrega</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm sm:text-base">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
