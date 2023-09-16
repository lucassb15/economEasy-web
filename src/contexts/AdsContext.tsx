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
  description?: ReactNode
  id?: string
  companyId: string
  name?: string
  price?: number
  image: File | null
  priority?: boolean
}

interface AdsContextData {
  ads: AdProps[]
  createAd: (ad: AdProps) => Promise<boolean>
  fetchAds: () => Promise<void>
  fetchAdsUser: () => Promise<void>
  deleteAd: (adId: string) => Promise<void>
  error: null | string
}

export const AdsContext = createContext<AdsContextData>({
  ads: [],
  createAd: async () => false,
  fetchAds: async () => {},
  fetchAdsUser: async () => {},
  deleteAd: async () => {},
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
  async function createAd({ image, companyId }: AdProps) {
    try {
      const formData = new FormData()
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
      setAds((prevAds) => [...prevAds, newAd])

      toast.success('Anúncio criado com sucesso!')
      return true
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
      return false
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

  async function fetchAdsUser() {
    try {
      const response = await api.get(`/ads/`)
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

  async function deleteAd(adId: string) {
    if (!adId) {
      console.error('Ad ID is undefined')
      return
    }
    try {
      await api.delete(`delete/ad/${adId}`)
      console.log('Ad ID:', adId)

      setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId))

      toast.success('Anúncio deletado com sucesso!')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.log(error)
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

  return (
    <AdsContext.Provider
      value={{ ads, createAd, fetchAds, error, deleteAd, fetchAdsUser }}
    >
      {children}
    </AdsContext.Provider>
  )
}
