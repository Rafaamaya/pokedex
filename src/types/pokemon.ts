export interface PokemonReference {
  name: string;
  url: string;
}

export interface PokemonSummary {
  id: number;
  name: string;
}

export type FavoritePokemon = PokemonSummary

export interface PokemonPageResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonReference[];
}

export interface PokemonType {
  slot: number;
  type: PokemonReference;
}

export interface PokemonAbility {
  ability: PokemonReference;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: PokemonReference;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}
