import { useContext } from 'react'
import { UserLoyaltyCardsContext } from '@contexts/UserLoyaltyCardsContext'
import UserFidelityCard from '@components/formUser/UserFidelityCard'
import { Header } from '../../../components/Header'
import { UserQRcodeGenerator } from '@components/formUser/UserQRcodeGenerator'

export function UserCards() {
  const { loyaltyCards } = useContext(UserLoyaltyCardsContext)

  return (
    <div>
      <Header title={'Usuário'} />
      <div className="md:px-28 py-10">
        <div className="mt-10">
          <h1>Cards usuário</h1>
          {loyaltyCards && loyaltyCards.length > 0 ? (
            loyaltyCards.map((card) => (
              <UserFidelityCard
                key={card.id}
                companyId={card.companyId}
                id={card.id}
                title={card.name}
                imageUrl={`http://localhost:3333/${card.image}`}
                checkedCount={card.currentPoints}
                totalCount={card.maxPoints}
              />
            ))
          ) : (
            <p>Nenhum cartão de fidelidade disponível.</p>
          )}
        </div>
      </div>
      <UserQRcodeGenerator />
    </div>
  )
}
