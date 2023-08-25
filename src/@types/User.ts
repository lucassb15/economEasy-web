import { Card } from './Card'
export interface User {
  id: string
  name: string
  email: string
  password: string
  cards: Card[]
}
