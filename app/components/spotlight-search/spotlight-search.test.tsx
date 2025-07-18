import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { theme } from '~/lib/theme';
import { SpotlightSearch } from './spotlight-search';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SpotlightSearch Component', () => {
  it('should render with the correct placeholder and initial value', () => {
    const props = {
      value: 'Initial Value',
      onChange: () => {},
      placeholder: 'Search here...',
    };

    renderWithTheme(<SpotlightSearch {...props} />);

    const input = screen.getByPlaceholderText('Search here...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Initial Value');
  });

  it('should call the onChange handler when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const props = {
      value: '',
      onChange: handleChange,
      placeholder: 'Search...',
    };

    renderWithTheme(<SpotlightSearch {...props} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'Rick');

    expect(handleChange).toHaveBeenCalledTimes(4);
  });
});
