import { memo, useCallback } from 'react';

import { PokemonCard } from '../PokemonCard';
import { getOfficialArtworkUrl } from '../../helpers/pokemonImage';
import { useFavoritesStore } from '../../stores/useFavoritesStore';

interface PokemonListItemProps {
  name: string;
  id: number;
  onPress: (id: number, name: string) => void;
}

const PokemonListItem = memo(({ name, id, onPress }: PokemonListItemProps) => {
  const isFavorite = useFavoritesStore((state) =>
    state.favorites.some((item) => item.id === id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const handlePress = useCallback(() => onPress(id, name), [id, name, onPress]);
  const handleToggleFavorite = useCallback(
    () => toggleFavorite({ id, name }),
    [id, name, toggleFavorite],
  );

  return (
    <PokemonCard.Root onPress={handlePress}>
      <PokemonCard.FavoriteButton
        isFavorite={isFavorite}
        onPress={handleToggleFavorite}
      />
      <PokemonCard.Image
        source={getOfficialArtworkUrl(id)}
        accessibilityLabel={`Imagen de ${name}`}
      />
      <PokemonCard.Title>{name}</PokemonCard.Title>
      <PokemonCard.Number value={id} />
    </PokemonCard.Root>
  );
});

PokemonListItem.displayName = 'PokemonListItem';

export default PokemonListItem;