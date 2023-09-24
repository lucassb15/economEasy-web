import { Box, Image, Text, HStack, Icon } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import React from 'react'

interface FidelityCardProps {
  title: string
  imageUrl: string
  checkedCount: number
  totalCount: number
}

const UserFidelityCard: React.FC<FidelityCardProps> = ({
  title,
  imageUrl,
  checkedCount,
  totalCount,
}) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      p={4}
      m={4}
    >
      <Image src={imageUrl} alt={title} />
      <Text fontWeight="bold" fontSize="2xl" mt={4}>
        {title}
      </Text>
      <HStack mt={2} spacing={2}>
        {Array.from({ length: totalCount }).map((_, index) => (
          <Icon
            key={index}
            as={CheckIcon}
            color={index < checkedCount ? 'green.500' : 'gray.300'}
          />
        ))}
      </HStack>
    </Box>
  )
}

export default UserFidelityCard
