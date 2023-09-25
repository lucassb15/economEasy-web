import { useContext, useEffect } from 'react'
import { CardsEmployeeContext } from '@contexts/CardsEmployeeContext'
import {
  Box,
  Image,
  Text,
  VStack,
  Flex,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  Grid,
} from '@chakra-ui/react'
import QRReader from '@components/QrCodeReader'
import { Button } from '@components/Button'
import { ArrowsClockwise } from '@phosphor-icons/react'

export function CardListEmployee() {
  const { cards, fetchCards, error } = useContext(CardsEmployeeContext)
  const imageSize = useBreakpointValue({
    base: '50px',
    sm: '75px',
    md: '200px',
  })

  // renderiza os cards na tela
  useEffect(() => {
    fetchCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <Alert status="error" borderRadius={4} mt={4}>
        <AlertIcon />
        <AlertTitle>Ocorreu um erro!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
        <div className="px-5">
          <Button
            ButtonTitle="Atualizar página"
            icon={<ArrowsClockwise weight="bold" size={16} />}
            onClick={() => window.location.reload()}
          />
        </div>
      </Alert>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bgColor = useColorModeValue('white', '#262626')

  return (
    <VStack spacing={4} w="full" align="start">
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        {cards.map((card) => (
          <Box
            key={card.id}
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            w="full"
            maxW="100%" // Ajuste para permitir que o Box se expanda até o tamanho máximo disponível
            h="max"
            maxHeight="400px"
            p={4}
            boxShadow="md"
            bg={bgColor}
            _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
            transition="all 0.3s ease-in-out"
          >
            <Flex
              justifyContent="start"
              alignItems="center"
              flexDir={{ base: 'row', md: 'row' }}
            >
              <VStack spacing={2} mb={{ base: 4, md: 0 }} align="center">
                <Image
                  boxSize={imageSize}
                  objectFit="cover"
                  src={`http://localhost:3333/${card.image}`}
                  alt={card.name}
                  borderRadius="lg"
                  _hover={{ opacity: 0.8 }}
                  mb={2}
                />
                <Text fontSize="md" color="gray.500">
                  Nome do cartão: {card.name}
                </Text>
                <Text fontSize="md" color="gray.500">
                  Quantidade de check-in: {card.maxPoints}
                </Text>
                <QRReader companyCardId={card.id} />
              </VStack>
            </Flex>
          </Box>
        ))}
      </Grid>
    </VStack>
  )
}
