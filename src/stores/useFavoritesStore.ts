import { create } from 'zustand';

import type { FavoritePokemon } from '../types/pokemon';

interface FavoritesState {
  favorites: FavoritePokemon[];
  toggleFavorite: (pokemon: FavoritePokemon) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  toggleFavorite: (pokemon) =>
    set((state) => {
      const isFavorite = state.favorites.some((item) => item.id === pokemon.id);

      return {
        favorites: isFavorite
          ? state.favorites.filter((item) => item.id !== pokemon.id)
          : [...state.favorites, pokemon],
      };
    }),
}));
