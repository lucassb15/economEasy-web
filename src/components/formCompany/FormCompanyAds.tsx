import { useContext } from 'react'
import { AdsContext } from '../../contexts/AdsContext' // Importar o contexto correto
import { AuthContext } from '@contexts/AuthContext'

import { SubmitHandler, useForm } from 'react-hook-form'

import { adSchema } from '../../schemas/ad.schema' // Importar o esquema correto
import { zodResolver } from '@hookform/resolvers/zod'

import { Image, Package, Money, StarOfDavid } from '@phosphor-icons/react'
import { Input } from '@components/formAuthentication/Input'

interface FormProps {
  FormTitle: string
}

interface AdFormData {
  name: string
  price: number
  image: FileList
  companyId: string
}

export function FormCompanyAds({ FormTitle }: FormProps) {
  const { user } = useContext(AuthContext)
  const { createAd } = useContext(AdsContext)

  const { register, handleSubmit, formState } = useForm<AdFormData>({
    resolver: zodResolver(adSchema),
  })
  const { errors } = formState

  const onSubmit: SubmitHandler<AdFormData> = async (data) => {
    console.log('Formulário enviado com os seguintes dados:', data)
    await createAd({
      name: data.name,
      price: data.price,
      image: data.image[0],
      companyId: data.companyId,
    })
  }

  return (
    <div className="flex-1 max-w-[400px] mt-2">
      <div>{FormTitle}</div>
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          icon={<StarOfDavid size={24} weight="regular" />}
          type="text"
          placeholder="ID da Empresa"
          value={user?.id}
          {...register('companyId')}
          error={errors.companyId}
        />
        <Input
          icon={<Package size={24} weight="regular" />}
          type="text"
          placeholder="Nome do Anúncio"
          {...register('name')}
          error={errors.name}
        />
        <Input
          icon={<Money size={24} weight="regular" />}
          type="number"
          placeholder="Preço"
          {...register('price')}
          error={errors.price}
        />
        <Input
          icon={
            <Image
              alt="Icone para o input de adicionar imagem"
              size={24}
              weight="regular"
            />
          }
          type="file"
          {...register('image')}
          error={errors.image}
        />
        <button
          type="submit"
          className="bg-darkblue hover:bg-darkblue-hover text-white font-bold text-sm md:text-base py-2 md:py-3 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Criar Anúncio
        </button>
      </form>
    </div>
  )
}
