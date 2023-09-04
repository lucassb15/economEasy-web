import { useContext, useEffect } from 'react'
import { AdsContext } from '@contexts/AdsContext'
import { AuthContext } from '@contexts/AuthContext'
import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'

function AdList() {
  const { ads, fetchAds, error } = useContext(AdsContext)
  const { user } = useContext(AuthContext)
  const theme = useTheme()

  useEffect(() => {
    fetchAds()
  }, [])
  useEffect(() => {
    if (ads.length > 0) {
      console.log(
        'Caminhos das imagens:',
        ads.map((ad) => ad.image),
      )
    }
  }, [ads])

  if (error) {
    return (
      <div>
        <p>Ocorreu um erro ao buscar os anúncios:</p>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
      {ads.map((ad) => (
        <Paper
          key={ad.id}
          elevation={3}
          className={`p-4 space-y-4 ${
            theme.palette.mode === 'dark'
              ? 'bg-gray-700 text-white'
              : 'bg-white text-black'
          } shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg`}
        >
          <img
            className="mx-auto w-24 h-24 rounded-full object-cover"
            src={`http://localhost:3333/${ad.image}`}
            alt={ad.name}
          />
          <div className="text-center">
            <Typography variant="h6" className="font-semibold">
              {ad.name}
            </Typography>
            <Typography
              variant="body2"
              className={
                theme.palette.mode === 'dark'
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }
            >
              Preço: {ad.price}
            </Typography>
            <Typography
              variant="body2"
              className={
                theme.palette.mode === 'dark'
                  ? 'text-gray-500'
                  : 'text-gray-500'
              }
              mt={2}
            >
              Loja: {user?.name}
            </Typography>
          </div>
        </Paper>
      ))}
    </div>
  )
}

export default AdList
