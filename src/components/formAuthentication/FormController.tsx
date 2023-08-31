import { FormLogin } from './FormLogin'
import { FormRegisterCompany } from './FormRegisterCompany'
import { FormRegisterUser } from './FormRegisterUser'

type FormControllerProps = {
  page: string
}

export function FormController({ page }: FormControllerProps) {
  return (
    <>
      {page === 'signin' ? (
        <FormLogin
          FormTitle="Login"
          FormSubtitle="Bem-vindo! Por favor insira suas informações"
          SubmitText="Entrar"
        />
      ) : null}

      {page === 'register/user' ? (
        <FormRegisterUser
          FormTitle="Cadastro"
          FormSubtitle="Por favor insira suas informações"
          SubmitText="Cadastrar"
        />
      ) : null}

      {page === 'register/company' ? (
        <FormRegisterCompany
          FormTitle="Cadastro Empresa"
          FormSubtitle="Por favor insira suas informações"
          SubmitText="Cadastrar"
        />
      ) : null}
    </>
  )
}
