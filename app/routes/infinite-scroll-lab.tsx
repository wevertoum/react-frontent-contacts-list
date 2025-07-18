import { ChevronLeft } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  type GridProps,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HeaderPageActions } from '~/components';
import { SpotlightSearch } from '~/components/spotlight-search/spotlight-search';
import { useInfiniteCharacters } from '~/features/characters/characters.queries';
import { useDebounce } from '~/hooks/useDebounce';

export default function InfiniteScrollLabPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Atraso de 500ms
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteCharacters(debouncedSearchTerm);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const allCharacters = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Box sx={{ p: 3 }}>
      <HeaderPageActions
        title="Infinite Scroll Lab"
        subTitle="Rick and Morty Characters"
        actionLabel="Back to top"
        onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        actionIcon={
          <ChevronLeft
            sx={{
              transform: 'rotate(90deg)',
            }}
          />
        }
        fixedAction
      />

      <SpotlightSearch
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {status === 'pending' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {status === 'error' && (
        <Typography color="error" textAlign="center">
          Nenhum personagem encontrado para "{debouncedSearchTerm}".
        </Typography>
      )}

      {status === 'success' && (
        <Grid
          container
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {allCharacters.map((character) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={character.id}
              component="div"
              {...({ item: true } as GridProps)}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {character.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {character.species} - {character.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box ref={ref} sx={{ height: 50, mt: 4, textAlign: 'center' }}>
        {isFetchingNextPage && <CircularProgress />}
        {!hasNextPage && allCharacters.length > 0 && (
          <Typography color="text.secondary">
            No more characters to load.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
