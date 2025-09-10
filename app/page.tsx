import { SearchFilters } from "@/components/search-filters"
import { VenueList } from "@/components/venue-list"
import { Hero } from "@/components/hero"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Locais em Destaque</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra os espaços mais procurados para seu próximo evento
          </p>
        </div>
        <SearchFilters />
        <VenueList />
      </div>
    </main>
  )
}
