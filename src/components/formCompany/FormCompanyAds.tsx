import { useContext } from 'react'
import { AdsContext } from '../../contexts/AdsContext'
import { AuthContext } from '@contexts/AuthContext'

import { SubmitHandler, useForm } from 'react-hook-form'
import { adSchema } from '../../schemas/ad.schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { Image, StarOfDavid } from '@phosphor-icons/react'
import { Input } from '@components/Input'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'

interface FormProps {
  FormTitle: string
}

interface AdFormData {
  image: FileList
  companyId: string
}

export function FormCompanyAds({ FormTitle }: FormProps) {
  const { user } = useContext(AuthContext)
  const { createAd } = useContext(AdsContext)

  const { register, handleSubmit, formState } = useForm<AdFormData>({
    resolver: zodResolver(adSchema),
  })
  const { errors } = formState

  const onSubmit: SubmitHandler<AdFormData> = async (data) => {
    const success = await createAd({
      image: data.image[0],
      companyId: data.companyId,
    })

    // Recarregar a página apenas se a chamada à API for bem-sucedida
    if (success) {
      setTimeout(() => window.location.reload(), 2000)
    }
  }

  const inputTextColor = useColorModeValue('black', 'white')
  const bgColor = useColorModeValue('#F3F8FF', '#262626')
  const textColor = useColorModeValue('black', 'white')
  const highlightColor = useColorModeValue('#3182ce', '#3182ce')

  return (
    <Flex
      flexDirection="column"
      w="full"
      maxW="450px"
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
      <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
        <FormControl hidden>
          <FormLabel htmlFor="companyId">ID da Empresa</FormLabel>
          <Input
            icon={
              <StarOfDavid size={24} color={highlightColor} weight="regular" />
            }
            type="text"
            placeholder="ID da Empresa"
            value={user?.id}
            color={inputTextColor}
            error={errors.companyId}
            {...register('companyId')}
          />
          <FormErrorMessage>{errors.companyId?.message}</FormErrorMessage>
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
          Criar Anúncio
        </Button>
      </VStack>
    </Flex>
  )
}
