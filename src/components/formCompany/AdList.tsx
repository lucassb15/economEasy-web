import { useContext, useEffect, useState } from 'react'
import { AdsContext } from '@contexts/AdsContext'
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

function AdList() {
  const { ads, fetchAds, deleteAd, error } = useContext(AdsContext)

  const [activePopover, setActivePopover] = useState<string | null>(null)
  const { onOpen, onClose } = useDisclosure()

  const imageSize = useBreakpointValue({
    base: '50px',
    sm: '75px',
    md: '200px',
  })

  useEffect(() => {
    fetchAds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ads.length > 0) {
      console.log(
        'Caminhos das imagens:',
        ads.map((ad) => ad.image),
      )
    }
  }, [ads])

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
      {ads.map((ad) => (
        <Box
          key={ad.id}
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
                src={`http://localhost:3333/${ad.image}`}
                alt={ad.name}
                borderRadius="lg"
                _hover={{ opacity: 0.8 }}
                mb={2}
              />
              <Text
                fontWeight="bold"
                fontSize="xl"
                isTruncated
                w="100%"
                textAlign="left"
                maxW="250px"
              >
                {ad.name}
              </Text>
            </VStack>
          </Flex>

          <Popover
            isOpen={activePopover === ad.id}
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
                  setActivePopover(ad.id ?? null)
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
                      if (ad.id) {
                        deleteAd(ad.id)
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
      ))}
    </VStack>
  )
}

export default AdList
