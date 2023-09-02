import { useContext, useEffect } from 'react'
import { AdsContext } from '@contexts/AdsContext'

function AdList() {
  const { ads, fetchAds, error } = useContext(AdsContext)

  useEffect(() => {
    fetchAds()
  }, [])

  if (error) {
    return (
      <div>
        <p>Ocorreu um erro ao buscar os anúncios:</p>
        <p>{error}</p>
      </div>
    )
  }
  const firstAd = ads.length > 0 ? ads[0] : null

  return (
    <div>
      <ul>
        <li>
          {firstAd && (
            <div>
              <strong>{firstAd.companyId}</strong> - id
            </div>
          )}
        </li>
        {ads.map((ad) => (
          <li key={ad.id}>
            <strong>{ad.name}</strong> - Preço: {ad.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdList
