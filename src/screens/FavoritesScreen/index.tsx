import { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PokemonListItem from '../../components/PokemonListItem';
import EmptyState from '../../components/EmptyState';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { useFavoritesStore } from '../../stores/useFavoritesStore';
import type { FavoritePokemon } from '../../types/pokemon';

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favorites = useFavoritesStore((state) => state.favorites);
  const handlePressPokemon = useCallback(
    (id: number, name: string) => {
      navigation.navigate('PokemonDetail', { id, name });
    },
    [navigation],
  );
  const renderFavorite: ListRenderItem<FavoritePokemon> = useCallback(
    ({ item }) => (
      <PokemonListItem id={item.id} name={item.name} onPress={handlePressPokemon} />
    ),
    [handlePressPokemon],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="Todavía no tenés favoritos"
            description="Tocá el corazón de un Pokémon para guardarlo acá."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 6,
    paddingBottom: 20,
  },
});
