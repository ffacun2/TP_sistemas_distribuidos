// app/pokemones/[id]/loading.tsx

import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] py-20">
			<Loader2 className="w-10 h-10 animate-spin text-primary" />
			<p className="text-muted-foreground mt-4">
				Obteniendo detalles del Pokemon...
			</p>
		</div>
	);
}
