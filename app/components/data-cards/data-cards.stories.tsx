import { Card, CardContent, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { DataCards } from './data-cards';

interface MockItem {
  id: string;
  name: string;
  description: string;
}

const mockData: MockItem[] = [
  { id: 'a', name: 'Projeto Alpha', description: 'Iniciativa de frontend.' },
  { id: 'b', name: 'Projeto Beta', description: 'API de backend.' },
  { id: 'c', name: 'Projeto Gamma', description: 'Infraestrutura e DevOps.' },
];

const renderMockCard = (item: MockItem) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{item.name}</Typography>
      <Typography color="text.secondary">{item.description}</Typography>
    </CardContent>
  </Card>
);

const meta: Meta<typeof DataCards<MockItem>> = {
  title: 'Components/DataCards',
  component: DataCards,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockData,
    renderCard: renderMockCard,
    getKey: (item: any) => item.id,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    renderCard: renderMockCard,
    getKey: (item: any) => item.id,
  },
};
