import { FormController } from '@components/formAuthentication/FormController'
import AdList from '@components/formCompany/AdList'
import { AdsProvider } from '@contexts/AdsContext'
import { MenuDashboard } from '@components/MenuDashboard'

export function Ads() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <MenuDashboard />
      {/* Aqui fazer a importação e criação da dashboard */}
      <div className="hidden md:block mx-2 md:mx-5 flex-1 p-10">
        <div>
          <FormController page="company/ads" />
        </div>
      </div>
      <div className="hidden md:block mx-2 md:mx-5 flex-1 p-10 overflow-y-auto h-screen">
        <div className="flex flex-row flex-wrap gap-3">
          <AdsProvider>
            <AdList />
          </AdsProvider>
        </div>
      </div>
    </div>
  )
}
