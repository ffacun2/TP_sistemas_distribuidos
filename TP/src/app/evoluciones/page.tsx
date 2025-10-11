// app/evolucion/page.js
import { PokemonAPI } from '@/api/pokemon-api';
import EvolucionList from '@/components/ui/EvolucionList';
import { InfoEvolucion } from '@/types/pokemon';

const INDICES_POKE_EVOLUCION = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]


export default async function EvolucionPage() {

  let chains: InfoEvolucion[] = []

  try {
    chains = await PokemonAPI.getMultipleEvolucionChains(INDICES_POKE_EVOLUCION)
  } 
  catch (error) {
    console.error("Error fetching evolution chains:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">Evoluciones</h1>
        <p className="text-center text-muted-foreground">Explora todas las evoluciones de los Pokémon</p>
      </div> 
      
      <EvolucionList evolucionChainsProp={chains}/>
    </div>
  );
}