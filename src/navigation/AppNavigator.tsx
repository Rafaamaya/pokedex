import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

import { formatPokemonName } from '../helpers/pokemonFormat';
import FavoritesScreen from '../screens/FavoritesScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import PokemonListScreen from '../screens/PokemonListScreen';

export type TabParamList = {
  Pokedex: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  PokemonDetail: { id: number; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === 'Pokedex' ? 'book-outline' : 'heart-outline'}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen
        name="Pokedex"
        component={PokemonListScreen}
        options={{ title: 'Pokédex' }} />
      <Tabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={({ route }) => ({ title: formatPokemonName(route.params.name) })}
      />
    </Stack.Navigator>
  );
}
