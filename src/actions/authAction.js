import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
} from '../constants'

const registerRequest = () => ({
  type: AUTH_REGISTER_REQUEST,
})

const registerSuccess = payload => ({
  type: AUTH_REGISTER_SUCCESS,
  payload,
})

const registerFail = error => ({
  type: AUTH_REGISTER_FAIL,
  payload: error,
})

const loginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
})

const loginSuccess = payload => ({
  type: AUTH_LOGIN_SUCCESS,
  payload,
})

const loginFail = error => ({
  type: AUTH_LOGIN_FAIL,
  payload: error,
})

export {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
}
