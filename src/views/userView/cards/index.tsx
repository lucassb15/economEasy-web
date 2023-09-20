import UserFIdelityCard from '@components/UserFidelityCard'
import { Header } from '../../../components/Header'
export function UserCards() {
  return (
    <div>
      <Header title={'Usuário'} />
      <div className="md:px-28 py-10">
        <div className="mt-10">
          <h1>Cards usuário</h1>
          <UserFIdelityCard />
        </div>
      </div>
    </div>
  )
}
