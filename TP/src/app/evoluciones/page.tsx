// app/evolucion/page.js
import EvolucionList from '@/components/ui/EvolucionList';

export default function EvolucionPage({children}: {children: React.ReactNode}) {
  return (
    <main>
      <EvolucionList />
    </main>
  );
}