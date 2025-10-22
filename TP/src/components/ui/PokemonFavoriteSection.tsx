
"use client"
import PokemonList from "@/components/ui/PokemonList";
import { useFavorite } from "@/hooks/useFavorite";

export default function PokemonFavoriteSection() {

    const {data: favoritePokemons, isError} = useFavorite();

	if (isError) {
		return (
			<p className="text-center text-red-500">
				Error al cargar los favoritos.
			</p>
		);
	}

	const hasFavorites = favoritePokemons && favoritePokemons.length > 0;

    return (
        <>
            {hasFavorites ? (
                <PokemonList pokemones={favoritePokemons} />
            ) : (
                <p>
                    No hay Pokémon favoritos.
                </p>
            )
            }
        </>  
    );
}