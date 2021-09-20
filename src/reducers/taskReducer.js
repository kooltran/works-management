import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  SET_ACTIVE_TASK_TAB,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_ALL_TASKS_BY_USER,
} from '../constants'

export const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASK_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case GET_TASK_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case GET_ALL_TASKS_BY_USER:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          all: action.payload,
          fail: null,
        },
      }
    case GET_TASK_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        create: {
          ...state.get,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        create: {
          ...state.get,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case CREATE_TASK_FAIL:
      return {
        ...state,
        create: {
          ...state.get,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          updating: true,
          fail: null,
        },
      }
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          updating: false,
          data: action.payload,
          fail: null,
        },
      }
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          updating: false,
          data: null,
          fail: action.payload,
        },
      }
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          deleting: true,
          fail: null,
        },
      }
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          deleting: false,
          data: action.payload,
          fail: null,
        },
      }
    case DELETE_TASK_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          deleting: false,
          data: null,
          fail: action.payload,
        },
      }
    case SET_ACTIVE_TASK_TAB: {
      return {
        ...state,
        activeTab: action.payload,
      }
    }
    default:
      return state
  }
}
