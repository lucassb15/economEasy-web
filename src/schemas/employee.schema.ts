import { z } from 'zod'

export const employeeSchema = z
  .object({
    name: z.string().min(3, 'Nome obrigatório'),
    email: z.string().nonempty('E-mail obrigatório').email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .refine(
        (password) => /[A-Z]/.test(password),
        'A senha deve conter pelo menos uma letra maiúscula',
      )
      .refine(
        (password) => /\d/.test(password),
        'A senha deve conter pelo menos um número',
      ),
    confirmPassword: z.string({
      required_error: 'Confirmação de senha obrigatória',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas são diferentes',
    path: ['confirmPassword'],
  })

export type RegisterInputProps = z.infer<typeof employeeSchema>
