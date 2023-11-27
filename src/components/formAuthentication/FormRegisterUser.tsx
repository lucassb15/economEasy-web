import { useContext } from 'react'
import { Input } from '../Input'
import { Envelope, LockKey, User } from '@phosphor-icons/react'
import LogoFidelese from '../../assets/LogoFidelese.svg'
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../schemas/user.schema'
import { AuthContext } from '@contexts/AuthContext'
import { FormState, SubmitHandler, useForm } from 'react-hook-form'

interface FormProps {
  FormTitle: string
  FormSubtitle: string
  SubmitText: string
}

interface UserFormData {
  companyId: string
  email: string
  name: string
  password: string
  confirmPassword: string
  isEmployee: boolean
}

export function FormRegisterUser({
  FormTitle,
  FormSubtitle,
  SubmitText,
}: FormProps) {
  const { register, handleSubmit, formState } = useForm<UserFormData>({
    resolver: zodResolver(registerSchema),
  })
  const { errors } = formState

  const { registerUser } = useContext(AuthContext)

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    const dados = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      isEmployee: false,
    })

    console.log(dados)
  }

  // Debug erros
  const onError = (errors: FormState<UserFormData>['errors'], e: unknown) => {
    console.log(errors, e)
  }

  return (
    <div className="flex flex-col md:overflow-y-auto custom-scrollbar h-screen p-4 sm:p-10 md:p-20 lg:p-20 gap-y-5 items-center justify-center w-full md:w-1/2">
      <div className="text-xl font-semibold pt-10">
        <img
          className="w-max h-[70px] object-cover"
          src={LogoFidelese}
          alt="Hero"
        />
      </div>
      <div className="w-full flex flex-col max-w-[550px]">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
          {FormTitle}
        </h3>
        <p className="text-sm md:text-base lg:text-lg mb-2">{FormSubtitle}</p>
      </div>
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Input
          icon={<User size={24} weight="thin" />}
          type="name"
          placeholder="Seu nome"
          error={errors.name}
          {...register('name')}
        />
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
          error={errors.password}
          {...register('password')}
        />
        <Input
          icon={<LockKey size={24} weight="thin" />}
          type="password"
          placeholder="Confirmar senha"
          error={errors.confirmPassword}
          {...register('confirmPassword')}
        />
        <button
          type="submit"
          className="bg-darkblue hover:bg-darkblue-hover text-white font-bold text-sm md:text-base py-2 md:py-3 px-4 rounded shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
      <div className="w-full flex items-center justify-center mt-5">
        <p className="text-xs md:text-sm font-normal text-white">
          Já tem uma conta?
          <Link
            to="/"
            className="font-semibold underline underline-offset-2 pb-10"
          >
            {' '}
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
