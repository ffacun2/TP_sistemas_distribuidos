"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { favoriteService } from "@/services/favorite.service"
import { Pokemon } from "@/types/pokemon"

export function useFavorite() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoriteService.getAll(),
  })
}

export function useAddFavorite() {
  const queryClient = useQueryClient()
  console.log("useAddFavorite")
  return useMutation({
    mutationFn: (pokemon: Pokemon) => favoriteService.create(pokemon),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["favorites"]})
    },
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => favoriteService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["favorites"]})
    },
  })
}