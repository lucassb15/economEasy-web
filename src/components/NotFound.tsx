import { House } from '@phosphor-icons/react'
import {  useNavigate } from 'react-router-dom'
import { Button } from './Button'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="bg-notfound w-max">
          <h1 className="text-[200px]">Oops!</h1>
        </div>
        <div>
          <h2 className="text-black text-lg font-semibold">
            404 - Página não encontrada!
          </h2>
        </div>
        <div>
          <p className="text-black">
            A página que você tentou acessar não foi encontrada ou está
            temporariamente desativada.
          </p>
          <div className="flex justify-center mt-2">
            <Button onClick={() => navigate('/signin')}
              icon={<House size={24} weight="bold" />}
              ButtonTitle="Voltar para página inicial"
            >
                <h2>Voltar para página inicial</h2>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
