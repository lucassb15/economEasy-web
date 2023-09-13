import AdList from '@components/formUser/AdList'
import { Header } from '../../../components/Header'
import { AdsProvider } from '@contexts/AdsContext'
export function Home() {
  return (
    <div>
      <Header title={'Usuário'} />
      <div className="border border-red-500">
        <AdsProvider>
          <AdList />
        </AdsProvider>
        <h1>Tela inicial usuário</h1>
      </div>
    </div>
  )
}
