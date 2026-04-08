import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
})

export default apiClient
