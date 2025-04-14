import { SearchFilters } from "@/components/search-filters"
import { VenueList } from "@/components/venue-list"
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Encontre o local perfeito para seu evento!</h2>
        <SearchFilters />
        <VenueList />
      </div>
    </main>
  )
}
