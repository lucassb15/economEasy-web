import { z } from 'zod'

export const cardSchema = z.object({
  companyId: z.string().min(1, 'ID da empresa é obrigatório'),
  name: z.string().min(1, 'Nome obrigatório'),
  maxPoints: z.string().min(1, 'Quantidade de pontos é obrigatório'),
  image: z.any().refine((fileList: FileList) => fileList.length > 0, {
    message: 'Uma imagem é obrigatória',
  }),
})

export type CardInputProps = z.infer<typeof cardSchema>
