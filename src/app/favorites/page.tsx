
import PokemonFavoriteSection from "@/components/ui/PokemonFavoriteSection";

export default function FavoritePage() {
    return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-center mb-2">
					Pokémones Favoritos
				</h1>
				<p className="text-center text-muted-foreground">
					Explora todos los Pokémon que has marcado como favoritos
				</p>
			</div>
			<PokemonFavoriteSection />
		</div>
	);
}
