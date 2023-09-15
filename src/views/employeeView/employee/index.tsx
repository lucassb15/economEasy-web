import { Header } from '../../../components/Header'
import QRReader from '@components/QrCodeReader'
export function Employee() {
  return (
    <div>
      <Header title={'Funcionário'} />
      <QRReader />
    </div>
  )
}
