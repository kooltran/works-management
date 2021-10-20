import {
  SET_DATES_LEAVE,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  CREATE_LEAVE_FAIL,
  GET_CURRENT_LEAVE_SUCCESS,
  GET_CURRENT_LEAVE_REQUEST,
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
    case GET_ALL_LEAVE_REQUEST:
      return {
        ...state,
        all: {
          ...state.all,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case GET_ALL_LEAVE_SUCCESS:
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case GET_ALL_LEAVE_FAIL:
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    case DELETE_LEAVE_REQUEST:
      return {
        ...state,
        all: {
          ...state.all,
          deleting: true,
          fail: null,
        },
      }
    case DELETE_LEAVE_SUCCESS:
      const deletedLeaveItem = action.payload
      const deletedLeves = state.all.data?.filter(
        item => item._id !== deletedLeaveItem._id
      )

      return {
        ...state,
        all: {
          ...state.all,
          deleting: false,
          data: deletedLeves,
          fail: null,
        },
      }
    case DELETE_LEAVE_FAIL:
      return {
        ...state,
        all: {
          ...state.all,
          deleting: false,
          data: null,
          fail: action.payload,
        },
      }
    case APPROVE_LEAVE_REQUEST:
      return {
        ...state,
        all: {
          ...state.all,
          approving: true,
          fail: null,
        },
      }
    case APPROVE_LEAVE_SUCCESS:
      const approvedItem = action.payload
      const approvedLeaves = state.all.data?.map(item =>
        item._id === approvedItem._id ? approvedItem : item
      )

      return {
        ...state,
        all: {
          ...state.all,
          approving: false,
          data: approvedLeaves,
          fail: null,
        },
      }
    case APPROVE_LEAVE_FAIL:
      return {
        ...state,
        all: {
          ...state.all,
          approving: false,
          data: null,
          fail: action.payload,
        },
      }
    default:
      return state
  }
}
