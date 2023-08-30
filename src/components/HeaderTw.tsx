import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react'
import { Airplane, Alarm } from '@phosphor-icons/react'
import { CompanyProps } from '../@types/Company'
import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { useParams } from 'react-router-dom'
export function HeaderTw() {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<CompanyProps | null>(null)

  useEffect(() => {
    api
      .get(`/company/${id}`)
      .then((response) => {
        setCompany(response.data)
      })
      .catch((error) => {
        console.log('Erro ao obter detalhes da empresa.', error)
      })
  }, [id])

  const listItemStyle = 'hover:bg-darkblue-hover transition duration-300'
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 bg-darkblue text-white">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          <img src={company?.logo} alt="Logo da empresa" />
        </Typography>
      </div>
      <List>
        <ListItem className={listItemStyle}>
          <ListItemPrefix>
            <Airplane className="h-5 w-5" color="white" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem className={listItemStyle}>
          <ListItemPrefix>
            <Alarm className="h-5 w-5" color="white" />
          </ListItemPrefix>
          Cards
        </ListItem>
        <ListItem className={listItemStyle}>
          <ListItemPrefix>
            <Airplane className="h-5 w-5" color="white" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className={listItemStyle}>
          <ListItemPrefix>
            <Airplane className="h-5 w-5" color="white" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  )
}
