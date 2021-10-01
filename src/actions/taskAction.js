import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  GET_ALL_TASK_BY_USER_REQUEST,
  GET_ALL_TASK_BY_USER_SUCCESS,
  GET_ALL_TASK_BY_USER_FAIL,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  SET_ACTIVE_TASK_TAB,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_ALL_TASK_REQUEST,
  GET_ALL_TASK_SUCCESS,
  GET_ALL_TASK_FAIL,
  RESET_GET_TASKS,
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

const getAllTaskByUserRequest = () => ({
  type: GET_ALL_TASK_BY_USER_REQUEST,
})

const getAllTaskByUserSuccess = payload => ({
  type: GET_ALL_TASK_BY_USER_SUCCESS,
  payload,
})

const getAllTaskByUserFail = error => ({
  type: GET_ALL_TASK_BY_USER_FAIL,
  payload: error,
})

const getAllTaskRequest = () => ({
  type: GET_ALL_TASK_REQUEST,
})

const getAllTaskSuccess = payload => ({
  type: GET_ALL_TASK_SUCCESS,
  payload,
})

const getAllTaskFail = error => ({
  type: GET_ALL_TASK_FAIL,
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

const resetTasks = () => ({
  type: RESET_GET_TASKS,
})

export {
  createTaskRequest,
  createTaskSuccess,
  createTaskFail,
  getAllTaskByUserRequest,
  getAllTaskByUserSuccess,
  getAllTaskByUserFail,
  setActiveTask,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFail,
  getAllTaskRequest,
  getAllTaskSuccess,
  getAllTaskFail,
  resetTasks,
}
