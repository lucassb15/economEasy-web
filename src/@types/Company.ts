import { CardProps } from './Card'
import { AdProps } from './Ad'
import { StatProps } from './Stat'
export interface CompanyProps {
  id: string
  name: string
  email: string
  password: string
  logo: string
  cards: CardProps[]
  ads: AdProps[]
  stats: StatProps[]
  employeeId: string
}
