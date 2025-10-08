interface Pokemon {
    name: string;
    url: string
}

export interface PokemonDetalle {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
}

export interface PokedexProps {
  pokemons: PokemonDetalle[];
}
// Pasar esto a un .inv despues
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemon = async (): Promise<PokemonDetalle[] | null> => {
  try {
    // 1. Obtenemos la lista con los nombres y URLs de los pokémon
    const listResponse = await fetch(`${API_URL}?limit=30`);
    const listData = await listResponse.json();

    // 2. Mapeamos la lista para obtener los detalles de cada uno
    const detallePromises = listData.results.map((pokemon: Pokemon) =>
      fetch(pokemon.url).then(res => res.json())
    );

    // 3. Esperamos a que todas las promesas se resuelvan
    const detallePokemon: PokemonDetalle[] = await Promise.all(detallePromises);

    return detallePokemon;
  } 
  catch (error) {
    console.error("Error al obtener datos de la API:", error);
    return null;
  }
};