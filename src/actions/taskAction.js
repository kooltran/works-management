import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  SET_ACTIVE_TASK_TAB,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_ALL_TASKS_BY_USER,
} from '../constants'

const createTaskRequest = () => ({
  type: CREATE_TASK_REQUEST,
})

const createTaskSuccess = payload => ({
  type: CREATE_TASK_SUCCESS,
  payload,
})

const createTaskFail = error => ({
  type: CREATE_TASK_FAIL,
  payload: error,
})

const getTaskRequest = () => ({
  type: GET_TASK_REQUEST,
})

const getTaskSuccess = payload => ({
  type: GET_TASK_SUCCESS,
  payload,
})

const getTaskFail = error => ({
  type: GET_TASK_FAIL,
  payload: error,
})

const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
})

const updateTaskSuccess = payload => ({
  type: UPDATE_TASK_SUCCESS,
  payload,
})

const updateTaskFail = error => ({
  type: UPDATE_TASK_FAIL,
  payload: error,
})

const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
})

const deleteTaskSuccess = payload => ({
  type: DELETE_TASK_SUCCESS,
  payload,
})

const deleteTaskFail = error => ({
  type: DELETE_TASK_FAIL,
  payload: error,
})

const setActiveTask = tabId => ({
  type: SET_ACTIVE_TASK_TAB,
  payload: tabId,
})

const getAllTaskByUser = payload => ({
  type: GET_ALL_TASKS_BY_USER,
  payload,
})

export {
  createTaskRequest,
  createTaskSuccess,
  createTaskFail,
  getTaskRequest,
  getTaskSuccess,
  getTaskFail,
  setActiveTask,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFail,
  getAllTaskByUser,
}
