import {
  SET_DATES_LEAVE,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  CREATE_LEAVE_FAIL,
  GET_CURRENT_LEAVE_SUCCESS,
  GET_CURRENT_LEAVE_REQUEST,
  GET_CURRENT_LEAVE_FAIL,
} from '../constants'

export const leaveReducer = (state, action) => {
  switch (action.type) {
    case SET_DATES_LEAVE:
      return {
        ...state,
        dates: action.payload,
      }
    case CREATE_LEAVE_REQUEST:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case CREATE_LEAVE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case CREATE_LEAVE_FAIL:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    case GET_CURRENT_LEAVE_REQUEST:
      return {
        ...state,
        get: {
          loading: true,
          data: null,
          fail: null,
        },
      }
    case GET_CURRENT_LEAVE_SUCCESS:
      return {
        ...state,
        get: {
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case GET_CURRENT_LEAVE_FAIL:
      return {
        ...state,
        get: {
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    default:
      return state
  }
}
