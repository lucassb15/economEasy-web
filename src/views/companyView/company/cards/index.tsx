import { FormController } from '@components/formAuthentication/FormController'
import { CardsProvider } from '@contexts/CardsContext'
import { MenuDashboard } from '@components/MenuDashboard'
import CardList from '@components/formCompany/CardList'

export function Cards() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <MenuDashboard />
      {/* Aqui fazer a importação e criação da dashboard */}
      <div className="hidden md:block mx-2 md:mx-5 flex-1 p-10">
        <div>
          <FormController page="company/cards" />
        </div>
      </div>
      <div className="hidden md:block mx-2 md:mx-5 flex-1 p-10 overflow-y-auto h-screen">
        <div className="flex flex-row flex-wrap gap-3">
          <CardsProvider>
            <CardList />
          </CardsProvider>
        </div>
      </div>
    </div>
  )
}
