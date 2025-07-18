import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { ConfirmationDialogProps } from './confirmation-dialog.types';

export function ConfirmationDialog({
  open,
  title,
  description,
  onConfirm,
  onClose,
  isLoading = false,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="primary" disabled={isLoading}>
          {isLoading ? 'Excluindo...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
