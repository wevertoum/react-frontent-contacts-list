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
import { useContacts } from '~/features/contacts';
import type { Contact } from '~/types';

const contactColumns: ColumnDef<Contact>[] = [
  { header: 'ID', cell: (contact) => contact.id },
  { header: 'Email', cell: (contact) => contact.email },
  { header: 'User ID', cell: (contact) => contact.user_id },
];

const renderContactCard = (contact: Contact) => (
  <Card>
    <CardContent>
      <Typography variant="h6" component="div" sx={{ wordBreak: 'break-all' }}>
        {contact.email}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Contact ID
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
        <strong>ID:</strong> {contact.id}
      </Typography>
    </CardContent>
  </Card>
);

export default function ListContactsPage() {
  const { data: contacts = [], isLoading, isError } = useContacts();
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
      <Typography color="error">Falha ao carregar os contatos.</Typography>
    );
  }

  return (
    <Stack spacing={4}>
      <HeaderPageActions
        title="Contatos"
        subTitle="Gerencie os contatos dos usuários"
        actionLabel="Novo Contato"
        onAction={() => alert('Ação para criar novo contato!')}
      />

      {isSmallScreen ? (
        <DataCards
          data={contacts}
          renderCard={renderContactCard}
          getKey={(contact) => contact.id}
        />
      ) : (
        <DataTable
          data={contacts}
          columns={contactColumns}
          getKey={(contact) => contact.id}
        />
      )}
    </Stack>
  );
}
