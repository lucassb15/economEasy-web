import { Input } from '../formAuthentication/Input'
import { Envelope, LockKey, User } from '@phosphor-icons/react'
import { FormState, SubmitHandler, useForm } from 'react-hook-form'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema } from '../../schemas/employee.schema'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

interface FormProps {
  FormTitle: string
}

interface EmployeeFormData {
  companyId: string
  email: string
  name: string
  password: string
  confirmPassword: string
  isEmployee: boolean
}

export function FormRegisterEmployee({ FormTitle }: FormProps) {
  const { registerUser, user } = useContext(AuthContext)
  const companyId = user?.id ?? 'error'
  const { register, handleSubmit, formState } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  })
  const { errors } = formState
  console.log(companyId)
  const onSubmit: SubmitHandler<EmployeeFormData> = async (data) => {
    const dados = await registerUser({
      companyId: data.companyId,
      email: data.email,
      name: data.name,
      password: data.password,
      confirmPassword: data.confirmPassword,
      isEmployee: true,
    })

    console.log(dados)
  }

  // Debug erros
  const onError = (
    errors: FormState<EmployeeFormData>['errors'],
    e: unknown,
  ) => {
    console.log(errors, e)
  }

  const inputTextColor = useColorModeValue('black', 'white')
  const bgColor = useColorModeValue('#F3F8FF', '#262626')
  const textColor = useColorModeValue('black', 'white')
  const highlightColor = useColorModeValue('#3182ce', '#3182ce')

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
      <VStack
        as="form"
        spacing={2}
        w="full"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <FormControl hidden>
          <FormLabel htmlFor="companyId">ID da Empresa</FormLabel>
          <Input
            type="text"
            placeholder="ID da Empresa"
            value={user?.id}
            error={errors.companyId}
            color={inputTextColor}
            {...register('companyId', { value: companyId })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Seu nome</FormLabel>
          <Input
            icon={<User size={24} color={highlightColor} weight="regular" />}
            type="text"
            placeholder="Seu nome"
            color={inputTextColor}
            error={errors.name}
            {...register('name')}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <Input
            icon={
              <Envelope size={24} color={highlightColor} weight="regular" />
            }
            type="email"
            placeholder="E-mail"
            color={inputTextColor}
            error={errors.email}
            {...register('email')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email-confirm">Senha</FormLabel>
          <Input
            icon={<LockKey size={24} color={highlightColor} weight="regular" />}
            type="password"
            placeholder="Senha"
            color={inputTextColor}
            error={errors.password}
            {...register('password')}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password-confirm">Confirmar Senha</FormLabel>
          <Input
            icon={<LockKey size={24} color={highlightColor} weight="regular" />}
            type="password"
            placeholder="Confirmar senha"
            color={inputTextColor}
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={3} w={'full'}>
          Criar
        </Button>
      </VStack>
    </Flex>
  )
}
