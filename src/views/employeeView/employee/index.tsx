import { CardListEmployee } from '@components/formEmployee/CardListEmployee'
import { Header } from '../../../components/Header'

export function Employee() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header title={'Funcionário'} />
      <div className="px-4 sm:px-10 md:px-30 py-10 overflow-x-hidden">
        <CardListEmployee />
      </div>
    </div>
  )
}
