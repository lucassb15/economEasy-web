import { AuthContext } from '@contexts/AuthContext'
import { MenuDashboard } from '@components/MenuDashboard'
import { useContext, useState } from 'react'

export function Perfil() {
  const { user, updateUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const handleToggleActivation = async () => {
    if (user) {
      try {
        setLoading(true)

        const endpoint = user.isActive
          ? `http://localhost:3333/disable/company`
          : `http://localhost:3333/enable/company`

        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: user.id,
          }),
        })

        if (response.ok) {
          const updatedUser = {
            ...user,
            isActive: !user.isActive,
          }

          console.log('Updated User:', updatedUser)

          updateUser(updatedUser)
        } else {
          if (response.status === 404) {
            console.error('Recurso não encontrado.')
          } else {
            try {
              const errorResponse = await response.json()
              console.error(
                'Erro ao alterar o status de ativação do perfil:',
                errorResponse,
              )
            } catch (jsonError) {
              console.error('Erro de JSON inesperado:', jsonError)
            }
          }
        }
      } catch (error) {
        console.error('Erro ao processar a solicitação:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  console.log(user?.isActive)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <MenuDashboard />
      <div className="mx-5 flex-1 p-10">
        <div className="text-2xl font-bold">
          Perfil<span className="text-blue-500"> {user?.name}</span>
        </div>
        <div className="flex flex-row items-center gap-2 mt-2">
          <button
            className={`px-4 py-2 flex items-center text-white rounded ${
              user?.isActive ? 'bg-red-500' : 'bg-green-500'
            }`}
            onClick={handleToggleActivation}
            disabled={loading}
          >
            {user?.isActive ? 'Desativar' : 'Ativar'}
          </button>
          <div className="flex items-center">
            Status Atual: {user?.isActive ? 'Ativo' : 'Inativo'}
          </div>
        </div>
      </div>
    </div>
  )
}
