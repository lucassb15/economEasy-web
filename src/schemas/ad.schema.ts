import { z } from 'zod'

export const adSchema = z.object({
  companyId: z.string().min(1, 'ID da empresa é obrigatório'),
  image: z.any().refine((fileList: FileList) => fileList.length > 0, {
    message: 'Uma imagem é obrigatória',
  }),
})

export type AdInputProps = z.infer<typeof adSchema>
