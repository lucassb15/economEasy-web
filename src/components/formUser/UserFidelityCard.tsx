import {
  Box,
  Image,
  Text,
  HStack,
  Icon,
  Button,
  PopoverContent,
  PopoverCloseButton,
  Popover,
  PopoverTrigger,
} from '@chakra-ui/react'
import { CheckCircleIcon, CheckIcon } from '@chakra-ui/icons'
import React, { useContext } from 'react'
import { UserLoyaltyCardsContext } from '@contexts/UserLoyaltyCardsContext'

interface FidelityCardProps {
  title: string
  imageUrl: string
  checkedCount: number
  totalCount: number
  id: string
  companyId: string
  completed: number
  redeem: number
  expirationDate: number
  companyName: string
}

const UserFidelityCard: React.FC<FidelityCardProps> = ({
  title,
  imageUrl,
  checkedCount,
  totalCount,
  id,
  companyId,
  completed,
  expirationDate,
  companyName,
  redeem,
}) => {
  const { qrCode, generateQRCodeCard, generateQRCodeRedeem } = useContext(
    UserLoyaltyCardsContext,
  )

  const handleGenerateQRCode = () => {
    generateQRCodeCard(id, companyId)
  }

  const handleGenerateQRCodeRedeem = () => {
    generateQRCodeRedeem(id, companyId)
  }

  console.log(redeem)
  const formatExpirationDate = (days: number): string => {
    const today = new Date()
    const expiration = new Date(today)
    expiration.setDate(today.getDate() + days)

    const day = expiration.getDate().toString().padStart(2, '0')
    const month = (expiration.getMonth() + 1).toString().padStart(2, '0')
    const year = expiration.getFullYear().toString().slice(2)

    return `${day}/${month}/${year}`
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      p={4}
      mb={4}
    >
      <Image src={imageUrl} alt={title} w="100%" h="200px" objectFit="cover" />
      <div>
        <Text fontWeight="bold" fontSize="large" mt={4}>
          Empresa: {companyName}
        </Text>
        <Text fontWeight="bold" fontSize="large" mt={1}>
          Cartão: {title}
        </Text>
      </div>
      <HStack mt={2} spacing={2}>
        {Array.from({ length: totalCount }).map((_, index) => (
          <Icon
            key={index}
            as={CheckIcon}
            color={index < checkedCount ? 'green.500' : 'gray.300'}
          />
        ))}
      </HStack>
      <div>
        <Text className="flex text-center items-center pt-2 pb-1 gap-1">
          <CheckCircleIcon w={4} h={4} color={'green.500'} /> Completos :{' '}
          <Text className="font-medium">{completed}</Text>
        </Text>
        <Text className="flex text-center items-center pb-1 gap-1">
          Valido até:{' '}
          <Text className="font-medium">
            {formatExpirationDate(expirationDate)}
          </Text>
        </Text>
      </div>
      <div className="flex justify-between">
        <Popover>
          <PopoverTrigger>
            <Button
              className="mt-2"
              colorScheme="green"
              onClick={handleGenerateQRCode}
            >
              Gerar QRcode
            </Button>
          </PopoverTrigger>

          <PopoverContent bgColor="rgba(0, 0, 0, 0.7)" color="white">
            <PopoverCloseButton />
            {qrCode && <Image src={qrCode} alt="Generated QR Code" w="250px" />}
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button
              className="mt-2"
              colorScheme="green"
              backgroundColor="green.500"
              onClick={handleGenerateQRCodeRedeem}
            >
              Resgatar
            </Button>
          </PopoverTrigger>

          <PopoverContent bgColor="rgba(0, 0, 0, 0.7)" color="white">
            <PopoverCloseButton />
            {qrCode && <Image src={qrCode} alt="Generated QR Code" w="250px" />}
          </PopoverContent>
        </Popover>
      </div>
    </Box>
  )
}

export default UserFidelityCard
