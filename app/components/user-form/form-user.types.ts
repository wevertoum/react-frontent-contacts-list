import type { z } from 'zod';
import type { userFormSchema } from './form-user.schema';

export type UserFormValues = z.infer<typeof userFormSchema>;

export interface UserFormProps {
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  defaultValues?: Partial<UserFormValues>;
}
