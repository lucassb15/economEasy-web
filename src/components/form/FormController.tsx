import { FormLogin } from './FormLogin'

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
    </>
  )
}
