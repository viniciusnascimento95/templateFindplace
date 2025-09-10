"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Filter, X, MapPin, Star, DollarSign } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function SupplierFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [minRating, setMinRating] = useState([4])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [location, setLocation] = useState<string>("")

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 10000])
    setMinRating([4])
    setActiveFilters([])
    setLocation("")
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-xl font-semibold">Filtros</h3>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden border-brand-200 hover:bg-brand-50 bg-transparent"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros de Fornecedores</SheetTitle>
                <SheetDescription>Refine sua busca por fornecedores</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <MobileFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                  location={location}
                  setLocation={setLocation}
                />
              </div>
            </SheetContent>
          </Sheet>

          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-brand-200">
        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-brand-600" />
            Faixa de Preço
          </h4>
          <div className="space-y-4">
            <Slider value={priceRange} min={0} max={20000} step={500} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between text-sm">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Star className="h-4 w-4 text-brand-600" />
            Avaliação Mínima
          </h4>
          <div className="space-y-4">
            <Slider value={minRating} min={1} max={5} step={0.1} onValueChange={setMinRating} />
            <div className="flex items-center justify-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{minRating[0].toFixed(1)} ou mais</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-medium mb-4">Serviços</h4>
          <div className="space-y-2">
            {["Fotografia", "Filmagem", "Buffet", "Decoração", "Som e Luz", "Transporte", "Segurança", "Limpeza"].map(
              (service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={activeFilters.includes(service)}
                    onCheckedChange={() => toggleFilter(service)}
                  />
                  <Label htmlFor={service} className="text-sm">
                    {service}
                  </Label>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Location and Verification */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-600" />
              Localização
            </h4>
            <Input
              placeholder="Cidade ou bairro"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <h4 className="font-medium mb-4">Verificação</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified"
                  checked={activeFilters.includes("verified")}
                  onCheckedChange={() => toggleFilter("verified")}
                />
                <Label htmlFor="verified" className="text-sm">
                  Apenas verificados
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="premium"
                  checked={activeFilters.includes("premium")}
                  onCheckedChange={() => toggleFilter("premium")}
                />
                <Label htmlFor="premium" className="text-sm">
                  Fornecedores Premium
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeFilters.map((filter) => (
            <Button key={filter} variant="secondary" size="sm" onClick={() => toggleFilter(filter)}>
              {filter}
              <X className="h-3 w-3 ml-1" />
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileFilters({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  activeFilters,
  toggleFilter,
  location,
  setLocation,
}: {
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  minRating: number[]
  setMinRating: (value: number[]) => void
  activeFilters: string[]
  toggleFilter: (filter: string) => void
  location: string
  setLocation: (value: string) => void
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="price">
        <AccordionTrigger>Faixa de Preço</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Slider value={priceRange} min={0} max={20000} step={500} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="rating">
        <AccordionTrigger>Avaliação</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <Slider value={minRating} min={1} max={5} step={0.1} onValueChange={setMinRating} />
            <div className="flex items-center justify-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{minRating[0].toFixed(1)} ou mais</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="services">
        <AccordionTrigger>Serviços</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {["Fotografia", "Filmagem", "Buffet", "Decoração", "Som e Luz", "Transporte", "Segurança", "Limpeza"].map(
              (service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-${service}`}
                    checked={activeFilters.includes(service)}
                    onCheckedChange={() => toggleFilter(service)}
                  />
                  <Label htmlFor={`mobile-${service}`} className="text-sm">
                    {service}
                  </Label>
                </div>
              ),
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="location">
        <AccordionTrigger>Localização</AccordionTrigger>
        <AccordionContent>
          <Input
            placeholder="Cidade ou bairro"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-white"
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="verification">
        <AccordionTrigger>Verificação</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-verified"
                checked={activeFilters.includes("verified")}
                onCheckedChange={() => toggleFilter("verified")}
              />
              <Label htmlFor="mobile-verified" className="text-sm">
                Apenas verificados
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-premium"
                checked={activeFilters.includes("premium")}
                onCheckedChange={() => toggleFilter("premium")}
              />
              <Label htmlFor="mobile-premium" className="text-sm">
                Fornecedores Premium
              </Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
