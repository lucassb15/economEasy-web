import React from 'react'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface PricingCardProps {
  title: string
  price: string
  description: string | React.ReactNode
  colorScheme: string
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  colorScheme,
}) => {
  return (
    <Box
      w="280px"
      h="500px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      m={4}
      boxShadow="lg"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: 'scale(1.05)' }}
      bg={`${colorScheme}.100`}
    >
      <div>
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={2}
          color={`${colorScheme}.800`}
        >
          {title}
        </Text>
        <Text color={`${colorScheme}.600`} mb={4}>
          {description}
        </Text>
      </div>
      <div className="w-full">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={4}
          color={`${colorScheme}.800`}
        >
          ${price}
        </Text>
        <Button colorScheme={colorScheme} w="100%">
          Comprar
        </Button>
      </div>
    </Box>
  )
}

export const Pricing: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <Flex justifyContent="center" alignItems="center" minH="100vh">
      <Button
        position="absolute"
        top="4"
        left="4"
        colorScheme="teal"
        onClick={handleGoBack}
        zIndex="1"
      >
        Voltar
      </Button>
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        textAlign="center"
      >
        <PricingCard
          title="Plano Básico"
          price="9.99"
          description={
            <>
              O Plano Básico oferece a oportunidade de destacar até{' '}
              <strong>3 anúncios</strong> no topo da página, garantindo
              visibilidade premium por um período de <strong>3 semanas</strong>.
              Ideal para quem busca uma exposição inicial eficaz.
            </>
          }
          colorScheme="blue"
        />
        <PricingCard
          title="Plano Padrão"
          price="19.99"
          description={
            <>
              Com o Plano Padrão, você pode realçar até{' '}
              <strong>5 anúncios</strong> no topo da página, proporcionando
              visibilidade prolongada <strong>por um mês</strong> inteiro. Uma
              escolha sólida para quem busca uma exposição mais extensa e
              duradoura.
            </>
          }
          colorScheme="green"
        />
        <PricingCard
          title="Plano Premium"
          price="29.99"
          description={
            <>
              O Plano Premium é a escolha ideal para aqueles que buscam a máxima
              visibilidade. Destaque até <strong>8 anúncios</strong> no topo da
              página <strong>por dois meses</strong>, garantindo uma exposição
              prolongada e eficaz para promover seus produtos ou serviços. A
              opção perfeita para quem busca resultados duradouros.
            </>
          }
          colorScheme="purple"
        />
      </Flex>
    </Flex>
  )
}
