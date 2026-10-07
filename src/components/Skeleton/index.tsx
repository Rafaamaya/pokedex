import { useEffect, useRef } from 'react';
import { Animated, DimensionValue, FlatList, StyleSheet, View } from 'react-native';

interface SkeletonBoxProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
}

export const SkeletonBox = ({
  width = '100%',
  height = 16,
  borderRadius = 4,
}: SkeletonBoxProps) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      accessibilityLabel="Cargando"
      accessibilityState={{ busy: true }}
      style={[styles.box, { width, height, borderRadius, opacity }]}
    />
  );
};

export const PokemonCardSkeleton = () => (
  <View
    accessible
    accessibilityLabel="Cargando"
    accessibilityState={{ busy: true }}
    style={styles.card}
  >
    <View style={styles.cardImage}>
      <SkeletonBox width="100%" height="100%" borderRadius={8} />
    </View>
    <View style={styles.cardTitle}>
      <SkeletonBox width="72%" height={16} borderRadius={4} />
    </View>
    <View style={styles.cardNumber}>
      <SkeletonBox width="34%" height={12} borderRadius={4} />
    </View>
  </View>
);

export const PokemonListSkeleton = () => (
  <FlatList
    data={Array.from({ length: 8 }, (_, index) => index)}
    keyExtractor={(item) => String(item)}
    numColumns={2}
    scrollEnabled={false}
    contentContainerStyle={styles.listContent}
    renderItem={() => <PokemonCardSkeleton />}
  />
);

export const PokemonDetailSkeleton = () => (
  <View
    accessible
    accessibilityLabel="Cargando"
    accessibilityState={{ busy: true }}
    style={styles.detailContent}
  >
    <SkeletonBox width="100%" height={260} borderRadius={8} />
    <View style={styles.detailName}>
      <SkeletonBox width="58%" height={28} borderRadius={6} />
    </View>
    <View style={styles.detailNumber}>
      <SkeletonBox width="18%" height={16} borderRadius={4} />
    </View>
    <View style={styles.detailChips}>
      <SkeletonBox width={82} height={32} borderRadius={16} />
      <SkeletonBox width={82} height={32} borderRadius={16} />
    </View>
    <View style={styles.measurements}>
      <SkeletonBox width="34%" height={18} borderRadius={4} />
      <SkeletonBox width="34%" height={18} borderRadius={4} />
    </View>
    <View style={styles.sectionTitle}>
      <SkeletonBox width="36%" height={20} borderRadius={5} />
    </View>
    {[0, 1, 2].map((item) => (
      <View key={item} style={styles.abilityRow}>
        <SkeletonBox width="48%" height={16} borderRadius={4} />
      </View>
    ))}
    <View style={styles.sectionTitle}>
      <SkeletonBox width="46%" height={20} borderRadius={5} />
    </View>
    <View style={styles.statsTable}>
      <View style={styles.tableHeader}>
        <SkeletonBox width="42%" height={14} borderRadius={4} />
        <SkeletonBox width="16%" height={14} borderRadius={4} />
      </View>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <View key={item} style={styles.statRow}>
          <SkeletonBox width="36%" height={16} borderRadius={4} />
          <SkeletonBox width="10%" height={16} borderRadius={4} />
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#E5E7EB',
  },
  card: {
    flex: 1,
    maxWidth: '50%',
    minHeight: 236,
    margin: 6,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  cardTitle: {
    marginTop: 8,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
  },
  cardNumber: {
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 6,
    paddingBottom: 20,
  },
  detailContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  detailName: {
    alignItems: 'center',
    marginTop: 8,
  },
  detailNumber: {
    alignItems: 'center',
    marginTop: 4,
  },
  detailChips: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  measurements: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
  },
  abilityRow: {
    marginBottom: 7,
  },
  statsTable: {
    overflow: 'hidden',
    borderRadius: 10,
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
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});
