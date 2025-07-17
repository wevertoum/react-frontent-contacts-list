import { ThemeProvider } from '@mui/material';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { theme } from '~/lib/theme';
import { DataTable } from './data-table';
import type { ColumnDef } from './data-table.types';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

interface MockItem {
  id: number;
  name: string;
  value: number;
}

const mockData: MockItem[] = [
  { id: 1, name: 'Produto A', value: 100 },
  { id: 2, name: 'Produto B', value: 200 },
];

const mockColumns: ColumnDef<MockItem>[] = [
  { header: 'Nome do Produto', cell: (item) => item.name },
  { header: 'Valor', cell: (item) => `$${item.value}` },
];

describe('DataTable Component', () => {
  it('should render correct headers and rows for the provided data', () => {
    renderWithTheme(
      <DataTable
        data={mockData}
        columns={mockColumns}
        getKey={(item) => item.id}
      />,
    );

    expect(
      screen.getByRole('columnheader', { name: 'Nome do Produto' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Valor' }),
    ).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);

    const row1 = rows[1];
    expect(within(row1).getByText('Produto A')).toBeInTheDocument();
    expect(within(row1).getByText('$100')).toBeInTheDocument();

    const row2 = rows[2];
    expect(within(row2).getByText('Produto B')).toBeInTheDocument();
    expect(within(row2).getByText('$200')).toBeInTheDocument();
  });

  it('should render only the table header when the data array is empty', () => {
    renderWithTheme(
      <DataTable data={[]} columns={mockColumns} getKey={(item) => item.id} />,
    );

    expect(
      screen.getByRole('columnheader', { name: 'Nome do Produto' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Valor' }),
    ).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });
});
