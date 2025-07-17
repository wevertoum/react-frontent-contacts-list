import { Grid, type GridProps } from '@mui/material';
import type { DataCardsProps } from './data-cards.types';

export function DataCards<T>({ data, renderCard, getKey }: DataCardsProps<T>) {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={getKey(item)}
          component='div'
          {...({ item: true } as GridProps)}
        >
          {renderCard(item)}
        </Grid>
      ))}
    </Grid>
  );
}
