import { useCallback } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import PokemonListItem from '../../components/PokemonListItem';
import { getPokemonIdFromUrl } from '../../helpers/pokemonImage';
import { usePokemonList } from '../../hooks/usePokemonList';
import type { PokemonListItem as PokemonListEntry } from '../../types/pokemon';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonList'>;

export default function PokemonListScreen({ navigation }: Props) {
  const { pokemon, loadMore, hasMore, isLoading, isLoadingMore } = usePokemonList();
  const handlePressPokemon = useCallback(
    (id: number, name: string) => {
      navigation.navigate('PokemonDetail', { id, name });
    },
    [navigation],
  );

  const renderPokemon: ListRenderItem<PokemonListEntry> = useCallback(
    ({ item }) => {
      const pokemonId = getPokemonIdFromUrl(item.url);

      return <PokemonListItem name={item.name} id={pokemonId} onPress={handlePressPokemon} />;
    },
    [handlePressPokemon],
  );

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoading && !isLoadingMore) {
      void loadMore();
    }
  }, [hasMore, isLoading, isLoadingMore, loadMore]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemon}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.url}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore ? <ActivityIndicator style={styles.footer} color="#EF4444" /> : null
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
  footer: {
    paddingVertical: 18,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});