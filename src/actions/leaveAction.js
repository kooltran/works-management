import {
  SET_DATES_LEAVE,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  CREATE_LEAVE_FAIL,
  GET_CURRENT_LEAVE_REQUEST,
  GET_CURRENT_LEAVE_SUCCESS,
  GET_CURRENT_LEAVE_FAIL,
  GET_ALL_LEAVE_REQUEST,
  GET_ALL_LEAVE_SUCCESS,
  GET_ALL_LEAVE_FAIL,
  DELETE_LEAVE_REQUEST,
  DELETE_LEAVE_SUCCESS,
  DELETE_LEAVE_FAIL,
  APPROVE_LEAVE_REQUEST,
  APPROVE_LEAVE_SUCCESS,
  APPROVE_LEAVE_FAIL,
} from '../constants'

const setDatesLeave = payload => ({
  type: SET_DATES_LEAVE,
  payload,
})

const createLeaveRequest = () => ({
  type: CREATE_LEAVE_REQUEST,
})

const createLeaveSuccess = payload => ({
  type: CREATE_LEAVE_SUCCESS,
  payload,
})

const createLeaveFail = error => ({
  type: CREATE_LEAVE_FAIL,
  payload: error,
})

const getCurrentLeaveRequest = () => ({
  type: GET_CURRENT_LEAVE_REQUEST,
})

const getCurrentLeaveSuccess = payload => ({
  type: GET_CURRENT_LEAVE_SUCCESS,
  payload,
})

const getCurrentLeaveFail = error => ({
  type: GET_CURRENT_LEAVE_FAIL,
  payload: error,
})

const getAllLeaveRequest = () => ({
  type: GET_ALL_LEAVE_REQUEST,
})

const getAllLeaveSuccess = payload => ({
  type: GET_ALL_LEAVE_SUCCESS,
  payload,
})

const getAllLeaveFail = error => ({
  type: GET_ALL_LEAVE_FAIL,
  payload: error,
})

const deleteLeaveRequest = () => ({
  type: DELETE_LEAVE_REQUEST,
})

const deleteLeaveSuccess = payload => ({
  type: DELETE_LEAVE_SUCCESS,
  payload,
})

const deleteLeaveFail = error => ({
  type: DELETE_LEAVE_FAIL,
  payload: error,
})

const approveLeaveRequest = () => ({
  type: APPROVE_LEAVE_REQUEST,
})

const approveLeaveSuccess = payload => ({
  type: APPROVE_LEAVE_SUCCESS,
  payload,
})

const approveLeaveFail = error => ({
  type: APPROVE_LEAVE_FAIL,
  payload: error,
})

export {
  setDatesLeave,
  createLeaveRequest,
  createLeaveSuccess,
  createLeaveFail,
  getCurrentLeaveRequest,
  getCurrentLeaveSuccess,
  getCurrentLeaveFail,
  getAllLeaveRequest,
  getAllLeaveSuccess,
  getAllLeaveFail,
  deleteLeaveRequest,
  deleteLeaveSuccess,
  deleteLeaveFail,
  approveLeaveRequest,
  approveLeaveSuccess,
  approveLeaveFail,
}
