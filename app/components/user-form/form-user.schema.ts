import { z } from 'zod';

export const userFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'The name must be at least 3 characters long.' }),
  email: z.email({ message: 'Please enter a valid email address.' }),
  genre: z.enum(['Male', 'Female', 'Other'], {
    message: 'Please select a valid genre.',
  }),
});
