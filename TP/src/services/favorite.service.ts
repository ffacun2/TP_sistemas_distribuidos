import {Pokemon} from "@/types/pokemon";

export const favoriteService = {

    getAll: async (): Promise<Pokemon[]> => {
        const res = await fetch("/api/favorites");
        if (!res.ok) {
            throw new Error("Error al obtener los pokemones");
        }
        return res.json();
    },

    create: async (pokemon: Pokemon): Promise<Pokemon> => {
        const res = await fetch("/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pokemon),
        });
        if (!res.ok) {
            throw new Error("Error al crear el pokemon");
        }
        return res.json();
    },

    delete: async (id: number): Promise<void> => {
        const res = await fetch(`/api/favorites/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error("Error al eliminar el pokemon");
        }
    },

}