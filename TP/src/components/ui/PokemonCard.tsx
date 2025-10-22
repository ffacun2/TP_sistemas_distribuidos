"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Pokemon } from "@/types/pokemon"
import { typeColors } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import { useAddFavorite } from "@/hooks/useFavorite"

interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const addFavorite = useAddFavorite();

  const handleAddFavorite = () => {
    if (confirm(`¿Deseas agregar a ${pokemon.name} a tus favoritos?`)) {
      addFavorite.mutate(pokemon)
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <StarIcon onClick={handleAddFavorite} className="text-yellow-400 hover:cursor-pointer" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              sizes="400px"
              className="object-contain"
            />
          </div>
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">#{pokemon.id.toString().padStart(3, "0")}</p>
            <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
            <div className="flex gap-2 justify-center mt-2 flex-wrap">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    typeColors[type.type.name] || "bg-gray-400"
                  }`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/pokemones/${pokemon.id}`} className="w-full transition-all hover:shadow-lg hover:scale-105">
          <Button className="w-full cursor-pointer">Ver Detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
