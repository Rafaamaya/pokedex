const OFFICIAL_ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const getPokemonIdFromUrl = (url: string): number => {
  const pathSegments = url.split('/').filter(Boolean);
  return Number(pathSegments[pathSegments.length - 1]);
};

export const getOfficialArtworkUrl = (id: number): string =>
  `${OFFICIAL_ARTWORK_URL}/${id}.png`;