import { render, screen } from '@testing-library/react-native';

import EmptyState from './index';

jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));

describe('EmptyState', () => {
  it('shows the title and the description', () => {
    render(<EmptyState icon="search" title="Sin resultados" description="Probá con otro nombre" />);

    expect(screen.getByText('Sin resultados')).toBeTruthy();
    expect(screen.getByText('Probá con otro nombre')).toBeTruthy();
  });

  it('does not show a description when none is provided', () => {
    render(<EmptyState icon="heart-outline" title="Sin favoritos" />);

    expect(screen.getByText('Sin favoritos')).toBeTruthy();
    expect(screen.queryByText('Probá con otro nombre')).toBeNull();
  });
});
