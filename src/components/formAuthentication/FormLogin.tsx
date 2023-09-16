import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInSchema } from '../../schemas/user.schema'

import LogoFidelese from '../../assets/LogoFidelese.svg'
import { Envelope, LockKey, GoogleLogo } from '@phosphor-icons/react'
import { Input } from '../Input'

interface FormProps {
  FormTitle: string
  FormSubtitle: string
  SubmitText: string
}

interface SignInFormData {
  email: string
  password: string
}

export function FormLogin({ FormTitle, FormSubtitle, SubmitText }: FormProps) {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })
  const { errors } = formState

  const { signIn } = useContext(AuthContext)

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    await signIn(data)
  }

  return (
    <div className="flex flex-col md:overflow-y-auto custom-scrollbar h-screen p-4 items-center sm:p-10 md:p-20 lg:p-20 gap-y-5 justify-center w-full md:w-1/2">
      <div className="text-xl font-semibold pt-10">
        <img
          className="w-max h-[80px] object-cover"
          src={LogoFidelese}
          alt="Hero"
        />
      </div>
      <div className="w-full flex flex-col items-start">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
          {FormTitle}
        </h3>
        <p className="text-sm md:text-base lg:text-lg mb-2">{FormSubtitle}</p>
      </div>
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          icon={<Envelope size={24} weight="thin" />}
          type="email"
          placeholder="E-mail"
          {...register('email')}
          error={errors.email}
        />
        <Input
          icon={<LockKey size={24} weight="thin" />}
          type="password"
          placeholder="Senha"
          {...register('password')}
          error={errors.password}
        />
        <button
          type="submit"
          className="bg-darkblue hover:bg-darkblue-hover text-white font-bold text-sm md:text-base py-2 md:py-3 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50"
        >
          {SubmitText}
        </button>
      </form>
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center">
          <input type="checkbox" className="w-4 h-4 mr-2" />
          <p className="text-sm">Permanecer conectado</p>
        </div>
        <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
          Esqueceu sua senha?
        </p>
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <hr className="border border-gray-300 w-full"></hr>
        <p className="text-sm font-medium text-gray-500">OU</p>
        <hr className="border border-gray-300 w-full" />
      </div>
      <button className="bg-darkblue hover:bg-darkblue-hover w-full flex-row flex items-center justify-center gap-3 text-white font-bold py-2 md:py-3 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50">
        <GoogleLogo size={20} weight="bold" />
        <h3 className="text-sm md:text-base">Logar-se com Google</h3>
      </button>
      <div className="flex items-center justify-start flex-col">
        <div className="w-full flex mt-5">
          <p className="text-xs md:text-sm font-normal">
            Não tem conta?
            <Link
              to="/register/user"
              className="font-semibold underline underline-offset-2 pb-10"
            >
              {' '}
              Criar conta
            </Link>
          </p>
        </div>
        <div className="w-full flex mt-5">
          <p className="text-xs md:text-sm font-normal">
            É proprietário?
            <Link
              to="/register/company"
              className="font-semibold underline underline-offset-2 pb-10"
            >
              {' '}
              Cadastrar empresa
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
