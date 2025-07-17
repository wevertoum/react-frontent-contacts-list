import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DataCards, DataTable } from '~/components';
import type { ColumnDef } from '~/components/data-table';
import { useUsers } from '~/features/users';
import type { User } from '~/types';

const userColumns: ColumnDef<User>[] = [
  { header: 'ID', cell: (user) => user.id },
  { header: 'Nome', cell: (user) => user.name },
  { header: 'Gênero', cell: (user) => user.genre },
];

const renderUserCard = (user: User) => (
  <Card>
    <CardContent>
      <Typography variant='h6' component='div'>
        {user.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color='text.secondary'>
        {user.genre}
      </Typography>
      <Typography variant='body2' sx={{ wordBreak: 'break-all' }}>
        <strong>ID:</strong> {user.id}
      </Typography>
    </CardContent>
  </Card>
);

export default function ListUsersPage() {
  const { data: users = [], isLoading, isError } = useUsers();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color='error'>Falha ao carregar os usuários.</Typography>
    );
  }

  return isSmallScreen ? (
    <DataCards
      data={users}
      renderCard={renderUserCard}
      getKey={(user) => user.id}
    />
  ) : (
    <DataTable data={users} columns={userColumns} getKey={(user) => user.id} />
  );
}
