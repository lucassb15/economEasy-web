import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-hot-toast'
import { api } from '../api/api'
import { AuthContext } from './AuthContext'
import colors from 'tailwindcss/colors'
import { XCircle } from '@phosphor-icons/react'

interface AxiosError {
  response: {
    data: {
      message: string
    }
  }
}

interface LoyaltyCardProps {
  id: string
  customerId: string
  companyId: string
  maxPoints: number
  currentPoints: number
  image: File | null
  name: string
}

interface UserLoyaltyCardsContextData {
  loyaltyCards: LoyaltyCardProps[]
  fetchLoyaltyCards: () => Promise<void>
  qrCode: string | null
  generateQRCode: () => Promise<void>
  error: null | string
}

export const UserLoyaltyCardsContext =
  createContext<UserLoyaltyCardsContextData>({
    loyaltyCards: [],
    fetchLoyaltyCards: async () => {},
    qrCode: null,
    generateQRCode: async () => {},
    error: null,
  })

interface UserLoyaltyCardsProviderProps {
  children: ReactNode
}

export function UserLoyaltyCardsProvider({
  children,
}: UserLoyaltyCardsProviderProps) {
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCardProps[]>([])
  const [qrCode, setQRCode] = useState<string | null>(null)
  const [error, setError] = useState<null | string>(null)
  const { user } = useContext(AuthContext)
  const userId = user?.id

  async function fetchLoyaltyCards() {
    if (!userId) return
    try {
      const response = await api.get(`/loyalty/${userId}`)
      setLoyaltyCards(response.data)
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

  async function generateQRCode() {
    if (!userId) return
    try {
      const response = await api.post('/generate/initial', {
        customerId: userId,
      })
      setQRCode(response.data)
      console.log('Tamanho dos dados:', qrCode?.length, 'Conteúdo:', qrCode)
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

  useEffect(() => {
    fetchLoyaltyCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return (
    <UserLoyaltyCardsContext.Provider
      value={{ loyaltyCards, fetchLoyaltyCards, qrCode, generateQRCode, error }}
    >
      {children}
    </UserLoyaltyCardsContext.Provider>
  )
}
