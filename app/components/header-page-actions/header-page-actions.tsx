import { Box, Button, Typography } from '@mui/material';
import type { HeaderPageActionsProps } from './header-page-actions.types';

export function HeaderPageActions({
  title,
  subTitle,
  actionLabel,
  onAction,
}: HeaderPageActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {subTitle}
        </Typography>
      </Box>
      <Box>
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      </Box>
    </Box>
  );
}
