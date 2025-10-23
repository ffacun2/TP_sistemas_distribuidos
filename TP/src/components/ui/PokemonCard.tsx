"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Pokemon } from "@/types/pokemon"
import { typeColors } from "@/lib/utils"
import { StarIcon, Trash2, Trash2Icon } from "lucide-react"
import { useAddFavorite,  useRemoveFavorite} from "@/hooks/useFavorite"
import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog"

interface PokemonCardProps {
  pokemon: Pokemon
  variant?: "list" | "favorite"
}

export default function PokemonCard({ pokemon, variant = "list"}: PokemonCardProps) {
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const handleAddFavorite = () => {
      addFavorite.mutate(pokemon)
  }

  const handleRemoveFavorite = () => {
      removeFavorite.mutate(pokemon.id)
  }

  const action = variant === "list" ? (pokemon.isFavorite ? "remove" : "add") : "remove";

  const handleConfirmClick = () => {
		if (action === "add") {
			handleAddFavorite();
		} else {
			handleRemoveFavorite();
		}
  };

  const dialogTitle = action === "add" ? "Añadir a Favoritos" : "Quitar de Favoritos";
  const dialogDescription = `¿Estás seguro de que quieres ${action === "add" ? "añadir a" : "quitar a"} ${pokemon.name}?`;
  const confirmButtonText = action === "add" ? "Añadir" : "Quitar";

  const TriggerIcon =
		variant === "list" ? (
			<StarIcon
				className="text-yellow-400 hover:cursor-pointer transition-colors hover:text-yellow-300"
				fill={pokemon.isFavorite ? "currentColor" : "none"}
			/>
		) : (
			<Trash2Icon
				className="text-red-500 hover:cursor-pointer transition-colors hover:text-red-400"
			/>
		);


  return (
		<Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
			<AlertDialog>
				<CardHeader>
					<AlertDialogTrigger asChild>
						{TriggerIcon}
					</AlertDialogTrigger>
				</CardHeader>
				<CardContent className="p-6">
					<div className="flex flex-col items-center gap-4">
						<div className="relative w-32 h-32">
							<Image
								src={
									pokemon.sprites.other["official-artwork"]
										.front_default ||
									pokemon.sprites.front_default
								}
								alt={pokemon.name}
								fill
								sizes="400px"
								className="object-contain"
							/>
						</div>
						<div className="text-center w-full">
							<p className="text-sm text-muted-foreground">
								#{pokemon.id.toString().padStart(3, "0")}
							</p>
							<h3 className="text-xl font-bold capitalize">
								{pokemon.name}
							</h3>
							<div className="flex gap-2 justify-center mt-2 flex-wrap">
								{pokemon.types.map((type) => (
									<span
										key={type.type.name}
										className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
											typeColors[type.type.name] ||
											"bg-gray-400"
										}`}
									>
										{type.type.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className="p-4 pt-0">
					<Link
						href={`/pokemones/${pokemon.id}`}
						className="w-full transition-all hover:shadow-lg hover:scale-105"
					>
						<Button className="w-full cursor-pointer">
							Ver Detalles
						</Button>
					</Link>
				</CardFooter>

				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
						<AlertDialogDescription>
							{dialogDescription}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>

						<AlertDialogAction onClick={handleConfirmClick}>
							{confirmButtonText}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Card>
  );
}
