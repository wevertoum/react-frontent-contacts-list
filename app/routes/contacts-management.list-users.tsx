import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import {
  type ColumnDef,
  ConfirmationDialog,
  DataCards,
  DataTable,
  HeaderPageActions,
} from '~/components';
import { UserForm, type UserFormValues } from '~/components/user-form';
import { useCreateUser, useDeleteUser, useUsers } from '~/features/users';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { data: users = [], isLoading, isError } = useUsers();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleCreateUser = (values: UserFormValues) => {
    createUserMutation.mutate(values, {
      onSuccess: () => {
        setIsDrawerOpen(false);
      },
    });
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    deleteUserMutation.mutate(userToDelete.id, {
      onSuccess: () => setUserToDelete(null),
    });
  };

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
    <>
      <Stack spacing={4}>
        <HeaderPageActions
          title="Usuários"
          subTitle="Gerencie os usuários do sistema"
          actionLabel="Novo Usuário"
          onAction={() => setIsDrawerOpen(true)}
        />

        {isSmallScreen ? (
          <DataCards
            data={users}
            renderCard={renderUserCard}
            getKey={(user) => user.id}
            onDelete={(user) => setUserToDelete(user)}
          />
        ) : (
          <DataTable
            data={users}
            columns={userColumns}
            getKey={(user) => user.id}
            onDelete={(user) => setUserToDelete(user)}
          />
        )}
      </Stack>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Criar Novo Usuário
          </Typography>
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() => setIsDrawerOpen(false)}
            isSubmitting={createUserMutation.isPending}
          />
        </Box>
      </Drawer>

      <ConfirmationDialog
        open={!!userToDelete}
        title="Confirmar Exclusão"
        description={`Deseja excluir o usuário "${userToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onClose={() => setUserToDelete(null)}
        isLoading={deleteUserMutation.isPending}
      />
    </>
  );
}
