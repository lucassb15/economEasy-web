import React, { useState, useEffect, useContext } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { AuthContext } from '@contexts/AuthContext'

type DataPoint = {
  date: string
  count: number
}

export function dateToParams(date: Date) {
  return date.toISOString().substring(0, 10).split('-').join('')
}

const ChartPoints: React.FC = () => {
  const { user } = useContext(AuthContext)
  const [pointsData, setPointsData] = useState<DataPoint[]>([])
  const [completionData, setCompletionData] = useState<DataPoint[]>([])

  useEffect(() => {
    const startDate = dateToParams(new Date('2024-01-01'))
    const endDate = dateToParams(new Date('2024-12-31'))

    const apiUrl = `http://localhost:3333/stats/${user?.id}/POINT/${startDate}-${endDate}`

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        const dataFromBackend = await response.json()

        const points: Record<string, number> = {}
        const completions: Record<string, number> = {}

        dataFromBackend.forEach((item: any) => {
          const dateKey = new Date(item.date).toISOString().substring(0, 10)

          if (item.type === 'POINT') {
            points[dateKey] = (points[dateKey] || 0) + 1
          } else if (item.type === 'COMPLETION') {
            completions[dateKey] = (completions[dateKey] || 0) + 1
          }
        })

        const pointsArray = Object.entries(points).map(([date, count]) => ({
          date,
          count,
        }))
        const completionsArray = Object.entries(completions).map(
          ([date, count]) => ({ date, count }),
        )

        setPointsData(pointsArray)
        setCompletionData(completionsArray)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user?.id])

  const formatDateTick = (date: string) => {
    const [year, month, day] = date.split('-')
    return `${day}/${month}`
  }

  return (
    <div className="flex flex-wrap justify-between gap-5">
      <div className="w-full md:w-2/5">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={pointsData}>
            <XAxis dataKey="date" tickFormatter={formatDateTick} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Pontos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-2/5">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={completionData}>
            <XAxis dataKey="date" tickFormatter={formatDateTick} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10B981" name="Concluídos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ChartPoints
