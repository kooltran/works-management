import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_LOGOUT,
} from '../constants'

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
        data: null,
        fail: null,
      }
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        data: {
          ...state.data,
          user: action.payload,
        },
        fail: null,
      }
    case AUTH_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        data: null,
        fail: action.payload,
      }
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
        data: null,
        fail: null,
      }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        data: action.payload,
        fail: null,
      }
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        data: null,
        fail: action.payload,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        data: null,
        fail: null,
      }
    default:
      return state
  }
}
