import { UserAdList } from '@components/formUser/UserAdList'
import { Header } from '../../../components/Header'
import { AdsProvider } from '@contexts/AdsContext'
import { Carousel } from '@components/Carousel'
import { Heading } from '@chakra-ui/react'
export function Home() {
  return (
    <div>
      <Header title={'Cliente'} />
      <div className="px-28 py-10">
        <Heading fontSize={24}>Anúncios em destaque</Heading>
        <div className="flex flex-col gap-5 mt-10">
          <AdsProvider>
            <Carousel />
          </AdsProvider>
        </div>
        <div className="flex flex-col gap-10 mt-20">
          <Heading fontSize={24}>Anúncios</Heading>
          <AdsProvider>
            <UserAdList />
          </AdsProvider>
        </div>
      </div>
    </div>
  )
}
