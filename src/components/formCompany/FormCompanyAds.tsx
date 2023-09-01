import { Image, Package, Money, Buildings } from '@phosphor-icons/react'
import { api } from '@api/api'
import { Input } from '@components/formAuthentication/Input'
import { AuthContext } from '@contexts/AuthContext'
import { useContext, useState } from 'react'
import { Button } from '@components/Button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormCompanyAds({ onSubmit }: any) {
  const { user } = useContext(AuthContext)
  const [image, setImage] = useState<File | null>(null)
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [companyName, setCompanyName] = useState(user?.name || '')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Prepare os dados. Se "image" for um arquivo, você precisará
    // usar FormData para enviar como parte da requisição.
    const formData = new FormData()
    formData.append('name', productName)
    formData.append('price', price)
    formData.append('company', companyName)
    if (image) {
      formData.append('image', image)
    }
    console.log(companyName)
    console.log(price)
    console.log(productName)
    console.log(image)
    try {
      const response = await api.post('/create/ad', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(response.data)
      if (onSubmit) {
        onSubmit(response.data)
      }
    } catch (error) {
      console.error('Erro ao enviar os dados do anúncio.', error)
    }
  }

  return (
    <div className="flex flex-col items-start px-4 md:px-0">
      <form
        className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="Imagem">Imagem do produto</label>
          <Input
            // eslint-disable-next-line jsx-a11y/alt-text
            icon={<Image size={24} />}
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0])
              }
            }}
          />
        </div>

        <div>
          <label htmlFor="Nome Produto">Nome do produto</label>
          <Input
            icon={<Package size={24} />}
            type="text"
            placeholder="Nome do produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="Preço">Preço do produto</label>
          <Input
            icon={<Money size={24} />}
            type="text"
            placeholder="Valor"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="select-none">
          <label htmlFor="Nome Empresa">Nome da empresa</label>
          <Input
            icon={<Buildings size={24} />}
            type="text"
            placeholder="Nome da empresa"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={true}
          />
        </div>
        <Button ButtonTitle="Criar Anúncio"></Button>
      </form>
    </div>
  )
}
