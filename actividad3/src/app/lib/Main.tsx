import Pokedex from "./Pokemones"
import { fetchAllPokemon, PokedexProps } from '../api/pokemon';


export default async function Main() {
    const pokemons = await fetchAllPokemon();

    return (
        <main className="bg-yellow-400 grow-1 p-4">
            <section className="text-center">
                <h2 className="text-2xl font-bold">Bienvenido a la aplicacion!</h2>
                <section>
                    <Pokedex pokemons={pokemons || []}/>
                </section>
            </section>
        </main>
    )};


