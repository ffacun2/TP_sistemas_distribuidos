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
        const pokemon = await request.json();

        if (!pokemon.id || !pokemon.name || !pokemon.type
            || !pokemon.height || !pokemon.weight || !pokemon.sprites
        ) {
            return NextResponse.json(
                {error: "Faltan datos del pokemon"},
                {status: 400}
            );
        }

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

export async function DELETE(
    request: Request, 
    {params}: {params: {id: string}}
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id))
            return NextResponse.json(
                {error: "ID inválido"},
                {status: 400}
            );

        const deleted = await db.delete(id);
        if (!deleted) {
            return NextResponse.json(
                {error: "No se encontró el pokemon"},
                {status: 404}
            );
        }

        return NextResponse.json(
            {message: "Pokemon eliminado"}, 
            {status: 200}
        );
    }
    catch (error) {
        return NextResponse.json(
            {error: "Error al eliminar el pokemon"},
            {status: 500}
        )
    }
}