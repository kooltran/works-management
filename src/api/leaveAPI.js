import axiosInstance from './axiosInstance'

const createLeave = payload => {
  return axiosInstance.post('/leave', payload).then(res => res.data)
}

const getCurrentUserLeaves = () => {
  return axiosInstance.get('/leave/current').then(res => res.data)
}

export { createLeave, getCurrentUserLeaves }
