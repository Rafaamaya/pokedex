import { useCallback, useEffect, useRef, useState } from 'react';

import { getPokemonPage } from '../api/pokemonService';
import { readCachedList, saveCachedList } from '../cache/pokemonListCache';
import type { PokemonListItem } from '../types/pokemon';

const PAGE_SIZE = 20;

interface UsePokemonListResult {
  pokemon: PokemonListItem[];
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
}

export const usePokemonList = (): UsePokemonListResult => {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const nextOffsetRef = useRef(0);
  const hasMoreRef = useRef(true);

  const loadMore = useCallback(async () => {
    if (!hasMoreRef.current) return;
    const offset = nextOffsetRef.current;
    const isFirstPage = offset === 0;

    if (isFirstPage) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const page = await getPokemonPage(offset, PAGE_SIZE);
      const pageHasMore = page.next !== null;

      setPokemon((current) => [...current, ...page.results]);
      setHasMore(pageHasMore);
      hasMoreRef.current = pageHasMore;
      nextOffsetRef.current = offset + PAGE_SIZE; // solo avanza si el request salió bien
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const initializeList = async () => {
      const cached = await readCachedList();

      if (cached !== null) {
        setPokemon(cached);
        nextOffsetRef.current = cached.length;
        setIsLoading(false);
        return;
      }

      await loadMore();
    };

    void initializeList();
  }, [loadMore]);

  useEffect(() => {
    if (pokemon.length > 0) {
      void saveCachedList(pokemon);
    }
  }, [pokemon]);

  return { pokemon, loadMore, hasMore, isLoading, isLoadingMore };
};