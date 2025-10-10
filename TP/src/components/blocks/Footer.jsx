import { Github } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
			<div className="container max-w-6xl mx-auto px-4 py-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-muted-foreground">
						© 2025 PokéDex. Datos proporcionados por PokéAPI.
					</p>
					<div className="flex gap-1 text-sm text-muted-foreground">
						<Github className="h-5 w-5" />
						<a href="https://github.com/ffacun2/TP_sistemas_distribuidos/tree/actividad5" target="_blank" rel="" className="hover:text-foreground transition-colors">
							GitHub
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
