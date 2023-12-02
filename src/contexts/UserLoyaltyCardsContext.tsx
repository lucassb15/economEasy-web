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
  xCompleted: number
  image: File | null
  name: string
  expirationTime: number
  companyName: string
}

interface UserLoyaltyCardsContextData {
  loyaltyCards: LoyaltyCardProps[]
  fetchLoyaltyCards: () => Promise<void>
  qrCode: string | null
  generateQRCodeInitial: () => Promise<void>
  error: null | string
  generateQRCodeCard: (cardId: string, companyCardId: string) => Promise<void>
}

export const UserLoyaltyCardsContext =
  createContext<UserLoyaltyCardsContextData>({
    loyaltyCards: [],
    fetchLoyaltyCards: async () => {},
    qrCode: null,
    generateQRCodeInitial: async () => {},
    error: null,
    generateQRCodeCard: async () => {},
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

  async function generateQRCodeInitial() {
    if (!userId) return
    try {
      const response = await api.post('/generate/initial', {
        customerId: userId,
      })
      setQRCode(response.data)
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

  async function generateQRCodeCard(cardId: string, companyCardId: string) {
    if (!userId) return
    try {
      const response = await api.post('/generate/qrcode', {
        cardId,
        companyCardId,
      })
      setQRCode(response.data)
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
      value={{
        loyaltyCards,
        fetchLoyaltyCards,
        qrCode,
        generateQRCodeInitial,
        error,
        generateQRCodeCard,
      }}
    >
      {children}
    </UserLoyaltyCardsContext.Provider>
  )
}
