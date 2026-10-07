import type { PokemonReference } from '../types/pokemon';

const normalizePokemonName = (value: string): string => {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
};

export const filterPokemonByName = (
  list: PokemonReference[],
  query: string,
): PokemonReference[] => {
  const normalizedQuery = normalizePokemonName(query);

  if (normalizedQuery.length === 0) {
    return list;
  }

  return list.filter((pokemon) => pokemon.name.includes(normalizedQuery));
};
