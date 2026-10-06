import apiClient from './client';
import type { PokemonDetail, PokemonListItem, PokemonPageResponse } from '../types/pokemon';

export const getAllPokemonNames = async (): Promise<PokemonListItem[]> => {
  // 2000 cubre los ~1350 Pokemon actuales porque la API no ofrece búsqueda por nombre.
  const response = await apiClient.get<PokemonPageResponse>('/pokemon', {
    params: { limit: 2000, offset: 0 },
  });
  return response.data.results;
};

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