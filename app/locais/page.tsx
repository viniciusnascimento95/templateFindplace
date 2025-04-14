import { SearchFilters } from "@/components/search-filters"
import { VenueList } from "@/components/venue-list"

export default function VenuesPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Locais para Eventos</h1>
          <p className="text-muted-foreground">Encontre o espaço perfeito para o seu próximo evento</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <SearchFilters />
        <VenueList />
      </div>
    </main>
  )
}
