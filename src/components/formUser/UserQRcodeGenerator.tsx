import { useContext } from 'react'
import {
  Box,
  Button,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { UserLoyaltyCardsContext } from '@contexts/UserLoyaltyCardsContext'
import { Plus } from '@phosphor-icons/react'

export function UserQRcodeGenerator() {
  const { qrCode, generateQRCodeInitial } = useContext(UserLoyaltyCardsContext)

  return (
    <Box position="fixed" right="1rem" bottom="1rem">
      <Popover>
        <PopoverTrigger>
          <Button colorScheme="green" onClick={generateQRCodeInitial}>
            <Plus />
          </Button>
        </PopoverTrigger>

        <PopoverContent bgColor="rgba(0, 0, 0, 0.7)" color="white">
          <PopoverCloseButton />
          {qrCode && <img src={qrCode} alt="Generated QR Code" width={250} />}
        </PopoverContent>
      </Popover>
    </Box>
  )
}
