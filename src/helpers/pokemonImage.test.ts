import { getOfficialArtworkUrl, getPokemonIdFromUrl } from './pokemonImage';

describe('pokemonImage helpers', () => {
  it('gets the id from URLs with and without a trailing slash', () => {
    expect(getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
    expect(getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/25')).toBe(25);
  });

  it('builds the official artwork URL', () => {
    expect(getOfficialArtworkUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });
});
