import { PokedexProps } from "../api/pokemon";


export default function Pokedex({pokemons}: PokedexProps) {

  if (!pokemons) {
    return <p>Ocurrió un error al cargar los datos.</p>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold my-8">Los Kokemones</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pokemons.map(pokemon => (
          <div
            key={pokemon.id}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-24 h-24"
            />
            <span className="text-center text-black font-semibold mt-2 capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

