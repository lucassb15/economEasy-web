import { User } from './User'
export interface Stat {
  id: string
  customer: User
  customerId: string
  company: string
  companyId: string
  date: Date
}
