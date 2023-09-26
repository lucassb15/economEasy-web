import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Webcam from 'react-webcam'
import QrCodeReader from 'qrcode-reader'
import { Button } from './Button'
import { QrCode } from '@phosphor-icons/react'
import { CardsEmployeeContext } from '@contexts/CardsEmployeeContext'

interface QRReaderProps {
  companyCardId?: string
}

export const QRReader: React.FC<QRReaderProps> = ({ companyCardId }) => {
  const webcamRef = useRef<Webcam>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const { sendLoyaltyData } = useContext(CardsEmployeeContext)
  const [intervalId, setIntervalId] = useState<number | null>(null)

  useEffect(() => {
    if (isCameraOpen) {
      const id = window.setInterval(capture, 2000) // captura a cada 2 segundos
      setIntervalId(id)
    } else {
      if (intervalId) {
        window.clearInterval(intervalId)
        setIntervalId(null)
      }
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [isCameraOpen])

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot()
    if (imageSrc) {
      const image = new Image()
      image.src = imageSrc
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (context) {
          canvas.width = image.width
          canvas.height = image.height
          context.drawImage(image, 0, 0, image.width, image.height)
          const imageData = context.getImageData(
            0,
            0,
            image.width,
            image.height,
          )

          const qr = new QrCodeReader()
          qr.callback = (
            err: unknown,
            value: { result: React.SetStateAction<string | null> },
          ) => {
            if (err) {
              console.error(err)
              console.log('QR code não encontrado')
              return
            }
            console.log('QR Code encontrado!', value.result)

            try {
              const decodedData = JSON.parse(value.result as string)
              sendLoyaltyData({
                customerId: decodedData.customerId,
                token: decodedData.token,
                companyCardId: companyCardId!,
              })
            } catch (error) {
              console.error('Erro ao decodificar o JSON do QR code:', error)
            }

            setIsCameraOpen(false)
          }
          qr.decode(imageData)
        }
      }
    }
  }, [webcamRef])

  return (
    <div>
      {isCameraOpen ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            height={400}
          />
          <Button
            icon={<QrCode size={24} weight="bold" />}
            ButtonTitle="Capturar QRcode"
            onClick={capture}
          />
        </>
      ) : (
        <>
          <Button
            icon={<QrCode size={24} weight="bold" />}
            ButtonTitle="Ler QR CODE"
            onClick={() => setIsCameraOpen(true)}
          ></Button>
        </>
      )}
    </div>
  )
}

export default QRReader
