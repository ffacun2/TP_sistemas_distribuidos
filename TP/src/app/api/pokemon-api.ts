import type { Pokemon, EvolucionChain, InfoEvolucion, LinkEvolucionChain } from "@/app/types/pokemon"

//Pasarlo dsp a un .env
const POKEMON_API_BASE = "https://pokeapi.co/api/v2"


export class PokemonAPI {

  private static async fetchJSON<T>(url: string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) 
      throw new Error(`HTTP error! status: ${response.status}`)
    
    return response.json()
  }

  static async getEvolucionChain(chainId: number): Promise<EvolucionChain> {
    return this.fetchJSON<EvolucionChain>(`${POKEMON_API_BASE}/evolution-chain/${chainId}`)
  }

  static async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    return this.fetchJSON<Pokemon>(`${POKEMON_API_BASE}/pokemon/${nameOrId}`)
  }

  private static obtenerPokemonNamesFromChain(chain: LinkEvolucionChain): string[] {
    const names: string[] = []

    const traverse = (link: LinkEvolucionChain) => {
      names.push(link.species.name)
      if (link.evolves_to && link.evolves_to.length > 0) {
        traverse(link.evolves_to[0])
      }
    }

    traverse(chain)
    return names
  }

  static async getEvolucionData(chainId: number): Promise<InfoEvolucion> {
    try {
      // Obtengo JSON de la evolucion (donde tiene los nombres a buscar)
      const evolutionChain = await this.getEvolucionChain(chainId)

      // Extraer nombres de Pokémon de la cadena
      const pokemonNames = this.obtenerPokemonNamesFromChain(evolutionChain.chain)

      // Obtener datos de todos los Pokémon de forma síncrona
      const pokemonPromises = pokemonNames.map((name) => this.getPokemon(name))
      const pokemones = await Promise.all(pokemonPromises)

      return {
        chainId,
        pokemones,
      }
    } 
    catch (error) {
      console.error(`Error fetching evolution data for chain ${chainId}:`, error)
      throw error
    }
  }

  static async getMultipleEvolucionChains(chainIds: number[]): Promise<InfoEvolucion[]> {
    try {
      const evolutionPromises = chainIds.map((id) => this.getEvolucionData(id))
      return await Promise.all(evolutionPromises)
    } 
    catch (error) {
      console.error("Error fetching multiple evolution chains:", error)
      throw error
    }
  }
}
