import { z } from 'zod'

export const cardSchema = z.object({
  companyId: z.string().min(1, 'ID da empresa é obrigatório'),
  name: z.string().min(1, 'Nome obrigatório'),
  maxPoints: z
    .string()
    .min(1, 'Quantidade de pontos é obrigatório')
    .refine(
      (value) => {
        const numberValue = Number(value)
        return !isNaN(numberValue) && numberValue > 0 && numberValue <= 100
      },
      {
        message: 'A quantidade de pontos deve ser um número entre 1 e 100',
      },
    ),
  image: z.any().refine((fileList: FileList) => fileList.length > 0, {
    message: 'Uma imagem é obrigatória',
  }),
})

export type CardInputProps = z.infer<typeof cardSchema>
