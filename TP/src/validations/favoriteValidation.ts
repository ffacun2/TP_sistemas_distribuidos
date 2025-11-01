"use client"

import * as Yup from "yup";

export const favoriteScheme = Yup.object().shape({
    name: Yup.string()
    .min(3, "Nombre del pokemon muy corto.")
    .max(15, "Nombre del pokemon muy largo.")
    .required("Requerido."),

    comment: Yup.string()
    .min(3, "Comentario muy corto.")
    .max(100, "Comentario muy largo.")
})


