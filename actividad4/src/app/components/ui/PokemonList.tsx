'use client'
import { useState, useEffect } from "react"
import type { InfoEvolucion } from "@/app/types/pokemon"
import { PokemonAPI } from "@/app/api/pokemon-api"
import  EvolutionCard from "./EvolutionCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

// Cadenas evolutivas  para mostrar
//Debe ir aca??? 
const POPULAR_EVOLUTION_CHAINS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

export default function PokemonEvolutionCarousel() {
  const [evolutionChains, setEvolutionChains] = useState<InfoEvolucion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const fetchEvolutionChains = async () => {
      try {
        setLoading(true)
        const chains = await PokemonAPI.getMultipleEvolucionChains(POPULAR_EVOLUTION_CHAINS)
        setEvolutionChains(chains)
      } 
      catch (err) {
        setError("Error al cargar las evoluciones de Pokémon")
        console.error(err)
      } 
      finally {
        setLoading(false)
      }
    }

    fetchEvolutionChains()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % evolutionChains.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + evolutionChains.length) % evolutionChains.length)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando evoluciones de Pokémon...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    )
  }

  if (evolutionChains.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No se encontraron cadenas evolutivas</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Carousel */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {evolutionChains.map((chain, index) => (
              <div key={index} className="w-full flex-shrink-0 p-4">
                <EvolutionCard infoEvolucion={chain} />
              </div>
            ))}
          </div>
        </div>

        {/* flecha previo carta evolucion */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background cursor-pointer"
          onClick={prevSlide}
          disabled={evolutionChains.length <= 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

          {/* flecha siguiente carta evolucion */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-2xl cursor-pointer"
          onClick={nextSlide}
          disabled={evolutionChains.length <= 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Puntos del Carousel */}
      <div className="flex justify-center gap-2 mt-6">
        {evolutionChains.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary scale-110" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Chain Info */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Cadena evolutiva {currentIndex + 1} de {evolutionChains.length}
        </p>
      </div>
    </div>
  )
}
