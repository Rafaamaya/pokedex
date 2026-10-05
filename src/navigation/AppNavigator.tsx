import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { formatPokemonName } from '../helpers/pokemonFormat';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import PokemonListScreen from '../screens/PokemonListScreen';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { id: number; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{ title: 'Pokédex' }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={({ route }) => ({ title: formatPokemonName(route.params.name) })}
      />
    </Stack.Navigator>
  );
}
