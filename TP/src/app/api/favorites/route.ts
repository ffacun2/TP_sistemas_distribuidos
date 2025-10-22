import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { Pokemon } from "@/types/pokemon";


export async function GET() {
    try {
        const pokemones = await db.getAll();
        return NextResponse.json(pokemones, {status:200});
    }
    catch (error) {
        return NextResponse.json (
            {error : "Error al obtener los pokemones"},
            {status: 500}
        )
    }
}

export async function POST(
    request: Request
) {
    try {
        const pokemon: Pokemon = await request.json();
        if (!pokemon.id || !pokemon.name || !pokemon.types
            || !pokemon.height || !pokemon.weight || !pokemon.sprites
        ) {
            return NextResponse.json(
                {error: "Faltan datos del pokemon"},
                {status: 400}
            );
        }

        const existing = await db.getById(pokemon.id);
        if (existing) {
            return NextResponse.json(
                {error: "El pokemon ya está en favoritos"},
                {status: 409}
            );
        }
        pokemon.isFavorite = true
        const created = await db.save(pokemon);
        return NextResponse.json(created, {status: 201});
    }
    catch (error) {
        return NextResponse.json(
            {error: "Error al crear el pokemon"},
            {status: 500}
        )
    }
}
