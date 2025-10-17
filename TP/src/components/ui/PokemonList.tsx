"use client"

import { PokemonAPI, LIMIT } from "@/api/pokemon-api"
import { Pokemon } from "@/types/pokemon"
import PokemonCard from "@/components/ui/PokemonCard"
import { Button } from "@/components/ui/button"
import { useInfiniteQuery } from "@tanstack/react-query"


interface PokemonListProps {
	initialPokemones: Pokemon[]
}

export default function PokemonList({ initialPokemones }: PokemonListProps) {
	
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
						initialPokemones.length === LIMIT ? LIMIT : undefined,
				},
			],
			pageParams: [0],
		},
	});

	const pokemones = data?.pages.flatMap((page) => page.pokemones) ?? [];

	if (error) {
		return (
			<p className="text-center text-red-500">
				Error al cargar los Pokémon.
			</p>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{pokemones.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>

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

			{!hasNextPage && pokemones.length > 0 && (
				<p className="text-center text-muted-foreground mt-8">
					Has llegado al final de la lista
				</p>
			)}
		</>
	);
}
