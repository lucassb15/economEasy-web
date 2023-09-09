import { useContext, useEffect, useState } from 'react'
import { CardsContext } from '@contexts/CardsContext'
import {
  Box,
  Image,
  Text,
  VStack,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Flex,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { XCircle } from '@phosphor-icons/react'
import toast from 'react-hot-toast'
import colors from 'tailwindcss/colors'

function CardList() {
  const { cards, fetchCards, deleteCard, error } = useContext(CardsContext)

  const [activePopover, setActivePopover] = useState<string | null>(null)
  const { onOpen, onClose } = useDisclosure()

  const imageSize = useBreakpointValue({
    base: '50px',
    sm: '75px',
    md: '200px',
  })

  useEffect(() => {
    fetchCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (cards && cards.length > 0) {
      console.log(
        'Caminhos das imagens:',
        cards.map((card) => card.image),
      )
    }
  }, [cards])

  if (error) {
    return (
      <Alert status="error" borderRadius={4} mt={4}>
        <AlertIcon />
        <AlertTitle>Ocorreu um erro!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }
  if (activePopover) {
    console.log(activePopover)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bgColor = useColorModeValue('white', '#262626')

  return (
    <VStack spacing={4} w="full" align="start">
      {cards.map(
        (card) =>
          card && (
            <Box
              key={card.id}
              position="relative"
              borderWidth="1px"
              borderRadius="lg"
              w="full"
              maxW={{ base: '100%', sm: '320px', md: '300px' }}
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
                <VStack spacing={2} mb={{ base: 4, md: 0 }} align="start">
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
                </VStack>
              </Flex>

              <Popover
                isOpen={activePopover === card.id}
                onClose={() => {
                  setActivePopover(null)
                  onClose()
                }}
                closeOnBlur={false}
                placement="top-end"
              >
                <PopoverTrigger>
                  <IconButton
                    position="absolute"
                    top={2}
                    right={2}
                    aria-label="Options"
                    icon={<CloseIcon />}
                    onClick={() => {
                      setActivePopover(card.id ?? null)
                      onOpen()
                    }}
                    variant="outline"
                    colorScheme="red"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Confirmação!</PopoverHeader>
                  <PopoverBody>
                    Tem certeza de que deseja excluir este anúncio?
                    <Flex justifyContent="space-between" mt={4}>
                      <Button
                        colorScheme="green"
                        onClick={() => {
                          setActivePopover(null)
                          onClose()
                        }}
                      >
                        Não
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          if (card.id) {
                            deleteCard(card.id)
                          } else {
                            toast.error('Erro ao buscar anúncios.', {
                              position: 'top-right',
                              style: {
                                backgroundColor: colors.red[500],
                                color: colors.white,
                                fontSize: 16,
                                fontWeight: 500,
                                padding: 16,
                              },
                              icon: (
                                <XCircle
                                  size={54}
                                  weight="fill"
                                  className="text-gray-50"
                                />
                              ),
                            })
                          }
                        }}
                      >
                        Sim
                      </Button>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          ),
      )}
    </VStack>
  )
}

export default CardList
