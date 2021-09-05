import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  GET_CURRENT_PROFILE_REQUEST,
  GET_CURRENT_PROFILE_SUCCESS,
  GET_CURRENT_PROFILE_FAIL,
} from '../constants'

export const profileReducer = (state, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case GET_PROFILE_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    case CREATE_PROFILE_REQUEST:
      return {
        ...state,
        create: {
          ...state.get,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.get,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case CREATE_PROFILE_FAIL:
      return {
        ...state,
        create: {
          ...state.get,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    default:
      return state
  }
}

export const currentProfileReducer = (state, action) => {
  switch (action.type) {
    case GET_CURRENT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        fail: null,
      }
    case GET_CURRENT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        fail: null,
      }
    case GET_CURRENT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        fail: action.payload,
      }
    default:
      return state
  }
}
