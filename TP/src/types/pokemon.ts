
export interface Pokemon {
    id: number
    name: string
    sprites: {
        front_default: string,
        other: {
            "official-artwork": {
            front_default: string
            }
        } 
    }
    types: Array<{
    type: {
      name: string
    }
  }>
    height: number
    weight: number
    isFavorite: boolean
}

export interface LinkEvolucionChain {
    species: {
        name: string;
        url: string;
    }
    evolves_to: LinkEvolucionChain[]
}

export interface EvolucionChain {
    id: number
    chain: LinkEvolucionChain
}

export interface InfoEvolucion {
    chainId: number
    pokemones: Pokemon[]
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetails extends Pokemon {
  abilities: Array<{
    ability: {
      name: string
    }
  }>
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  species: {
    url: string
  }
}