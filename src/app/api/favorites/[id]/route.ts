import { NextResponse } from "next/server";
import { db } from "@/lib/database";


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
                {error: `No se encontró el pokemon con id:${id}`},
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