import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

import acessImg from '../assets/access-denied.svg'

export function AccessDenied() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col-reverse items-center justify-center gap-8 bg-gray-100 bg-notFound bg-cover bg-no-repeat px-8 xl:grid xl:grid-cols-2 xl:px-40">
      <div className="flex w-full flex-col items-center justify-center gap-8 xl:max-w-md">
        <h1 className="w-full font-title text-3xl font-semibold leading-tight text-gray-900">
          Ooops, acesso negado...
        </h1>
        <p className="w-full leading-relaxed text-gray-600">
          Parece que está tentando acessar caminhos proibidos. Explore nossos
          pacotes de viagens e sonhe com o seu próximo destino e qualquer dúvida
          contate nosso suporte.
        </p>

        <Button
          ButtonTitle="Voltar para casa"
          onClick={() => navigate('/signin')}
        />
      </div>

      <div className="flex items-end justify-center">
        <img
          src={acessImg}
          alt="Image 401"
          className="absolute bottom-0 w-96"
        />
      </div>
    </div>
  )
}
