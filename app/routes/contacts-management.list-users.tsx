import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  type ColumnDef,
  DataCards,
  DataTable,
  HeaderPageActions,
} from '~/components';
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
      <Typography variant="h6" component="div">
        {user.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {user.genre}
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
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
      <Typography color="error">Falha ao carregar os usuários.</Typography>
    );
  }

  return (
    <Stack spacing={4}>
      <HeaderPageActions
        title="Usuários"
        subTitle="Gerencie os usuários do sistema"
        actionLabel="Novo Usuário"
        onAction={() => alert('Ação para criar novo usuário!')}
      />

      {isSmallScreen ? (
        <DataCards
          data={users}
          renderCard={renderUserCard}
          getKey={(user) => user.id}
        />
      ) : (
        <DataTable
          data={users}
          columns={userColumns}
          getKey={(user) => user.id}
        />
      )}
    </Stack>
  );
}
