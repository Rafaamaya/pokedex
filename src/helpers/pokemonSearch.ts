import type { PokemonListItem } from '../types/pokemon';

const normalizePokemonName = (value: string): string => {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
};

export const filterPokemonByName = (
  list: PokemonListItem[],
  query: string,
): PokemonListItem[] => {
  const normalizedQuery = normalizePokemonName(query);

  if (normalizedQuery.length === 0) {
    return list;
  }

  return list.filter((pokemon) => pokemon.name.includes(normalizedQuery));
};
