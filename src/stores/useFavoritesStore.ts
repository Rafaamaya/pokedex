import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { FavoritePokemon } from '../types/pokemon';

interface FavoritesState {
  favorites: FavoritePokemon[];
  toggleFavorite: (pokemon: FavoritePokemon) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
