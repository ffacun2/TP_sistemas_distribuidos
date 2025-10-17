import type { Pokemon, EvolucionChain, InfoEvolucion, LinkEvolucionChain, PokemonListResponse, PokemonDetails } from "@/types/pokemon"

//Pasarlo dsp a un .env
const POKEMON_API_BASE = "https://pokeapi.co/api/v2"
export const LIMIT = 20

export class PokemonAPI {

  private static async fetchJSON<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalida cada 1 hora
    })

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
    console.log("Fetching multiple evolutions")
    try {
      const evolutionPromises = chainIds.map((id) => this.getEvolucionData(id))
      return await Promise.all(evolutionPromises)
    } 
    catch (error) {
      console.error("Error fetching multiple evolution chains:", error)
      throw error
    }
  }

  static async fetchPaginatedPokemones ({ pageParam = 0 }) {
    // Lógica de fetching que ya tenías
    const listResponse = await PokemonAPI.getPokemonList(LIMIT, pageParam);
    const detallesPromises = listResponse.results.map((item) => {
      const id = item.url.split("/").filter(Boolean).pop();
      return PokemonAPI.getPokemonDetails(id!);
    });
    const newPokemones = await Promise.all(detallesPromises);

    return {
      pokemones: newPokemones,
      nextOffset: listResponse.next ? pageParam + LIMIT : undefined,
    };
  };

  static async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    return this.fetchJSON<PokemonListResponse>(`${POKEMON_API_BASE}/pokemon?limit=${limit}&offset=${offset}`)
  }

  static async getPokemonDetails(nameOrId: string | number): Promise<PokemonDetails> {
    return this.fetchJSON<PokemonDetails>(`${POKEMON_API_BASE}/pokemon/${nameOrId}`)
  }
}
