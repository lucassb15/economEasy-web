import { useContext, useEffect } from 'react'
import { AdsContext } from '@contexts/AdsContext'
import {
  Box,
  Image,
  Text,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  Grid,
} from '@chakra-ui/react'

export function UserAdList() {
  const { ads, fetchAdsUser, error } = useContext(AdsContext)

  useEffect(() => {
    fetchAdsUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <Alert status="error" borderRadius={4} mt={4}>
        <AlertIcon />
        <AlertTitle>Ocorreu um erro!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bgColor = useColorModeValue('white', '#262626')
  const nonPriorityAds = ads.filter((ad) => !ad.priority)

  return (
    <Grid
      gap={4}
      w="full"
      templateColumns={{
        base: 'repeat(auto-fill, minmax(full, 1fr))',
        sm: 'repeat(auto-fill, minmax(200px, 1fr))',
        md: 'repeat(auto-fill, minmax(200px, 1fr))',
        lg: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}
    >
      {nonPriorityAds.map((ad) => (
        <Box
          key={ad.id}
          borderWidth="1px"
          borderRadius="lg"
          w="full"
          maxW="400px"
          h="max"
          maxHeight="400px"
          p={4}
          boxShadow="md"
          bg={bgColor}
          _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
          transition="all 0.3s ease-in-out"
        >
          <Flex flexDirection="column" alignItems="center">
            <Box width="100%" height="200px" position="relative" mb={2}>
              <Image
                src={`http://localhost:3333/${ad.image}`}
                alt={ad.name}
                fit="cover"
                w="100%"
                h="100%"
                borderRadius="lg"
                objectPosition="center"
                _hover={{ opacity: 0.8 }}
              />
            </Box>
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
          </Flex>
        </Box>
      ))}
    </Grid>
  )
}
