import { Add as AddIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { HeaderPageActionsProps } from './header-page-actions.types';

export function HeaderPageActions({
  title,
  subTitle,
  actionLabel,
  onAction,
  fixedAction,
  actionIcon,
}: HeaderPageActionsProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const icon = actionIcon ?? <AddIcon />;

  const ActionButton = isSmallScreen ? (
    <Tooltip title={actionLabel}>
      <IconButton
        color="primary"
        aria-label={actionLabel}
        onClick={onAction}
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button variant="contained" onClick={onAction} startIcon={icon}>
      {actionLabel}
    </Button>
  );

  return (
    <>
      {fixedAction && (
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: (theme) => theme.zIndex.appBar + 1,
          }}
        >
          {ActionButton}
        </Box>
      )}
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
        <Box>{!fixedAction && ActionButton}</Box>
      </Box>
    </>
  );
}
