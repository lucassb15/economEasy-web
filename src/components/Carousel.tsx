import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import Slider from 'react-slick'
import { SliderArrow } from '@components/SliderArrow'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Text,
  Flex,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { AdsContext } from '@contexts/AdsContext'
import { useContext, useEffect } from 'react'

export function Carousel() {
  const { ads, fetchAdsUser, error } = useContext(AdsContext)

  useEffect(() => {
    fetchAdsUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bgColor = useColorModeValue('white', '#262626')
  const filteredAds = ads.filter((ad) => ad.priority)

  const settings = {
    arrows: true,
    slidesToShow: Math.min(filteredAds.length, 3),
    slidesToScroll: 1,
    infinite: filteredAds.length > 1,
    prevArrow: <SliderArrow direction="left" icon={<CaretLeft size={48} />} />,
    nextArrow: (
      <SliderArrow direction="right" icon={<CaretRight size={48} />} />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <>
      {error ? (
        <Alert status="error" borderRadius={4} mt={4}>
          <AlertIcon />
          <AlertTitle>Ocorreu um erro!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : filteredAds.length > 0 ? (
        filteredAds.length >= 1 && filteredAds.length <= 3 ? (
          <Flex direction="row" align="center">
            {filteredAds.map((ad) => (
              <Box
                key={ad.id}
                borderWidth="1px"
                borderRadius="lg"
                w="full"
                maxW="360px"
                h="max"
                maxHeight="400px"
                p={4}
                boxShadow="md"
                bg={bgColor}
              >
                <Flex flexDirection="column" alignItems="center">
                  <Box width="80%" height="180px" position="relative" mb={2}>
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
                    fontSize="lg"
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
          </Flex>
        ) : (
          <Slider className="flex w-full" {...settings}>
            {filteredAds.map((ad) => (
              <Box
                key={ad.id}
                borderWidth="1px"
                borderRadius="lg"
                w="full"
                maxW="360px"
                h="max"
                maxHeight="400px"
                p={4}
                boxShadow="md"
                bg={bgColor}
              >
                <Flex flexDirection="column" alignItems="center">
                  <Box width="80%" height="180px" position="relative" mb={2}>
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
                    fontSize="lg"
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
          </Slider>
        )
      ) : (
        <p>Carregando...</p>
      )}
    </>
  )
}
