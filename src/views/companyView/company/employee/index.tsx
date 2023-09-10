import { MenuDashboard } from '@components/MenuDashboard'
import { FormController } from '@components/formAuthentication/FormController'

export function RegisterEmployee() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <MenuDashboard />
      {/* Aqui fazer a importação e criação da dashboard */}
      <div className="mx-5 flex-1 p-10">
        <div>
          <FormController page="company/employee" />
        </div>
      </div>
    </div>
  )
}
