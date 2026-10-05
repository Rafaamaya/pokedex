export const heightToMeters = (height: number): number => height / 10;

export const weightToKilograms = (weight: number): number => weight / 10;

export const formatPokemonName = (name: string): string => {
  const nameWithSpaces = name.replace(/-/g, ' ');
  const firstCharacter = nameWithSpaces.charAt(0);
  const remainingCharacters = nameWithSpaces.slice(1);

  return firstCharacter.toUpperCase() + remainingCharacters;
};
