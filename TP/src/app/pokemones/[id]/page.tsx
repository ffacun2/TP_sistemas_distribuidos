import Image from "next/image"
import { PokemonAPI } from "@/app/api/pokemon-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PokemonDetails } from "@/types/pokemon"
import { getPokemonWeaknesses } from "@/types/pokemonInfo"
import { typeColors } from "@/lib/utils"
import { BackButton } from "@/components/ui/BackButton"
import { notFound } from "next/navigation"



const statNames: Record<string, string> = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "At. Especial",
  "special-defense": "Def. Especial",
  speed: "Velocidad",
}

async function getPokemonDetails(id: string): Promise<PokemonDetails> {
  let data: PokemonDetails = {} as PokemonDetails
  try {
    data = await PokemonAPI.getPokemonDetails(id)
  }
  catch (error) {
    console.error("Error loading pokemon:", error)
    notFound()
  }

  return data
}

export default async function PokemonDetailPage({ params }: { params: { id: string } }) {

  const pokemon = await getPokemonDetails(params.id)
  
  const weaknesses = getPokemonWeaknesses(pokemon?.types.map(t => t.type.name) || [])
  

  return (
    <div className="container mx-auto px-4 py-8 ">
      <BackButton/>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl font-bold text-muted-foreground">#{pokemon.id.toString().padStart(3, "0")}</p>
              <div className="relative w-64 h-64">
                <Image
                  src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
              <div className="flex gap-2 flex-wrap justify-center">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
                      typeColors[type.type.name] || "bg-gray-400"
                    }`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Altura</p>
                  <p className="text-2xl font-bold">{pokemon.height / 10} m</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peso</p>
                  <p className="text-2xl font-bold">{pokemon.weight / 10} kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span key={ability.ability.name} className="px-3 py-1 bg-secondary rounded-full text-sm capitalize">
                    {ability.ability.name.replace("-", " ")}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Debilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {weaknesses.length > 0 ? (
                  weaknesses.map((weakness) => (
                    <span
                      key={weakness}
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                        typeColors[weakness] || "bg-gray-400"
                      }`}
                    >
                      {weakness}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Sin debilidades conocidas</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{statNames[stat.stat.name] || stat.stat.name}</span>
                    <span className="text-sm font-bold">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${stat.base_stat/255*100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
