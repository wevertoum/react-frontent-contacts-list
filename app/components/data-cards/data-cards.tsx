import { Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Grid, type GridProps, IconButton, Tooltip } from '@mui/material';
import type { DataCardsProps } from './data-cards.types';

export function DataCards<T extends { id: unknown }>({
  data,
  renderCard,
  getKey,
  onDelete,
}: DataCardsProps<T>) {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={getKey(item)}
          component="div"
          {...({ item: true } as GridProps)}
        >
          <Box sx={{ position: 'relative' }}>
            {onDelete && (
              <Tooltip title="Excluir">
                <IconButton
                  onClick={() => onDelete(item)}
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {renderCard(item)}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
