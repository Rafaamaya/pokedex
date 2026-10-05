import { useEffect, useState } from 'react';

import { getPokemonById } from '../api/pokemonService';
import type { PokemonDetail } from '../types/pokemon';

interface UsePokemonDetailResult {
  pokemon: PokemonDetail | null;
  isLoading: boolean;
}

export const usePokemonDetail = (id: number): UsePokemonDetailResult => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    getPokemonById(id).then((detail) => {
      if (!isCancelled) {
        setPokemon(detail);
        setIsLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { pokemon, isLoading };
};
