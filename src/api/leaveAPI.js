import axiosInstance from './axiosInstance'

const createLeave = payload => {
  return axiosInstance.post('/leave', payload).then(res => res.data)
}

const getCurrentUserLeaves = () => {
  return axiosInstance.get('/leave/current').then(res => res.data)
}

const getAllLeave = () => {
  return axiosInstance.get('/leave/all').then(res => res.data)
}

const deleteLeave = id => {
  return axiosInstance.delete(`/leave/${id}`).then(res => res.data)
}

const approveLeave = payload => {
  return axiosInstance.post('/leave/approve', payload).then(res => res.data)
}

export {
  createLeave,
  getCurrentUserLeaves,
  getAllLeave,
  deleteLeave,
  approveLeave,
}
