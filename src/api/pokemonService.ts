import apiClient from './client';
import type { PokemonDetail, PokemonPageResponse } from '../types/pokemon';

export const getPokemonPage = async (
  offset: number,
  limit: number,
): Promise<PokemonPageResponse> => {
  const response = await apiClient.get<PokemonPageResponse>('/pokemon', {
    params: { offset, limit },
  });
  return response.data;
};

export const getPokemonById = async (id: number): Promise<PokemonDetail> => {
  const response = await apiClient.get<PokemonDetail>(`/pokemon/${id}`);
  return response.data;
};