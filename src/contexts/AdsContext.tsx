import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import colors from 'tailwindcss/colors'
import { XCircle } from '@phosphor-icons/react'

import { api } from '../api/api'
import { AuthContext } from './AuthContext'

interface AxiosError {
  response: {
    data: {
      message: string
    }
  }
}

interface AdProps {
  id?: string
  companyId: string
  name: string
  price: number
  image: File | null
  priority?: boolean
}

interface AdsContextData {
  ads: AdProps[]
  createAd: (ad: AdProps) => Promise<void>
  fetchAds: () => Promise<void>
  error: null | string
}

export const AdsContext = createContext<AdsContextData>({
  ads: [],
  createAd: async () => {},
  fetchAds: async () => {},
  error: null,
})

interface AdsProviderProps {
  children: ReactNode
}

export function AdsProvider({ children }: AdsProviderProps) {
  const [ads, setAds] = useState<AdProps[]>([])
  const [error, setError] = useState<null | string>(null)
  const { user } = useContext(AuthContext)

  // Função que cria um novo anúncio e o envia para o servidor
  // Recebe os detalhes do anúncio, como nome, preço, imagem e ID da empresa
  // Envia os dados em um FormData para suportar o envio da imagem
  async function createAd({ name, price, image, companyId }: AdProps) {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price.toString())
      formData.append('companyId', companyId)

      if (image) {
        formData.append('image', image) // Adicionando a imagem ao FormData
      }

      const response = await api.post('/create/ad', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Definindo o header para funcionar com o backend e aceitar a imagem
        },
      })

      // Extrai os dados do novo anúncio da resposta e atualiza o estado com o novo anúncio.
      const newAd: AdProps = response.data
      setAds([...ads, newAd])

      toast.success('Anúncio criado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error((error as AxiosError).response.data.message, {
        position: 'top-right',
        style: {
          backgroundColor: colors.red[500],
          color: colors.white,
          fontSize: 16,
          fontWeight: 500,
          padding: 16,
        },
        icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
      })
      setError((error as AxiosError).response.data.message)
    }
  }

  const companyId = user?.id
  async function fetchAds() {
    try {
      const response = await api.get(`/ads/${companyId}`)
      setAds(response.data)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao buscar anúncios.', {
        position: 'top-right',
        style: {
          backgroundColor: colors.red[500],
          color: colors.white,
          fontSize: 16,
          fontWeight: 500,
          padding: 16,
        },
        icon: <XCircle size={54} weight="fill" className="text-gray-50" />,
      })
      setError((error as AxiosError).response.data.message)
    }
  }

  return (
    <AdsContext.Provider value={{ ads, createAd, fetchAds, error }}>
      {children}
    </AdsContext.Provider>
  )
}
