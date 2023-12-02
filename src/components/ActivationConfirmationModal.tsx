import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react'
import { destroyCookie } from 'nookies'
import { useNavigate } from 'react-router-dom'

interface ActivationConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onActivate: () => void
}

const ActivationConfirmationModal: React.FC<
  ActivationConfirmationModalProps
> = ({ isOpen, onClose, onActivate }) => {
  const navigate = useNavigate()

  const handleActivate = () => {
    onActivate()
    onClose() // Fecha o modal após a ativação
  }

  const handleCancel = () => {
    onClose() // Fecha o modal ao clicar em Cancelar
    destroyCookie(null, 'fidelese.token') // Limpa o cookie
    onClose() // Fecha o modal ao clicar em Cancelar
    navigate('/') // Navega para a tela "/"
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      isCentered
      blockScrollOnMount
      closeOnOverlayClick={false} // Impede o fechamento ao clicar fora do modal
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ativação de Conta</ModalHeader>
        <ModalBody>Sua conta está inativa. Deseja ativá-la agora?</ModalBody>

        <ModalFooter
          display="flex"
          flexDirection="row"
          border="1px solid red.500"
          alignItems="center"
          justifyContent="space-between"
          textAlign="center"
        >
          <Button colorScheme="green" mr={3} onClick={handleActivate}>
            Ativar Conta
          </Button>
          <Button colorScheme="red" onClick={handleCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ActivationConfirmationModal
