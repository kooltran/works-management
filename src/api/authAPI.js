import axiosInstance from './axiosInstance'

const registerAuth = payload => {
  return axiosInstance.post('/user/register', payload).then(res => res.data)
}

const loginAuth = payload => {
  return axiosInstance.post('/user/login', payload).then(res => res.data)
}

const logoutAuth = () => {
  return axiosInstance.get('/user/logout').then(res => res.data)
}

const refreshTokenAuth = token => {
  return axiosInstance.post('/user/token', { token }).then(res => res.data)
}

export { registerAuth, loginAuth, logoutAuth, refreshTokenAuth }
