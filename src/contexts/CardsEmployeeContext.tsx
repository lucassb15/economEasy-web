import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
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

interface QrCodeData {
  customerId: string
  token: string
  companyCardId: string
}

interface CardProps {
  id?: string
  companyId: string
  name: string
  maxPoints: number
  image: File | null
}

interface CardsEmployeeContextData {
  cards: CardProps[]
  fetchCards: () => Promise<void>
  sendLoyaltyData: (data: QrCodeData) => Promise<void>
  error: null | string
}

export const CardsEmployeeContext = createContext<CardsEmployeeContextData>({
  cards: [],
  fetchCards: async () => {},
  sendLoyaltyData: async () => {},
  error: null,
})

interface CardsProviderProps {
  children: ReactNode
}

export function CardsEmployeeProvider({ children }: CardsProviderProps) {
  const [cards, setCards] = useState<CardProps[]>([])
  const [error, setError] = useState<null | string>(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const companyId = user?.companyId
  async function fetchCards() {
    try {
      const response = await api.get(`/cards/${companyId}`)
      if (response.data) {
        if (Array.isArray(response.data)) {
          setCards(response.data)
        } else {
          setCards([response.data])
        }
      }
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

  async function sendLoyaltyData(data: QrCodeData) {
    try {
      await api.post('/create/loyalty', data)
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
    <CardsEmployeeContext.Provider
      value={{ cards, fetchCards, sendLoyaltyData, error }}
    >
      {children}
    </CardsEmployeeContext.Provider>
  )
}
