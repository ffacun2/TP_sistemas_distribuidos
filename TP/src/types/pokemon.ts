
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

