import { Card } from './Card'
import { Ad } from './Ad'
import { Stat } from './Stat'
export interface User {
  id: string
  name: string
  email: string
  password: string
  cards: Card[]
  ads: Ad[]
  stats: Stat[]
  employeeId: string
}
