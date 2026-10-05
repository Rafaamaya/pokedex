import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { getOfficialArtworkUrl } from '../../helpers/pokemonImage';
import {
  formatPokemonName,
  heightToMeters,
  weightToKilograms,
} from '../../helpers/pokemonFormat';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetail'>;

export default function PokemonDetailScreen({ route }: Props) {
  const { id } = route.params;
  const { pokemon, isLoading } = usePokemonDetail(id);

  if (isLoading || pokemon === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image
        source={getOfficialArtworkUrl(pokemon.id)}
        placeholder={require('../../../assets/splash-icon.png')}
        transition={200}
        contentFit="contain"
        accessibilityLabel={`Imagen de ${pokemon.name}`}
        style={styles.image}
      />
      <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
      <Text style={styles.number}>#{String(pokemon.id).padStart(3, '0')}</Text>

      <View style={styles.chips}>
        {pokemon.types.map(({ slot, type }) => (
          <View key={slot} style={styles.chip}>
            <Text style={styles.chipText}>{formatPokemonName(type.name)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.measurements}>
        <Text style={styles.measurement}>Altura: {heightToMeters(pokemon.height)} m</Text>
        <Text style={styles.measurement}>Peso: {weightToKilograms(pokemon.weight)} kg</Text>
      </View>

      <Text style={styles.sectionTitle}>Habilidades</Text>
      {pokemon.abilities.map(({ ability, is_hidden, slot }) => (
        <Text key={slot} style={styles.listItem}>
          {formatPokemonName(ability.name)}
          {is_hidden ? ' (oculta)' : ''}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Estadísticas</Text>
      <View style={styles.statsTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderName}>Nombre del stat</Text>
          <Text style={styles.tableHeaderValue}>Valor</Text>
        </View>
        {pokemon.stats.map(({ base_stat, stat }) => (
          <View key={stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{formatPokemonName(stat.name)}</Text>
            <Text style={styles.statValue}>{base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 260,
  },
  name: {
    color: '#14213D',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  number: {
    marginTop: 4,
    color: '#64748B',
    fontSize: 16,
    textAlign: 'center',
  },
  chips: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#DBEAFE',
  },
  chipText: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
  measurements: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  measurement: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    color: '#14213D',
    fontSize: 20,
    fontWeight: '800',
  },
  listItem: {
    marginBottom: 7,
    color: '#334155',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  statsTable: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F1F5F9',
  },
  tableHeaderName: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tableHeaderValue: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  statName: {
    color: '#334155',
    textTransform: 'capitalize',
  },
  statValue: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '700',
  },
});
