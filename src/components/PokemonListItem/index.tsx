import { memo } from 'react';

import { PokemonCard } from '../PokemonCard';
import { getOfficialArtworkUrl } from '../../helpers/pokemonImage';

interface PokemonListItemProps {
  name: string;
  id: number;
  onPress: (id: number, name: string) => void;
}

const PokemonListItem = memo(({ name, id, onPress }: PokemonListItemProps) => (
  <PokemonCard.Root onPress={() => onPress(id, name)}>
    <PokemonCard.Image
      source={getOfficialArtworkUrl(id)}
      accessibilityLabel={`Imagen de ${name}`}
    />
    <PokemonCard.Title>{name}</PokemonCard.Title>
    <PokemonCard.Number value={id} />
  </PokemonCard.Root>
));

PokemonListItem.displayName = 'PokemonListItem';

export default PokemonListItem;