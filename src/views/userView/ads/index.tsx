import { UserAdList } from '@components/formUser/UserAdList'
import { Header } from '../../../components/Header'
import { AdsProvider } from '@contexts/AdsContext'
import { Carousel } from '@components/Carousel'
export function Home() {
  return (
    <div>
      <Header title={'Usuário'} />
      <div className="md:px-28 py-10">
        <div className="mt-10">
          <h1>Anúncios realeza</h1>
          <AdsProvider>
            <Carousel />
          </AdsProvider>
        </div>
        <div className="mt-20">
          <h1>Anúncios pleb</h1>
          <AdsProvider>
            <UserAdList />
          </AdsProvider>
        </div>
      </div>
    </div>
  )
}
