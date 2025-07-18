import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { userFormSchema } from './form-user.schema';
import type { UserFormProps, UserFormValues } from './form-user.types';

export function UserForm({
  onSubmit,
  onCancel,
  isSubmitting,
  defaultValues,
}: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues || { name: '', email: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Complete Name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="E-mail"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.genre}>
              <InputLabel>Genre</InputLabel>
              <Select {...field} label="Genre">
                <MenuItem value="Male">Masculino</MenuItem>
                <MenuItem value="Female">Feminino</MenuItem>
                <MenuItem value="Other">Outro</MenuItem>
              </Select>
              {errors.genre && (
                <FormHelperText>{errors.genre.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
