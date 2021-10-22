import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_CURRENT_PROFILE_REQUEST,
  GET_CURRENT_PROFILE_SUCCESS,
  GET_CURRENT_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
} from '../constants'

const getProfileRequest = () => ({
  type: GET_PROFILE_REQUEST,
})

const getProfileSuccess = payload => ({
  type: GET_PROFILE_SUCCESS,
  payload,
})

const getProfileFail = error => ({
  type: GET_PROFILE_FAIL,
  payload: error,
})

const getCurrentProfileRequest = () => ({
  type: GET_CURRENT_PROFILE_REQUEST,
})

const getCurrentProfileSuccess = payload => ({
  type: GET_CURRENT_PROFILE_SUCCESS,
  payload,
})

const getCurrentProfileFail = error => ({
  type: GET_CURRENT_PROFILE_FAIL,
  payload: error,
})

const createProfileRequest = () => ({
  type: CREATE_PROFILE_REQUEST,
})

const createProfileSuccess = payload => ({
  type: CREATE_PROFILE_SUCCESS,
  payload,
})

const createProfileFail = error => ({
  type: CREATE_PROFILE_FAIL,
  payload: error,
})

const updateProfileRequest = () => ({
  type: UPDATE_PROFILE_REQUEST,
})

const updateProfileSuccess = payload => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload,
})

const updateProfileFail = error => ({
  type: UPDATE_PROFILE_FAIL,
  payload: error,
})

const deleteProfileRequest = () => ({
  type: DELETE_PROFILE_REQUEST,
})

const deleteProfileSuccess = payload => ({
  type: DELETE_PROFILE_SUCCESS,
  payload,
})

const deleteProfileFail = error => ({
  type: DELETE_PROFILE_FAIL,
  payload: error,
})

export {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
  createProfileRequest,
  createProfileSuccess,
  createProfileFail,
  getCurrentProfileRequest,
  getCurrentProfileSuccess,
  getCurrentProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFail,
}
