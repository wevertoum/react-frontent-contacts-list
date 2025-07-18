import { Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export default function HomePage() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Contacts Management App
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          component={RouterLink}
          to="/contacts-management"
          variant="contained"
        >
          Go to Contacts Management
        </Button>
        <Button
          component={RouterLink}
          to="/infinite-scroll-lab"
          variant="outlined"
        >
          Explore Infinite Scroll Lab
        </Button>
      </Stack>
    </Container>
  );
}
