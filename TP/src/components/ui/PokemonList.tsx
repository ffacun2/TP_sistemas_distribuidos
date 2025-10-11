"use client"

import { useState } from "react"
import { PokemonAPI } from "@/api/pokemon-api"
import { Pokemon } from "@/types/pokemon"
import PokemonCard from "@/components/ui/PokemonCard"
import { Button } from "@/components/ui/button"

const LIMIT = 20

interface PokemonListProps {
	initialPokemones: Pokemon[]
}

export default function PokemonList({ initialPokemones }: PokemonListProps) {
	const [pokemones, setPokemones] = useState<Pokemon[]>(initialPokemones)
	const [offset, setOffset] = useState(LIMIT)
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(initialPokemones.length === LIMIT)

	const handleLoadMore = async () => {
		setLoading(true)
		try {
			const listResponse = await PokemonAPI.getPokemonList(LIMIT, offset)
			const detallesPromises = listResponse.results.map((item) => {
				const id = item.url.split("/").filter(Boolean).pop()
				return PokemonAPI.getPokemonDetails(id!)
			})

			const newPokemones = await Promise.all(detallesPromises)
			setPokemones((prev) => [...prev, ...newPokemones])
			setOffset((prevOffset) => prevOffset + LIMIT)
			setHasMore(listResponse.next !== null)
		} catch (error) {
			console.error("Error loading more pokemones:", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{pokemones.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>

			{loading && (
				<div className="flex justify-center items-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				</div>
			)}

			{!loading && hasMore && (
				<div className="flex justify-center mt-8 ">
					<Button onClick={handleLoadMore} size="lg" className="cursor-pointer">
						Cargar Más
					</Button>
				</div>
			)}

			{!hasMore && pokemones.length > 0 && (
				<p className="text-center text-muted-foreground mt-8">
					Has llegado al final de la lista
				</p>
			)}
		</>
	)
}
