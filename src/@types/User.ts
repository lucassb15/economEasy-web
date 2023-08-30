import { CardProps } from './Card'
export interface UserProps {
  id: string
  name: string
  email: string
  password: string
  cards: CardProps[]
  isEmployee: boolean
}
