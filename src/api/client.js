import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
})

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default apiClient
