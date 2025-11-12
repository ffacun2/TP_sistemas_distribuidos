'use client'
import { useState } from "react"
import type { InfoEvolucion } from "@/types/pokemon"
import  EvolutionCard from "./EvolutionCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"


export default function PokemonEvolutionCarousel( { evolucionChainsProp }: { evolucionChainsProp: InfoEvolucion[] } ) {
  const [evolucionChains] = useState<InfoEvolucion[]>(evolucionChainsProp)
  const [currentIndex, setCurrentIndex] = useState(0)


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % evolucionChains.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + evolucionChains.length) % evolucionChains.length)
  }

  if (evolucionChains.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">No se encontraron cadenas evolutivas</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        {/* Carousel */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {evolucionChains.map((chain, index) => (
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
          disabled={evolucionChains.length <= 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

          {/* flecha siguiente carta evolucion */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background shadow-2xl cursor-pointer"
          onClick={nextSlide}
          disabled={evolucionChains.length <= 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Puntos del Carousel */}
      <div className="flex justify-center gap-2 mt-6">
        {evolucionChains.map((_, index) => (
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
          Cadena evolutiva {currentIndex + 1} de {evolucionChains.length}
        </p>
      </div>
    </div>
  )
}
