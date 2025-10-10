import { useState } from "react";
import {Pokemon} from "@/types/pokemon";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { typeColors } from "@/lib/utils";


interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokeCard( {pokemon}:PokemonCardProps) {
    const [contador, setContador] = useState(0);
    
    return (
        <button className="cursor-pointer" onClick={() => setContador(contador + 1)}>
            <Card className="p-3 flex flex-col ">
                <CardContent>
                    <div className="relative w-35 h-35 border-4 border-gray-500 rounded-full overflow-hidden">
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            fill
                            sizes="500px"
                            className="object-cover" 
                        />
                    </div>
                    <h3 className="mt-4 font-semibold text-md text-center capitalize text-card-foreground">{pokemon.name}</h3>
                     <div className="flex gap-2 justify-center mt-2 flex-wrap">
                        {pokemon.types.map((type) => (
                        <span
                            key={type.type.name}
                            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            typeColors[type.type.name] || "bg-gray-400"
                            }`}
                        >
                            {type.type.name}
                        </span>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="justify-center">    
                    <span className="text-sm font-bold text-black-500">Nivel: {contador}</span>
                </CardFooter>
            </Card>
        </button>
    );
}