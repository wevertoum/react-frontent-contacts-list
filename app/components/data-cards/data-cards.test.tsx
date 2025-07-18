import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { theme } from '~/lib/theme';
import { DataCards } from './data-cards';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockData = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];

const renderMockCard = (item: { id: string; name: string }) => (
  <article>{item.name}</article>
);

describe('DataCards Component', () => {
  it('should render a card for each item in the data array', () => {
    renderWithTheme(
      <DataCards
        data={mockData}
        renderCard={renderMockCard}
        getKey={(item) => item.id}
      />,
    );

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(mockData.length);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should render nothing when the data array is empty', () => {
    renderWithTheme(
      <DataCards
        data={[]}
        renderCard={renderMockCard}
        getKey={(item) => item.id}
      />,
    );

    const cards = screen.queryAllByRole('article');
    expect(cards).toHaveLength(0);
  });

  it('should render a delete button for each card if onDelete is provided', () => {
    const handleDelete = vi.fn();
    renderWithTheme(
      <DataCards
        data={mockData}
        renderCard={renderMockCard}
        getKey={(item) => item.id}
        onDelete={handleDelete}
      />,
    );

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i });
    expect(deleteButtons).toHaveLength(mockData.length);
  });

  it('should call onDelete with the correct item when delete button is clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();
    renderWithTheme(
      <DataCards
        data={mockData}
        renderCard={renderMockCard}
        getKey={(item) => item.id}
        onDelete={handleDelete}
      />,
    );

    const deleteButtons = screen.getAllByRole('button', { name: /excluir/i });
    await user.click(deleteButtons[1]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockData[1]);
  });
});
