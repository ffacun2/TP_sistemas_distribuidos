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
    <main>
        <h2 className="text-2xl font-bold">Poke Evoluciones</h2> 
        <EvolucionList evolucionChainsProp={chains}/>
    </main>
  );
}