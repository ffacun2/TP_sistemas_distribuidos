import {Pokemon} from "@/app/types/pokemon"
import { Card } from "@/components/ui/card";


interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokeCard( {pokemon}:PokemonCardProps) {

    return (
        <Card
            className="p-3 flex flex-col "
        >
            <div className="">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="border-gray-500 border-6 rounded-full object-cover w-full"
                    />
            </div>
            <h3 className="font-semibold text-md text-center capitalize text-card-foreground">{pokemon.name}</h3>
        </Card>
    );
}