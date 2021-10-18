import {
  SET_DATES_LEAVE,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  CREATE_LEAVE_FAIL,
  GET_CURRENT_LEAVE_REQUEST,
  GET_CURRENT_LEAVE_SUCCESS,
  GET_CURRENT_LEAVE_FAIL,
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

export {
  setDatesLeave,
  createLeaveRequest,
  createLeaveSuccess,
  createLeaveFail,
  getCurrentLeaveRequest,
  getCurrentLeaveSuccess,
  getCurrentLeaveFail,
}
