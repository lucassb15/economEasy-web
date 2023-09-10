import { useContext } from 'react'
import { CardsContext } from '../../contexts/CardsContext'
import { AuthContext } from '@contexts/AuthContext'
import { FormState, SubmitHandler, useForm } from 'react-hook-form'

import { cardSchema } from '../../schemas/card.schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { Cards, Check, Image } from '@phosphor-icons/react'
import { Input } from '@components/formAuthentication/Input'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

interface FormProps {
  FormTitle: string
}

interface CardFormData {
  companyId: string
  name: string
  maxPoints: number
  image: FileList
}

export function FormCompanyCards({ FormTitle }: FormProps) {
  const { user } = useContext(AuthContext)
  const { createCard } = useContext(CardsContext)
  const companyId = user?.id ?? ''

  const { register, handleSubmit, formState } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
  })
  const { errors } = formState

  const onSubmit: SubmitHandler<CardFormData> = async (data) => {
    const success = await createCard({
      companyId: data.companyId,
      name: data.name,

      maxPoints: Math.floor(data.maxPoints),
      image: data.image[0],
    })

    // Recarregar a página apenas se a chamada à API for bem-sucedida
    if (success) {
      setTimeout(() => window.location.reload(), 1000)
    }
  }
  const inputTextColor = useColorModeValue('black', 'white')
  const bgColor = useColorModeValue('#F3F8FF', '#262626')
  const textColor = useColorModeValue('black', 'white')
  const highlightColor = useColorModeValue('#3182ce', '#3182ce')

  // Debug erros
  const onError = (errors: FormState<CardFormData>['errors'], e: unknown) => {
    console.log(errors, e)
  }

  return (
    <Flex
      flexDirection="column"
      w="full"
      maxW="400px"
      mt={0}
      bgColor={bgColor}
      color={textColor}
      p={4}
      borderRadius="md"
      boxShadow="sm"
    >
      <Heading size="md" mb={4}>
        {FormTitle}
      </Heading>
      <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit, onError)}>
        <FormControl hidden>
          <FormLabel htmlFor="companyId">ID da Empresa</FormLabel>
          <Input
            type="text"
            placeholder="ID da Empresa"
            value={user?.id}
            error={errors.companyId}
            {...register('companyId', { value: companyId })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Nome do Cartão</FormLabel>
          <Input
            icon={<Cards size={24} color={highlightColor} weight="regular" />}
            type="text"
            placeholder="Nome do Cartão"
            color={inputTextColor}
            error={errors.name}
            {...register('name')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="maxPoints">Quantidade de Check-in</FormLabel>
          <Input
            icon={<Check size={24} color={highlightColor} weight="regular" />}
            type="number"
            placeholder="Quantidade de check-in"
            color={inputTextColor}
            error={errors.maxPoints}
            {...register('maxPoints')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="image">Imagem</FormLabel>
          <Input
            icon={
              <Image
                color={highlightColor}
                alt="Icone para o input de adicionar imagem"
                size={24}
                weight="regular"
              />
            }
            type="file"
            error={errors.image}
            {...register('image')}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" w={'full'} mt={1}>
          Criar Cartão
        </Button>
      </VStack>
    </Flex>
  )
}
