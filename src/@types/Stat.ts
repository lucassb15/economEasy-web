import { UserProps } from './User'
export interface StatProps {
  id: string
  customer: UserProps
  customerId: string
  company: string
  companyId: string
  date: Date
}
