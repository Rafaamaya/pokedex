import { useEffect, useRef, useState } from 'react';

import { getAllPokemonNames } from '../api/pokemonService';
import type { PokemonReference } from '../types/pokemon';

interface UsePokemonSearchIndexResult {
  allPokemon: PokemonReference[];
  isLoading: boolean;
}

export const usePokemonSearchIndex = (enabled: boolean): UsePokemonSearchIndexResult => {
  const [allPokemon, setAllPokemon] = useState<PokemonReference[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;
    setIsLoading(true);

    void getAllPokemonNames()
      .then((pokemon) => {
        setAllPokemon(pokemon);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [enabled]);

  return { allPokemon, isLoading };
};
