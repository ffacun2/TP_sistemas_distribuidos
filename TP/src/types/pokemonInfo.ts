
type TypeEffectiveness = {
  [key: string]: string[]
}


const typeWeaknesses: TypeEffectiveness = {
  normal: ["lucha"],
  fire: ["agua", "tierra", "roca"],
  water: ["eléctrico", "planta"],
  electric: ["tierra"],
  grass: ["fuego", "hielo", "veneno", "volador", "bicho"],
  ice: ["fuego", "lucha", "roca", "acero"],
  fighting: ["volador", "psíquico", "hada"],
  poison: ["tierra", "psíquico"],
  ground: ["agua", "planta", "hielo"],
  flying: ["eléctrico", "hielo", "roca"],
  psychic: ["bicho", "fantasma", "siniestro"],
  bug: ["fuego", "volador", "roca"],
  rock: ["agua", "planta", "lucha", "tierra", "acero"],
  ghost: ["fantasma", "siniestro"],
  dragon: ["hielo", "dragón", "hada"],
  dark: ["lucha", "bicho", "hada"],
  steel: ["fuego", "lucha", "tierra"],
  fairy: ["veneno", "acero"]
}

export const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
}

export function getPokemonWeaknesses(types: string[]): string[] {
    const weaknesses = new Set<string>()

    types.forEach(type => {
        const typeWeakness = typeWeaknesses[type.toLowerCase()]
        if (typeWeakness) {
            typeWeakness.forEach(weak => {
                weaknesses.add(weak)
            })
        }
    })

    return Array.from(weaknesses)
}