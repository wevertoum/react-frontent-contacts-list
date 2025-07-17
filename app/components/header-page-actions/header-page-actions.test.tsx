import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { theme } from '~/lib/theme';
import { HeaderPageActions } from './header-page-actions';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('HeaderPageActions Component', () => {
  it('should render the title, subtitle, and action button correctly', () => {
    const props = {
      title: 'Título de Teste',
      subTitle: 'Subtítulo de teste',
      actionLabel: 'Clique Aqui',
      onAction: () => {},
    };

    renderWithTheme(<HeaderPageActions {...props} />);

    expect(
      screen.getByRole('heading', { name: /título de teste/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/subtítulo de teste/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /clique aqui/i }),
    ).toBeInTheDocument();
  });

  it('should call the onAction function when the button is clicked', () => {
    const handleActionClick = vi.fn();
    const props = {
      title: 'Título',
      subTitle: 'Subtítulo',
      actionLabel: 'Executar Ação',
      onAction: handleActionClick,
    };

    renderWithTheme(<HeaderPageActions {...props} />);

    const actionButton = screen.getByRole('button', { name: /executar ação/i });
    fireEvent.click(actionButton);

    expect(handleActionClick).toHaveBeenCalledTimes(1);
  });
});
