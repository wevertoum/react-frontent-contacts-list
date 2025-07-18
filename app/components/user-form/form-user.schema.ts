import { z } from 'zod';

export const userFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  email: z.email({ message: 'Por favor, insira um e-mail válido.' }),
  genre: z.enum(['Male', 'Female', 'Other'], {
    message: 'Por favor, selecione um gênero.',
  }),
});
