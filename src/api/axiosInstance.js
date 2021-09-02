import axios from 'axios'
import { API_BASE_URL } from '../constants'
import { logoutAuth } from '../api/authAPI'

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response.data.error_code === 'TOKEN_EXPIRED') {
      try {
        setTimeout(async () => {
          await logoutAuth()
          window.location.href = '/login'
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    }

    console.log(error.response.data, 'error')
    if (error.response.data.message === 'Auth failed') {
      setTimeout(async () => {
        window.location.href = '/login'
      }, 500)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
