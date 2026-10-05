import apiClient from './client';
import type { PokemonPageResponse } from '../types/pokemon';

export const getPokemonPage = async (
  offset: number,
  limit: number,
): Promise<PokemonPageResponse> => {
  const response = await apiClient.get<PokemonPageResponse>('/pokemon', {
    params: { offset, limit },
  });
  return response.data;
};