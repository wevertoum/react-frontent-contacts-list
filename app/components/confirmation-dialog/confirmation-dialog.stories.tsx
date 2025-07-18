import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationDialog } from './confirmation-dialog';

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    isLoading: { control: 'boolean' },
    onConfirm: { action: 'confirmed' },
    onClose: { action: 'closed' },
  },

  args: {
    open: true,
    title: 'Confirmar Exclusão',
    description:
      'Você tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
