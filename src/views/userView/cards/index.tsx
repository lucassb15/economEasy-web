import { useContext, useState } from 'react'
import { UserLoyaltyCardsContext } from '@contexts/UserLoyaltyCardsContext'
import UserFidelityCard from '@components/formUser/UserFidelityCard'
import { Header } from '../../../components/Header'
import { UserQRcodeGenerator } from '@components/formUser/UserQRcodeGenerator'
import { Box, Heading, Input } from '@chakra-ui/react'

export function UserCards() {
  const { loyaltyCards } = useContext(UserLoyaltyCardsContext)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCards = loyaltyCards.filter((card) =>
    card.companyName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <Header title={'Cliente'} />
      <div className="px-28 py-10">
        <Heading fontSize={24}>Meus cartões fidelidade</Heading>
        <Box mt={4}>
          <Input
            placeholder="Pesquisar por nome da empresa"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <UserFidelityCard
                key={card.id}
                companyId={card.companyId}
                id={card.id}
                title={card.name}
                imageUrl={`http://localhost:3333/${card.image}`}
                checkedCount={card.currentPoints}
                totalCount={card.maxPoints}
                completed={card.xCompleted}
                expirationDate={card.expirationTime}
                companyName={card.companyName}
              />
            ))
          ) : (
            <p>Nenhum cartão de fidelidade disponível para a pesquisa.</p>
          )}
        </div>
      </div>
      <UserQRcodeGenerator />
    </div>
  )
}
