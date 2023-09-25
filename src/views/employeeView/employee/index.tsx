import { CardListEmployee } from '@components/formEmployee/CardListEmployee'
import { Header } from '../../../components/Header'

export function Employee() {
  return (
    <div>
      <Header title={'Funcionário'} />
      <div className="md:px-28 py-10">
        <CardListEmployee />
      </div>
    </div>
  )
}
