import { AuthContext } from '@contexts/AuthContext'
import { MenuDashboard } from '@components/MenuDashboard'
import { useContext } from 'react'
import ChartPoints from '@components/chartCompany/chartPoints'

export function Dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <MenuDashboard />
      {/* Aqui fazer a importação e criação da dashboard */}
      <div className="mx-5 flex-1 p-10">
        <div className=" flex-1 text-2xl font-bold">
          Dashboard<span className="text-blue-500"> {user?.name}</span>
        </div>
        <div className="mt-2">
          <div>Total de pontos por dia</div>
          <ChartPoints />
        </div>
      </div>
    </div>
  )
}
