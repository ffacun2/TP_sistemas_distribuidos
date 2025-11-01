"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { favoriteScheme } from "@/validations/favoriteValidation";
import { Pokemon } from "@/types/pokemon";

export interface FavoriteFormValues {
	name: string;
	comment: string;
}

interface FavoriteFormProps {
	pokemon: Pokemon; 
	formId: string; 
	onSubmit: (values: FavoriteFormValues) => void;
}

export const FavoriteForm: React.FC<FavoriteFormProps> = ({
	pokemon,
	formId,
	onSubmit,
}) => {
	return (
		<Formik
			initialValues={{
				name: pokemon.name, 
				comment: "", 
			}}
			validationSchema={favoriteScheme}
			onSubmit={(values) => {
				onSubmit(values);
			}}
		>
			<Form id={formId} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Nombre
					</label>
					<Field
						name="name"
						className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
						placeholder="Ingrese el nombre del pokemon"
					/>
					<ErrorMessage
						name="name"
						component="p"
						className="text-red-500 text-sm mt-1"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">
						Comentario
					</label>
					<Field
						name="comment"
						className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
						placeholder="Ingrese un comentario"
					/>
					<ErrorMessage
						name="comment"
						component="p"
						className="text-red-500 text-sm mt-1"
					/>
				</div>
			</Form>
		</Formik>
	);
};
