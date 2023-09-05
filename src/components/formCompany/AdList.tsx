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

function AdList() {
  const { ads, fetchAds, error } = useContext(AdsContext)

  const [activePopover, setActivePopover] = useState<string | null>(null)
  const { onOpen, onClose } = useDisclosure()

  const imageSize = useBreakpointValue({
    base: '50px',
    sm: '75px',
    md: '100px',
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
              <Text fontSize="lg" textAlign="left">
                Preço: {ad.price}
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
                  <Button colorScheme="red">Sim</Button>
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
