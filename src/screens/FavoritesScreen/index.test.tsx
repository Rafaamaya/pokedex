import { fireEvent, render, screen } from '@testing-library/react-native';

import FavoritesScreen from './index';
import { useFavoritesStore } from '../../stores/useFavoritesStore';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));
jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));

describe('FavoritesScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useFavoritesStore.setState({ favorites: [] });
  });

  it('shows the empty state when there are no favorites', () => {
    render(<FavoritesScreen />);

    expect(screen.getByText('Todavía no tenés favoritos')).toBeTruthy();
  });

  it('navigates to the detail screen when a favorite is pressed', () => {
    useFavoritesStore.setState({ favorites: [{ id: 25, name: 'pikachu' }] });
    render(<FavoritesScreen />);

    fireEvent.press(screen.getByText('pikachu'));

    expect(mockNavigate).toHaveBeenCalledWith('PokemonDetail', { id: 25, name: 'pikachu' });
  });
});
