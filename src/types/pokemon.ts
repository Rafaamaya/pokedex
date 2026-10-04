export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonPageResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}