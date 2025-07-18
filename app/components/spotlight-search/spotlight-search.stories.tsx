import type { Meta, StoryObj } from '@storybook/react';
import { SpotlightSearch } from './spotlight-search';

const meta: Meta<typeof SpotlightSearch> = {
  title: 'Components/SpotlightSearch',
  component: SpotlightSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'changed' },
  },

  args: {
    onChange: () => {},
    value: 'test',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Search characters...',
  },
};
