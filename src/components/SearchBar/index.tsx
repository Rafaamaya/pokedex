import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
}

export default function SearchBar({ value, onChangeText, onFocus }: SearchBarProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      placeholder="Buscar Pokémon"
      accessibilityLabel="Buscar Pokémon"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
});
