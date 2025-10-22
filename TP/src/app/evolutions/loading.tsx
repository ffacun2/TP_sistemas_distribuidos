import { Loader2 } from "lucide-react";

// app/evolucion/loading.js
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground ml-3">Cargando evoluciones...</p>
        </div>
    );
}