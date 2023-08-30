import { HeaderTw } from '../../../../components/HeaderTw'
import BackToTop from '../../../../components/BackToTop'

export function Dashboard() {
  return (
    <div className="flex">
      <div>
        <HeaderTw />
      </div>
      <section>
        <h1>Tela inicial do propietario</h1>
        <BackToTop />
      </section>
    </div>
  )
}
