import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

export default axiosClient
