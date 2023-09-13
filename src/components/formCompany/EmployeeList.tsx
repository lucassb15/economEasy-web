import { useContext, useEffect } from 'react'
import {
  VStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { AuthContext } from '@contexts/AuthContext'

function EmployeeList() {
  const { employees, user, fetchEmployees, error } = useContext(AuthContext)
  const companyId = user?.id ?? ''

  useEffect(() => {
    if (companyId) {
      fetchEmployees()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const bgColor = useColorModeValue('white', '#262626')

  console.log('User: ', user)
  console.log('Company ID: ', companyId)

  return (
    <VStack spacing={4} w="full" align="start">
      {employees.map((employee) => (
        <Box
          key={employee.id}
          position="relative"
          borderWidth="1px"
          borderRadius="lg"
          w="full"
          maxW={{ base: '100%', sm: '320px', md: '300px' }}
          h="max"
          maxHeight="400px"
          p={4}
          boxShadow="md"
          bg={bgColor}
          _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
          transition="all 0.3s ease-in-out"
        >
          <VStack align="start">
            <Text fontWeight="bold" fontSize="xl">
              {employee.name}
            </Text>
            <Text fontSize="md">Email: {employee.email}</Text>
            {employee.role && (
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {employee.role}
              </Badge>
            )}
          </VStack>
        </Box>
      ))}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Erro ao buscar funcionários!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </VStack>
  )
}

export default EmployeeList
