import BackToTop from '@components/BackToTop'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CompanyProps } from 'src/@types/Company'
import { api } from '@api/api'
import { Gauge, List, SignOut } from '@phosphor-icons/react'
import { AuthContext } from '@contexts/AuthContext'
import { FormCompanyAds } from '@components/formCompany/FormCompanyAds'

export function Dashboard() {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<CompanyProps | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await api.get(`/company/${id}`)
        setCompany(response.data)
      } catch (error) {
        console.error('Erro ao obter detalhes da empresa.', error)
      }
    }

    fetchCompanyDetails()
  }, [id])

  const { user, signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="bg-neutral-800 text-gray-100 flex justify-between md:hidden">
          <a href="#" className="block p-4 text-white font-bold">
            {user?.name}
            {company?.logo}
          </a>
          <button
            aria-label="Toggle Menu"
            role="button"
            className="p-4 focus:outline-none focus:bg-gray-700"
            onClick={toggleIsOpen}
          >
            <List size={20} />
          </button>
        </div>

        <aside
          className={`bg-neutral-800 text-white w-64 h-screen space-y-6 py-5 px-2 md:flex md:flex-col md:min-h-screen transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        >
          <button className="gap-4 py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
            <Gauge size={24} />
            Dashboard
          </button>
          <button
            className="gap-4 py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
            onClick={handleSignOut}
          >
            <SignOut size={24} />
            Logout
          </button>
        </aside>
        {/* Aqui fazer a importação e criação da dashboard */}
        <div className="mx-5">
          <div className=" flex-1 p-10 text-2xl font-bold">
            Dashboard do <span className="text-blue-500"> {user?.name}</span>
          </div>
          <div>
            <FormCompanyAds />
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  )
}
