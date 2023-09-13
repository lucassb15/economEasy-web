import { useContext, useEffect } from 'react'
import {
  VStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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

  console.log('User: ', user)
  console.log('Company ID: ', companyId)

  return (
    <VStack spacing={4} w="full" align="start">
      {employees.map((employee) => (
        <Text key={employee.id}>{employee.name}</Text>
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
