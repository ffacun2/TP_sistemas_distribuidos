"use client";

import { PokemonAPI, LIMIT } from "@/app/api/pokemon-api";
import { Pokemon } from "@/types/pokemon";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import PokemonList from "./PokemonList";
import { useFavorite } from "@/hooks/useFavorite";
import { useMemo } from "react";

interface PokemonListProps {
	initialPokemones: Pokemon[];
}

export default function PokemonListSection({ initialPokemones }: PokemonListProps) {
	const { 
		data, 
		error, 
		fetchNextPage, 
		hasNextPage, 
		isFetchingNextPage,
	 } = useInfiniteQuery({
			queryKey: ["pokemones"],
			queryFn: PokemonAPI.fetchPaginatedPokemones,
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.nextOffset,
			initialData: {
				pages: [
					{
						pokemones: initialPokemones,
						nextOffset:
							initialPokemones.length === LIMIT
								? LIMIT
								: undefined,
					},
				],
				pageParams: [0],
			},
		});

	const { data: favoritePokemons, isError } = useFavorite();

	const pokemonesWithFavs = useMemo(() => {
		const favoriteIds = new Set(favoritePokemons?.map((fav) => fav.id));

		const allPokemones = data?.pages.flatMap((page) => page.pokemones) ?? [];

		return allPokemones.map((pokemon) => ({
			...pokemon,
			isFavorite: favoriteIds.has(pokemon.id),
		}));
	}, [data, favoritePokemons]);

	if (error) {
		return (
			<p className="text-center text-red-500">
				Error al cargar los Pokémon.
			</p>
		);
	}

	return (
		<>
			<PokemonList pokemones={pokemonesWithFavs} />

			{isFetchingNextPage && (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			)}

			{!isFetchingNextPage && hasNextPage && (
				<div className="flex justify-center mt-8 ">
					<Button
						onClick={() => fetchNextPage()}
						size="lg"
						className="cursor-pointer"
						disabled={isFetchingNextPage}
					>
						Cargar Más
					</Button>
				</div>
			)}

			{!hasNextPage && pokemonesWithFavs.length > 0 && (
				<p className="text-center text-muted-foreground mt-8">
					Has llegado al final de la lista
				</p>
			)}
		</>
	);
}
