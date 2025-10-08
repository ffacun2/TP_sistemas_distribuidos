// app/evolucion/page.js
import EvolucionList from '@/components/ui/EvolucionList';

export default function EvolucionPage() {
  return (
    <main>
        <h2 className="text-2xl font-bold">Poke Evoluciones</h2> 
        <EvolucionList />
    </main>
  );
}