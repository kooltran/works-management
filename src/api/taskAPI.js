import axiosInstance from './axiosInstance'

const createTask = payload => {
  return axiosInstance.post('/task', payload).then(res => res.data)
}

const updateTask = payload => {
  return axiosInstance.post('/task/update', payload).then(res => res.data)
}

const getTasks = payload => {
  return axiosInstance.get('/task/tasks-by-user', payload).then(res => res.data)
}

const getAllTasks = payload => {
  return axiosInstance.get('/task/all', payload).then(res => res.data)
}

const deleteTask = id => {
  return axiosInstance.delete(`/task/${id}`).then(res => res.data)
}

export { createTask, getTasks, updateTask, deleteTask, getAllTasks }
