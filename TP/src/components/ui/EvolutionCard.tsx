import type { InfoEvolucion } from "@/types/pokemon"
import PokeCard from "./PokeCard"
import { ChevronRight } from "lucide-react"

interface EvolucionProps {
  infoEvolucion: InfoEvolucion
}


export default function EvolutionCard( {infoEvolucion}: EvolucionProps) {
  return (
    <div className="flex items-center justify-center gap-4 p-6 rounded-2xl min-w-fit">
      {infoEvolucion.pokemones.map((pokemon, index) => (
        <div key={pokemon.id} className="flex items-center gap-4">
          <PokeCard pokemon={pokemon} />
          {index < infoEvolucion.pokemones.length - 1 && (
            <ChevronRight className="w-8 h-8 text-muted-foreground animate-pulse" />
          )}
        </div>
      ))}
    </div>
  )
}