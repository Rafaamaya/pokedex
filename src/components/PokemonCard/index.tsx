import { PropsWithChildren } from 'react';
import { Image } from 'expo-image';
import {
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RootProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

interface ImageProps {
  source: string;
  accessibilityLabel: string;
  style?: StyleProp<ImageStyle>;
}

interface TitleProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

interface NumberProps {
  value: number;
  style?: StyleProp<TextStyle>;
}

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

const PokemonCardRoot = ({ children, style, onPress }: RootProps) => (
  <Pressable style={[styles.card, style]} onPress={onPress}>
    {children}
  </Pressable>
);

const PokemonCardImage = ({ source, accessibilityLabel, style }: ImageProps) => (
  <Image
    source={source}
    placeholder={require('../../../assets/splash-icon.png')}
    transition={200}
    cachePolicy="memory-disk"
    contentFit="contain"
    accessibilityLabel={accessibilityLabel}
    style={[styles.image, style]}
  />
);

const PokemonCardTitle = ({ children, style }: TitleProps) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

const PokemonCardNumber = ({ value, style }: NumberProps) => (
  <Text style={[styles.number, style]}>#{String(value).padStart(3, '0')}</Text>
);

const PokemonCardFavoriteButton = ({ isFavorite, onPress }: FavoriteButtonProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      hitSlop={10}
      onPress={onPress}
      style={styles.favoriteButton}
    >
      <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#EF4444" />
    </Pressable>
  );
};

export const PokemonCard = {
  Root: PokemonCardRoot,
  Image: PokemonCardImage,
  Title: PokemonCardTitle,
  Number: PokemonCardNumber,
  FavoriteButton: PokemonCardFavoriteButton,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: '50%',
    minHeight: 236,
    margin: 6,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#E5E7EB',
  },
  title: {
    marginTop: 8,
    color: '#14213D',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  number: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
});