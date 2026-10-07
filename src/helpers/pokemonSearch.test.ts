import { filterPokemonByName } from './pokemonSearch';
import type { PokemonReference } from '../types/pokemon';

const pokemon: PokemonReference[] = [
  { name: 'mr-mime', url: '/pokemon/122/' },
  { name: 'pikachu', url: '/pokemon/25/' },
  { name: 'charizard', url: '/pokemon/6/' },
];

describe('filterPokemonByName', () => {
  it('normalizes trim, case, and spaces when filtering', () => {
    expect(filterPokemonByName(pokemon, '  MR MIME ')).toEqual([pokemon[0]]);
  });

  it('returns an empty list when there are no matches', () => {
    expect(filterPokemonByName(pokemon, 'missing')).toEqual([]);
  });
});
