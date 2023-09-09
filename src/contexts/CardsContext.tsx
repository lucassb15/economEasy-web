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

interface CardProps {
  id?: string
  companyId: string
  name: string
  maxPoints: number
  image: File | null
}

interface CardsContextData {
  cards: CardProps[]
  createCard: (card: CardProps) => Promise<boolean>
  fetchCards: () => Promise<void>
  deleteCard: (cardId: string) => Promise<void>
  error: null | string
}

export const CardsContext = createContext<CardsContextData>({
  cards: [],
  createCard: async () => false,
  fetchCards: async () => {},
  deleteCard: async () => {},
  error: null,
})

interface CardsProviderProps {
  children: ReactNode
}

export function CardsProvider({ children }: CardsProviderProps) {
  const [cards, setCards] = useState<CardProps[]>([])
  const [error, setError] = useState<null | string>(null)
  const { user } = useContext(AuthContext)
  const MAX_CARDS_ALLOWED = 1

  useEffect(() => {
    // Busca o estado mais recente do cartão
    fetchCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function createCard({ companyId, name, maxPoints, image }: CardProps) {
    try {
      if (cards.length >= MAX_CARDS_ALLOWED) {
        toast.error(`Você só pode criar até ${MAX_CARDS_ALLOWED} cartão.`, {
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
        return false // Retornando falso aqui para indicar que a criação do cartão falhou
      }

      const formData = new FormData()
      formData.append('companyId', companyId)
      formData.append('name', name)
      if (maxPoints !== undefined && !isNaN(maxPoints)) {
        // Verificando se maxPoints está definido e é um número
        formData.append('maxPoints', maxPoints.toString())
      } else {
        // Trate o caso onde maxPoints não é um número (ex: mostrando um erro para o usuário)
        throw new Error('Max Points deve ser um número')
      }
      if (image) {
        formData.append('image', image) // Adicionando a imagem ao FormData
      }

      const response = await api.post('/create/card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Definindo o header para funcionar com o backend e aceitar a imagem
        },
      })
      console.log(typeof response.data.maxPoints)

      // Usando a função de callback garante que você está sempre trabalhando com o valor mais recente do estado, proporcionando um código mais robusto e menos propenso a bugs em cenários de alta concorrência
      const newCard: CardProps = response.data
      setCards((prevCards) => [...prevCards, newCard])
      // Msg 200
      toast.success('Cartão criado com sucesso!')
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
  async function fetchCards() {
    try {
      const response = await api.get(`/cards/${companyId}`)
      if (response.data) {
        if (Array.isArray(response.data)) {
          setCards(response.data)
        } else {
          setCards([response.data])
        }
      } else {
        console.error('Response data is null')
        setCards([]) // Definir um estado padrão quando a resposta é null
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

  async function deleteCard(cardId: string) {
    if (!cardId) {
      console.error('Ad ID is undefined')
      return
    }
    try {
      await api.delete(`delete/card/${cardId}`)
      console.log('Card ID:', cardId)

      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId))

      toast.success('Anúncio deletado com sucesso!')
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
    <CardsContext.Provider
      value={{ cards, createCard, fetchCards, deleteCard, error }}
    >
      {children}
    </CardsContext.Provider>
  )
}
