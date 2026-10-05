import { memo } from 'react';

import { PokemonCard } from '../PokemonCard';
import { getOfficialArtworkUrl } from '../../helpers/pokemonImage';

interface PokemonListItemProps {
  name: string;
  id: number;
}

const PokemonListItem = memo(({ name, id }: PokemonListItemProps) => (
  <PokemonCard.Root>
    <PokemonCard.Image
      source={getOfficialArtworkUrl(id)}
      accessibilityLabel={`Imagen de ${name}`}
    />
    <PokemonCard.Title>{name}</PokemonCard.Title>
    <PokemonCard.Number value={id} />
  </PokemonCard.Root>
));

export default PokemonListItem;