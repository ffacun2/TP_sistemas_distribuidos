"use client"
import { PokemonAPI } from "@/api/pokemon-api";
import { Button } from "@/components/ui/button";
import PokemonCard from "@/components/ui/PokemonCard";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

const LIMIT = 20;

export default function PokemonesPage () {

    const [pokemones, setPokemones] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const cargarPokemones = async (currentOffset: number) => {
        setLoading(true);
        try {
            const listResponse = await PokemonAPI.getPokemonList(LIMIT, currentOffset);

            const detallesPromises = listResponse.results.map((item) => {
                const id = item.url.split('/').filter(Boolean).pop();
                return PokemonAPI.getPokemonDetails(id!);
            });

            const newPokemones = await Promise.all(detallesPromises);
            setPokemones((prev) => [...prev, ...newPokemones]);
            setHasMore(listResponse.next !== null);
        }
        catch (error) {
            console.error("Error loading pokemones:", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (pokemones.length === 0) {
            cargarPokemones(0);
        }
    },[pokemones.length])

    const handleLoadMore = () => {
        const newOffset = offset + LIMIT
        setOffset(newOffset)
        cargarPokemones(newOffset)
    }

    return (
        <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">Pokédex</h1>
        <p className="text-center text-muted-foreground">Explora todos los Pokémon disponibles</p>
      </div>

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
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore} size="lg">
            Cargar Más
          </Button>
        </div>
      )}

      {!hasMore && pokemones.length > 0 && (
        <p className="text-center text-muted-foreground mt-8">Has llegado al final de la lista</p>
      )}
    </div>
  )
}