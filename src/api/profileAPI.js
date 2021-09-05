import axiosInstance from './axiosInstance'

const getProfile = () => {
  return axiosInstance.get('/profile').then(res => res.data)
}

const getCurrentProfile = () => {
  return axiosInstance.get('/profile/current').then(res => res.data)
}

const createProfile = payload => {
  return axiosInstance.post('/profile', payload).then(res => res.data)
}

const deleteProfile = id => {
  return axiosInstance.delete(`/profile/${id}`).then(res => res.data)
}

export { getProfile, createProfile, deleteProfile, getCurrentProfile }
