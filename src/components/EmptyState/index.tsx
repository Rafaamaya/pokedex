import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description?: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color="#94A3B8" />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  title: {
    marginTop: 12,
    color: '#334155',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
});
