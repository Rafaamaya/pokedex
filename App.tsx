import { StatusBar } from 'expo-status-bar';

import PokemonListScreen from './src/screens/PokemonListScreen';

export default function App() {
  return (
    <>
      <PokemonListScreen />
      <StatusBar style="dark" />
    </>
  );
}
