"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import type { Pokemon } from "@/types/pokemon";
import { typeColors } from "@/lib/utils";
import { StarIcon, Trash2Icon } from "lucide-react";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorite";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FavoriteForm, FavoriteFormValues } from "@/components/favoriteForm";
import Image from "next/image";
import Link from "next/link";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PokemonCardProps {
	pokemon: Pokemon;
	variant?: "list" | "favorite";
}

export default function PokemonCard({
	pokemon,
	variant = "list",
}: PokemonCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const formId = `fav-form-${pokemon.id}`; // ID único para el formulario

	const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
	const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite();
	const isPending = isAdding || isRemoving;

	const action = variant === "list" ? (pokemon.isFavorite ? "remove" : "add") : "remove";

	const handleAddSubmit = (values: FavoriteFormValues) => {
		const pokemonWithComment = {
			...pokemon,
			name: values.name,
			comment: values.comment,
		};
		addFavorite(pokemonWithComment);
		setIsOpen(false); 
	};

	const handleRemoveClick = () => {
		removeFavorite(pokemon.id);
		setIsOpen(false);
	};

	 const hasComment =
			pokemon.isFavorite &&
			pokemon.comment &&
			pokemon.comment.length > 0;

	const TriggerIcon =
		variant === "list" ? (
			<StarIcon
				className="text-yellow-400 hover:cursor-pointer transition-colors hover:text-yellow-300"
				fill={pokemon.isFavorite ? "currentColor" : "none"}
				style={{ pointerEvents: isPending ? "none" : "auto" }}
			/>
		) : (
			<Trash2Icon
				className="text-red-500 hover:cursor-pointer transition-colors hover:text-red-400"
				style={{ pointerEvents: isPending ? "none" : "auto" }}
			/>
		);

	const dialogTitle = action === "add" ? `Añadir a ${pokemon.name}` : "Quitar de Favoritos";
	const dialogDescription = `¿Estás seguro de que quieres quitar a ${pokemon.name} de tus favoritos?`;

	return (
		<HoverCard openDelay={200}>
			<HoverCardTrigger asChild>
				<Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
					<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
						<CardHeader className="flex flex-row justify-end p-4">
							<AlertDialogTrigger asChild>
								{TriggerIcon}
							</AlertDialogTrigger>
						</CardHeader>

						<CardContent className="p-6 pt-0">
							<div className="flex flex-col items-center gap-4">
								<div className="relative w-32 h-32">
									<Image
										src={
											pokemon.sprites.other[
												"official-artwork"
											].front_default ||
											pokemon.sprites.front_default
										}
										alt={pokemon.name}
										className="w-full h-full object-contain"
										fill
										sizes="500px"
									/>
								</div>
								<div className="text-center w-full">
									<p className="text-sm text-muted-foreground">
										#
										{pokemon.id.toString().padStart(3, "0")}
									</p>
									<h3 className="text-xl font-bold capitalize">
										{pokemon.name}
									</h3>
									<div className="flex gap-2 justify-center mt-2 flex-wrap">
										{pokemon.types.map((type) => (
											<span
												key={type.type.name}
												className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
													typeColors[
														type.type.name
													] || "bg-gray-400"
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
								<AlertDialogTitle className="capitalize">
									{dialogTitle}
								</AlertDialogTitle>
								{action === "remove" && (
									<AlertDialogDescription>
										{dialogDescription}
									</AlertDialogDescription>
								)}
							</AlertDialogHeader>

							{action === "add" && (
								<FavoriteForm
									pokemon={pokemon}
									formId={formId}
									onSubmit={handleAddSubmit}
								/>
							)}

							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>

								{action === "add" ? (
									<AlertDialogAction
										type="submit"
										form={formId}
										disabled={isPending}
									>
										{isPending ? "Añadiendo..." : "Añadir"}
									</AlertDialogAction>
								) : (
									<AlertDialogAction
										onClick={handleRemoveClick}
										disabled={isPending}
									>
										{isPending ? "Quitando..." : "Quitar"}
									</AlertDialogAction>
								)}
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</Card>
			</HoverCardTrigger>
			{hasComment && (
				<HoverCardContent className="w-80" side="top">
					<h4 className="font-semibold mb-2 capitalize">
						{pokemon.name}
					</h4>
					<p className="text-sm">{pokemon.comment}</p>
				</HoverCardContent>
			)}
		</HoverCard>
	);
}
