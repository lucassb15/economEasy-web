import axios from 'axios'
import { parseCookies } from 'nookies'

export function getAPIClient(ctx?: never) {
  const { 'fidelese.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:5137',
  })

  api.interceptors.request.use((config) => {
    // console.log(config)

    return config
  })

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }

  return api
}
