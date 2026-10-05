import { useCallback } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';

import PokemonListItem from '../../components/PokemonListItem';
import { getPokemonIdFromUrl } from '../../helpers/pokemonImage';
import { usePokemonList } from '../../hooks/usePokemonList';
import type { PokemonListItem as PokemonListEntry } from '../../types/pokemon';

const renderPokemon: ListRenderItem<PokemonListEntry> = ({ item }) => {
  const pokemonId = getPokemonIdFromUrl(item.url);

  return <PokemonListItem name={item.name} id={pokemonId} />;
};

export default function PokemonListScreen() {
  const { pokemon, loadMore, hasMore, isLoading, isLoadingMore } = usePokemonList();

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
      <Text style={styles.heading}>Pokédex</Text>
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
  heading: {
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 8,
    color: '#14213D',
    fontSize: 28,
    fontWeight: '800',
    alignSelf: 'center',
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