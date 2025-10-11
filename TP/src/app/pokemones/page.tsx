import { PokemonAPI } from "@/api/pokemon-api";
import PokemonList from "@/components/ui/PokemonList";

const LIMIT = 20;

async function getInicialPokemones() {
  const listResponse = await PokemonAPI.getPokemonList(LIMIT, 0);

  const detallesPromises = listResponse.results.map((item) => {
		const id = item.url.split("/").filter(Boolean).pop();
		return PokemonAPI.getPokemonDetails(id!);
  });

  return await Promise.all(detallesPromises);
}

export default async function PokemonesPage () {

  const pokemonesIniciales = await getInicialPokemones();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">Pokédex</h1>
        <p className="text-center text-muted-foreground">Explora todos los Pokémon disponibles</p>
      </div>
      
      <PokemonList initialPokemones={pokemonesIniciales} />
    </div>

  )
}