import { z } from 'zod'

export const adSchema = z.object({
  companyId: z.string().min(1, 'ID da empresa é obrigatório'),
  name: z.string().min(1, 'Nome do produto é obrigatório'),
  price: z.string().min(1, 'Preço é obrigatório'),
  image: z.any().refine((fileList: FileList) => fileList.length > 0, {
    message: 'Uma imagem é obrigatória',
  }),
  // Você pode adicionar mais validações conforme suas necessidades
})

export type AdInputProps = z.infer<typeof adSchema>
