import AsyncStorage from '@react-native-async-storage/async-storage';

import type { PokemonListItem } from '../types/pokemon';

const POKEMON_LIST_CACHE_KEY = 'pokemon-list-cache-v1';

export const readCachedList = async (): Promise<PokemonListItem[] | null> => {
  try {
    const cached = await AsyncStorage.getItem(POKEMON_LIST_CACHE_KEY);
    if (cached === null) return null;

    const parsed: unknown = JSON.parse(cached);
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as PokemonListItem[]) : null;
  } catch {
    return null;
  }
};

export const saveCachedList = async (list: PokemonListItem[]): Promise<void> => {
  await AsyncStorage.setItem(POKEMON_LIST_CACHE_KEY, JSON.stringify(list));
};
