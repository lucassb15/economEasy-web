import { FormCompanyAds } from '@components/formCompany/FormCompanyAds'
import { FormLogin } from './FormLogin'
import { FormRegisterCompany } from './FormRegisterCompany'
import { FormRegisterUser } from './FormRegisterUser'
import { AdsProvider } from '@contexts/AdsContext'
import { CardsProvider } from '@contexts/CardsContext'
import { FormCompanyCards } from '@components/formCompany/FormCompanyCard'
import { FormRegisterEmployee } from '../formCompany/FormRegisterEmployee'

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

      {page === 'company/ads' ? (
        <AdsProvider>
          <FormCompanyAds FormTitle="Criar anúncio" />
        </AdsProvider>
      ) : null}

      {page === 'company/cards' ? (
        <CardsProvider>
          <FormCompanyCards FormTitle="Criar cartão fidelidade" />
        </CardsProvider>
      ) : null}

      {page === 'company/employee' ? (
        <FormRegisterEmployee FormTitle={'Criar conta do funcionário'} />
      ) : null}
    </>
  )
}
