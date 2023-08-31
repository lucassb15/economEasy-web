import { api } from '@api/api'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormCompanyAds({ onSubmit }: any) {
  const [image, setImage] = useState('')
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [companyName, setCompanyName] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Prepare os dados. Se "image" for um arquivo, você precisará
    // usar FormData para enviar como parte da requisição.
    const formData = new FormData()
    formData.append('image', image)
    formData.append('productName', productName)
    formData.append('price', price)
    formData.append('companyName', companyName)

    try {
      const response = await api.post('/company/ads', formData)
      console.log(response.data)
      if (onSubmit) {
        onSubmit(response.data)
      }
    } catch (error) {
      console.error('Erro ao enviar os dados do anúncio.', error)
    }
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <input
          type="text"
          placeholder="Nome do produto"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Valor"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome da empresa"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <button type="submit">Criar Anúncio</button>
      </form>
    </div>
  )
}
