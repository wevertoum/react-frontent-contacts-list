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
      <Typography variant='h3' component='h1' gutterBottom>
        Bem-vindo ao Gerenciador de Contatos
      </Typography>
      <Stack direction='row' spacing={2}>
        <Button
          component={RouterLink}
          to='/contacts-management'
          variant='contained'
        >
          Gerenciar Contatos
        </Button>
        <Button
          component={RouterLink}
          to='/infinite-scroll-lab'
          variant='outlined'
        >
          Laboratório de Scroll Infinito
        </Button>
      </Stack>
    </Container>
  );
}
