import { formatPokemonName, heightToMeters, weightToKilograms } from './pokemonFormat';

describe('pokemonFormat helpers', () => {
  it('converts height to meters', () => {
    expect(heightToMeters(42)).toBe(4.2);
  });

  it('converts weight to kilograms', () => {
    expect(weightToKilograms(69)).toBe(6.9);
  });

  it('replaces hyphens and capitalizes the first letter', () => {
    expect(formatPokemonName('mr-mime')).toBe('Mr mime');
  });
});
