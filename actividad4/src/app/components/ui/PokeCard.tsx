import {Pokemon} from "@/app/types/pokemon"
import { Card } from "@/components/ui/card";
import Image from "next/image";


interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokeCard( {pokemon}:PokemonCardProps) {

    return (
        <Card className="p-3 flex flex-col ">
            <div className="relative w-32 h-32 border-4 border-gray-500 rounded-full overflow-hidden">
                <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    fill={true}
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 50vw"
                    className="object-cover" 
                />
            </div>
            <h3 className="font-semibold text-md text-center capitalize text-card-foreground">{pokemon.name}</h3>
        </Card>
    );
}