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
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function AdList() {
  const { ads, fetchAds, error } = useContext(AdsContext)

  const [activePopover, setActivePopover] = useState<string | null>(null)

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

  const bgColor = useColorModeValue('white', '#262626')

  return (
    <VStack spacing={4} w="full">
      {ads.map((ad) => (
        <Box
          key={ad.id}
          borderWidth="1px"
          borderRadius="lg"
          w="full"
          p={4}
          boxShadow="md"
          bg={bgColor}
        >
          <Flex
            justifyContent="space-between"
            alignItems="start"
            flexDir={{ base: 'column', md: 'row' }}
          >
            <VStack spacing={2} mb={{ base: 4, md: 0 }}>
              <Image
                boxSize={imageSize}
                objectFit="cover"
                src={`http://localhost:3333/${ad.image}`}
                alt={ad.name}
              />
              <Text fontWeight="bold">{ad.name}</Text>
              <Text>Preço: {ad.price}</Text>
            </VStack>

            <Popover
              isOpen={activePopover === ad.id}
              onClose={() => setActivePopover(null)}
              closeOnBlur={false}
              placement="left"
            >
              <PopoverTrigger>
                <IconButton
                  aria-label="Options"
                  icon={<CloseIcon />}
                  onClick={() => setActivePopover(ad.id ?? null)}
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
                      onClick={() => setActivePopover(null)}
                    >
                      Não
                    </Button>
                    <Button colorScheme="red">Sim</Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Box>
      ))}
    </VStack>
  )
}

export default AdList
