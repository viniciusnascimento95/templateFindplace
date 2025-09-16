"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { X, MapPin, Star, DollarSign } from "lucide-react"

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
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-indigo-600" />
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
          <Star className="h-4 w-4 text-indigo-600" />
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

      {/* Location */}
      <div>
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-indigo-600" />
          Localização
        </h4>
        <Input
          placeholder="Cidade ou bairro"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-white"
        />
      </div>

      {/* Verification */}
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

      {/* Clear Filters */}
      {(activeFilters.length > 0 || location) && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          <X className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      )}
    </div>
  )
}
