import { AuthContext } from '@contexts/AuthContext'
import React, { useState, useEffect, useContext } from 'react'
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'

type DataPoint = {
  date: string
  point: number
  completed: number
}

export function dateToParams(date: Date) {
  return date.toISOString().substring(0, 10).split('-').join('')
}

const ChartPoints: React.FC = () => {
  const { user } = useContext(AuthContext)
  const [chartData, setChartData] = useState<DataPoint[]>([])

  useEffect(() => {
    const type = 'POINT'
    const startDate = dateToParams(new Date('2023-01-01'))
    const endDate = dateToParams(new Date('2023-12-31'))

    const apiUrl = `http://localhost:3333/stats/${user?.id}/${type}/${startDate}-${endDate}`

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        const dataFromBackend = await response.json()

        // Consolidar os pontos por data
        const aggregatedData: Record<string, DataPoint> = {}

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataFromBackend.forEach((item: any) => {
          const dateKey = new Date(item.date).toISOString().substring(0, 10)

          if (!aggregatedData[dateKey]) {
            aggregatedData[dateKey] = {
              date: dateKey,
              point: 0,
              completed: 0,
            }
          }

          aggregatedData[dateKey].point += 1 // Incrementa o valor dos pontos
        })

        // Transforma o objeto consolidado em um array e ordena por data
        const transformedData = Object.values(aggregatedData).sort((a, b) =>
          a.date.localeCompare(b.date),
        )

        setChartData(transformedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const formatDateTick = (date: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [year, month, day] = date.split('-')
    return `${day}/${month}`
  }

  return (
    <ResponsiveContainer width="30%" height={230}>
      <BarChart data={chartData}>
        <XAxis dataKey="date" tickFormatter={formatDateTick} />
        <Tooltip contentStyle={{ background: '#000' }} />
        <Bar dataKey="point" fill="#8884d8" name="Pontos" legendType="circle" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ChartPoints
