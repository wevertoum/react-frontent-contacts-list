import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Decorator, Preview } from '@storybook/react';
import { theme } from '../app/lib/theme';

const withProviders: Decorator = (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withProviders],
};

export default preview;
