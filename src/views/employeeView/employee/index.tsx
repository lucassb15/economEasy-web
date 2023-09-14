import { AuthContext } from '@contexts/AuthContext'
import { Header } from '../../../components/Header'
import { useContext } from 'react'
import QRReader from '@components/QrCodeReader'
export function Employee() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <Header title={'Funcionário'} />
      <h1>Tela inicial funcionário</h1>
      <label htmlFor="">Role: </label>
      <p>{user?.role}</p>
      <label htmlFor="">Email: </label>
      <p>{user?.email}</p>
      <label htmlFor="">Id: </label>
      <p>{user?.id}</p>
      <label htmlFor="">CompanyId: </label>
      <p>{user?.companyId}</p>
      <QRReader />
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
    </div>
  )
}
