import { UserAdList } from '@components/formUser/UserAdList'
import { Header } from '../../../components/Header'
import { AdsProvider } from '@contexts/AdsContext'
export function Home() {
  return (
    <div>
      <Header title={'Usuário'} />
      <div className="md:px-28 py-10">
        <AdsProvider>
          <UserAdList />
        </AdsProvider>
        <h1>Tela inicial usuário</h1>
      </div>
    </div>
  )
}
