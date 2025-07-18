import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { theme } from '~/lib/theme';
import { UserForm } from './form-user';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('UserForm Component', () => {
  it('should display validation errors when submitting with empty fields', async () => {
    const handleSubmit = vi.fn();
    renderWithTheme(
      <UserForm
        onSubmit={handleSubmit}
        onCancel={() => {}}
        isSubmitting={false}
      />,
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/The name must be at least 3 characters long/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter a valid email address/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/please select a valid genre/i),
      ).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    renderWithTheme(
      <UserForm
        onSubmit={handleSubmit}
        onCancel={() => {}}
        isSubmitting={false}
      />,
    );

    await user.type(screen.getByLabelText(/complete name/i), 'John Doe');
    await user.type(screen.getByLabelText(/e-mail/i), 'john.doe@example.com');

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: /masculino/i }));

    await user.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);

      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John Doe',
          email: 'john.doe@example.com',
          genre: 'Male',
        }),
        expect.anything(),
      );
    });
  });

  it('should disable the submit button when isSubmitting is true', () => {
    renderWithTheme(
      <UserForm onSubmit={() => {}} onCancel={() => {}} isSubmitting={true} />,
    );

    const submitButton = screen.getByRole('button', { name: /salvando/i });
    expect(submitButton).toBeDisabled();
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();
    renderWithTheme(
      <UserForm
        onSubmit={() => {}}
        onCancel={handleCancel}
        isSubmitting={false}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
