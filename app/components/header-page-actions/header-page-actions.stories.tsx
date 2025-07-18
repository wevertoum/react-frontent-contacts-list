import type { Meta, StoryObj } from '@storybook/react';
import { HeaderPageActions } from './header-page-actions';

const meta: Meta<typeof HeaderPageActions> = {
  title: 'Components/HeaderPageActions',
  component: HeaderPageActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    actionLabel: { control: 'text' },
    onAction: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Contacts Management',
    subTitle: 'A list of contacts',
    actionLabel: 'Create Contact',
  },
};
