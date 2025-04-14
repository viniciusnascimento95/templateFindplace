"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [capacitySeated, setCapacitySeated] = useState([0, 500])
  const [capacityStanding, setCapacityStanding] = useState([0, 1000])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<string>("relevance")

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 10000])
    setCapacitySeated([0, 500])
    setCapacityStanding([0, 1000])
    setActiveFilters([])
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-xl font-semibold">Filtros</h3>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Refine sua busca por locais para eventos</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <MobileFilters
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  capacitySeated={capacitySeated}
                  setCapacitySeated={setCapacitySeated}
                  capacityStanding={capacityStanding}
                  setCapacityStanding={setCapacityStanding}
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                />
              </div>
            </SheetContent>
          </Sheet>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevância</SelectItem>
              <SelectItem value="price-asc">Menor preço</SelectItem>
              <SelectItem value="price-desc">Maior preço</SelectItem>
              <SelectItem value="capacity-asc">Menor capacidade</SelectItem>
              <SelectItem value="capacity-desc">Maior capacidade</SelectItem>
              <SelectItem value="rating-desc">Melhor avaliação</SelectItem>
            </SelectContent>
          </Select>
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 bg-muted/40 p-4 rounded-lg">
        <div>
          <h4 className="font-medium mb-4">Preço</h4>
          <div className="space-y-4">
            <Slider value={priceRange} min={0} max={20000} step={500} onValueChange={setPriceRange} />
            <div className="flex items-center justify-between">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Capacidade</h4>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Sentados</Label>
              <Slider value={capacitySeated} min={0} max={1000} step={10} onValueChange={setCapacitySeated} />
              <div className="flex items-center justify-between mt-1">
                <span>{capacitySeated[0]} pessoas</span>
                <span>{capacitySeated[1]} pessoas</span>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Em pé</Label>
              <Slider value={capacityStanding} min={0} max={2000} step={20} onValueChange={setCapacityStanding} />
              <div className="flex items-center justify-between mt-1">
                <span>{capacityStanding[0]} pessoas</span>
                <span>{capacityStanding[1]} pessoas</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Infraestrutura</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="ac" checked={activeFilters.includes("ac")} onCheckedChange={() => toggleFilter("ac")} />
              <Label htmlFor="ac">Ar-condicionado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wifi"
                checked={activeFilters.includes("wifi")}
                onCheckedChange={() => toggleFilter("wifi")}
              />
              <Label htmlFor="wifi">Internet/Wi-Fi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="projector"
                checked={activeFilters.includes("projector")}
                onCheckedChange={() => toggleFilter("projector")}
              />
              <Label htmlFor="projector">Projetor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kitchen"
                checked={activeFilters.includes("kitchen")}
                onCheckedChange={() => toggleFilter("kitchen")}
              />
              <Label htmlFor="kitchen">Cozinha</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parking"
                checked={activeFilters.includes("parking")}
                onCheckedChange={() => toggleFilter("parking")}
              />
              <Label htmlFor="parking">Estacionamento</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accessibility"
                checked={activeFilters.includes("accessibility")}
                onCheckedChange={() => toggleFilter("accessibility")}
              />
              <Label htmlFor="accessibility">Acessibilidade</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="tables"
                checked={activeFilters.includes("tables")}
                onCheckedChange={() => toggleFilter("tables")}
              />
              <Label htmlFor="tables">Mesas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="chairs"
                checked={activeFilters.includes("chairs")}
                onCheckedChange={() => toggleFilter("chairs")}
              />
              <Label htmlFor="chairs">Cadeiras</Label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Tipo de Evento</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="corporate"
                checked={activeFilters.includes("corporate")}
                onCheckedChange={() => toggleFilter("corporate")}
              />
              <Label htmlFor="corporate">Corporativo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wedding"
                checked={activeFilters.includes("wedding")}
                onCheckedChange={() => toggleFilter("wedding")}
              />
              <Label htmlFor="wedding">Casamento</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="training"
                checked={activeFilters.includes("training")}
                onCheckedChange={() => toggleFilter("training")}
              />
              <Label htmlFor="training">Treinamento</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="meeting"
                checked={activeFilters.includes("meeting")}
                onCheckedChange={() => toggleFilter("meeting")}
              />
              <Label htmlFor="meeting">Reunião</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="party"
                checked={activeFilters.includes("party")}
                onCheckedChange={() => toggleFilter("party")}
              />
              <Label htmlFor="party">Festa</Label>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Localização</h4>
            <Input placeholder="Cidade ou bairro" />
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeFilters.map((filter) => (
            <Button key={filter} variant="secondary" size="sm" onClick={() => toggleFilter(filter)}>
              {getFilterLabel(filter)}
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
  capacitySeated,
  setCapacitySeated,
  capacityStanding,
  setCapacityStanding,
  activeFilters,
  toggleFilter,
}: {
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  capacitySeated: number[]
  setCapacitySeated: (value: number[]) => void
  capacityStanding: number[]
  setCapacityStanding: (value: number[]) => void
  activeFilters: string[]
  toggleFilter: (filter: string) => void
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="price">
        <AccordionTrigger>Preço</AccordionTrigger>
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
      <AccordionItem value="capacity">
        <AccordionTrigger>Capacidade</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Sentados</Label>
              <Slider value={capacitySeated} min={0} max={1000} step={10} onValueChange={setCapacitySeated} />
              <div className="flex items-center justify-between mt-1">
                <span>{capacitySeated[0]} pessoas</span>
                <span>{capacitySeated[1]} pessoas</span>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Em pé</Label>
              <Slider value={capacityStanding} min={0} max={2000} step={20} onValueChange={setCapacityStanding} />
              <div className="flex items-center justify-between mt-1">
                <span>{capacityStanding[0]} pessoas</span>
                <span>{capacityStanding[1]} pessoas</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="infrastructure">
        <AccordionTrigger>Infraestrutura</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-ac"
                checked={activeFilters.includes("ac")}
                onCheckedChange={() => toggleFilter("ac")}
              />
              <Label htmlFor="mobile-ac">Ar-condicionado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-wifi"
                checked={activeFilters.includes("wifi")}
                onCheckedChange={() => toggleFilter("wifi")}
              />
              <Label htmlFor="mobile-wifi">Internet/Wi-Fi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-projector"
                checked={activeFilters.includes("projector")}
                onCheckedChange={() => toggleFilter("projector")}
              />
              <Label htmlFor="mobile-projector">Projetor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-kitchen"
                checked={activeFilters.includes("kitchen")}
                onCheckedChange={() => toggleFilter("kitchen")}
              />
              <Label htmlFor="mobile-kitchen">Cozinha</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-parking"
                checked={activeFilters.includes("parking")}
                onCheckedChange={() => toggleFilter("parking")}
              />
              <Label htmlFor="mobile-parking">Estacionamento</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-accessibility"
                checked={activeFilters.includes("accessibility")}
                onCheckedChange={() => toggleFilter("accessibility")}
              />
              <Label htmlFor="mobile-accessibility">Acessibilidade</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-tables"
                checked={activeFilters.includes("tables")}
                onCheckedChange={() => toggleFilter("tables")}
              />
              <Label htmlFor="mobile-tables">Mesas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-chairs"
                checked={activeFilters.includes("chairs")}
                onCheckedChange={() => toggleFilter("chairs")}
              />
              <Label htmlFor="mobile-chairs">Cadeiras</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="event-type">
        <AccordionTrigger>Tipo de Evento</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-corporate"
                checked={activeFilters.includes("corporate")}
                onCheckedChange={() => toggleFilter("corporate")}
              />
              <Label htmlFor="mobile-corporate">Corporativo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-wedding"
                checked={activeFilters.includes("wedding")}
                onCheckedChange={() => toggleFilter("wedding")}
              />
              <Label htmlFor="mobile-wedding">Casamento</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-training"
                checked={activeFilters.includes("training")}
                onCheckedChange={() => toggleFilter("training")}
              />
              <Label htmlFor="mobile-training">Treinamento</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-meeting"
                checked={activeFilters.includes("meeting")}
                onCheckedChange={() => toggleFilter("meeting")}
              />
              <Label htmlFor="mobile-meeting">Reunião</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobile-party"
                checked={activeFilters.includes("party")}
                onCheckedChange={() => toggleFilter("party")}
              />
              <Label htmlFor="mobile-party">Festa</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="location">
        <AccordionTrigger>Localização</AccordionTrigger>
        <AccordionContent>
          <Input placeholder="Cidade ou bairro" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function getFilterLabel(filter: string): string {
  const labels = {
    ac: "Ar-condicionado",
    wifi: "Internet/Wi-Fi",
    projector: "Projetor",
    kitchen: "Cozinha",
    parking: "Estacionamento",
    accessibility: "Acessibilidade",
    tables: "Mesas",
    chairs: "Cadeiras",
    corporate: "Corporativo",
    wedding: "Casamento",
    training: "Treinamento",
    meeting: "Reunião",
    party: "Festa",
  }
  return labels[filter as keyof typeof labels] || filter
}
