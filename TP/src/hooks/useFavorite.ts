"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { favoriteService } from "@/services/favorite.service"
import { Pokemon } from "@/types/pokemon"
import toast from "react-hot-toast"

export function useFavorite() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoriteService.getAll(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export function useAddFavorite() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (pokemon: Pokemon) => favoriteService.create(pokemon),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"]
      })
      toast.success("Agregado a favoritos exitosamente.")
    },
    onError: (error: Error) => {
      console.log(error.message)
      toast.error(error.message)
    }
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => favoriteService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["favorites"]})
      toast.success("Eliminado de favoritos exitosamente.")
    },
    onError: (error: Error) => {
      console.log(error.message)
      toast.error(error.message)
    },
  })
}