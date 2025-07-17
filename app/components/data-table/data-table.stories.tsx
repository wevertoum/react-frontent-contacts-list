import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './data-table';
import type { ColumnDef } from './data-table.types';

interface MockItem {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

const mockData: MockItem[] = [
  { id: '1', name: 'Ana Silva', email: 'ana.silva@example.com', role: 'Admin' },
  { id: '2', name: 'Bruno Costa', email: 'bruno.c@example.com', role: 'User' },
  { id: '3', name: 'Carla Dias', email: 'carla.d@example.com', role: 'User' },
];

const mockColumns: ColumnDef<MockItem>[] = [
  { header: 'Nome', cell: (item) => item.name },
  { header: 'Email', cell: (item) => item.email },
  { header: 'Permissão', cell: (item) => item.role },
];

const meta: Meta<typeof DataTable<MockItem>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockData,
    columns: mockColumns,
    getKey: (item: any) => item.id,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: mockColumns,
    getKey: (item: any) => item.id,
  },
};
