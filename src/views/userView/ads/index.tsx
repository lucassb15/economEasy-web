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
          <h1>Anúncios pagos</h1>
          <AdsProvider>
            <Carousel />
          </AdsProvider>
        </div>
        <div className="mt-20">
          <h1>Anúncios grátis</h1>
          <AdsProvider>
            <UserAdList />
          </AdsProvider>
        </div>
      </div>
    </div>
  )
}
