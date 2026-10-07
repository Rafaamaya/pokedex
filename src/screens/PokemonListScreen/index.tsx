import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PokemonListItem from '../../components/PokemonListItem';
import EmptyState from '../../components/EmptyState';
import { PokemonListSkeleton } from '../../components/Skeleton';
import SearchBar from '../../components/SearchBar';
import { getPokemonIdFromUrl } from '../../helpers/pokemonImage';
import { filterPokemonByName } from '../../helpers/pokemonSearch';
import { usePokemonList } from '../../hooks/usePokemonList';
import { usePokemonSearchIndex } from '../../hooks/usePokemonSearchIndex';
import type { PokemonReference } from '../../types/pokemon';
import type { RootStackParamList } from '../../navigation/AppNavigator';

export default function PokemonListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { pokemon, loadMore, hasMore, isLoading, isLoadingMore } = usePokemonList();
  const [query, setQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { allPokemon, isLoading: isSearchIndexLoading } = usePokemonSearchIndex(isSearchActive);
  const isSearching = query.trim().length > 0;
  const filteredPokemon = useMemo(
    () => filterPokemonByName(allPokemon, query),
    [allPokemon, query],
  );
  const handlePressPokemon = useCallback(
    (id: number, name: string) => {
      navigation.navigate('PokemonDetail', { id, name });
    },
    [navigation],
  );

  const renderPokemon: ListRenderItem<PokemonReference> = useCallback(
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

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onFocus={() => setIsSearchActive(true)}
      />
      {isSearching && isSearchIndexLoading ? (
        <PokemonListSkeleton />
      ) : isLoading ? (
        <PokemonListSkeleton />
      ) : (
        <FlatList
          data={isSearching ? filteredPokemon : pokemon}
          renderItem={renderPokemon}
          keyExtractor={(item) => item.url}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          onEndReached={isSearching ? undefined : handleEndReached}
          onEndReachedThreshold={isSearching ? undefined : 0.5}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <EmptyState
              icon={isSearching ? 'search-outline' : 'albums-outline'}
              title={
                isSearching
                  ? `No encontramos "${query.trim()}"`
                  : 'No hay Pokémon para mostrar'
              }
              description={
                isSearching ? 'Probá con otro nombre o revisá cómo lo escribiste.' : undefined
              }
            />
          }
          ListFooterComponent={
            isSearching || !isLoadingMore ? null : (
              <ActivityIndicator style={styles.footer} color="#EF4444" />
            )
          }
        />
      )}
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
});