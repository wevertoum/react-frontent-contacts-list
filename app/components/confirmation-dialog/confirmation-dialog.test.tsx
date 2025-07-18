import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { theme } from '~/lib/theme';
import { ConfirmationDialog } from './confirmation-dialog';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ConfirmationDialog Component', () => {
  const defaultProps = {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    onConfirm: vi.fn(),
    onClose: vi.fn(),
    isLoading: false,
  };

  it('should not be visible when open prop is false', () => {
    renderWithTheme(<ConfirmationDialog {...defaultProps} open={false} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should be visible and render title and description when open prop is true', () => {
    renderWithTheme(<ConfirmationDialog {...defaultProps} open={true} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /confirm action/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to proceed\?/i),
    ).toBeInTheDocument();
  });

  it('should call onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();
    renderWithTheme(
      <ConfirmationDialog
        {...defaultProps}
        open={true}
        onConfirm={handleConfirm}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    renderWithTheme(
      <ConfirmationDialog
        {...defaultProps}
        open={true}
        onClose={handleClose}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should show loading state and disable confirm button when isLoading is true', () => {
    renderWithTheme(
      <ConfirmationDialog {...defaultProps} open={true} isLoading={true} />,
    );

    const confirmButton = screen.getByRole('button', { name: /deleting/i });
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton).toBeDisabled();
  });
});
