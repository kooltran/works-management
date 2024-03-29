import {
  GET_ALL_TASK_BY_USER_REQUEST,
  GET_ALL_TASK_BY_USER_SUCCESS,
  GET_ALL_TASK_BY_USER_FAIL,
  GET_ALL_TASK_REQUEST,
  GET_ALL_TASK_SUCCESS,
  GET_ALL_TASK_FAIL,
  SET_ACTIVE_TASK_TAB,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  RESET_GET_TASKS,
} from '../constants'

export const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASK_BY_USER_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          loading: true,
          updatedFail: null,
          deletedFail: null,
          data: null,
          fail: null,
        },
      }
    case GET_ALL_TASK_BY_USER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          updatedFail: null,
          deletedFail: null,
          data: action.payload,
          fail: null,
        },
      }
    case GET_ALL_TASK_BY_USER_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          updatedFail: null,
          deletedFail: null,
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
          updatedFail: null,
        },
      }
    case UPDATE_TASK_SUCCESS:
      const updatedTask = action.payload
      const updatedTasks = state.get.data?.map(item =>
        item._id === updatedTask._id ? { ...item, updatedTask } : item
      )
      return {
        ...state,
        get: {
          ...state.get,
          updating: false,
          data: updatedTasks,
          updatedFail: null,
        },
      }
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          updating: false,
          data: null,
          updatedFail: action.payload,
        },
      }
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          deleting: true,
          deletedFail: null,
          fail: null,
        },
      }
    case DELETE_TASK_SUCCESS:
      const deletedTask = action.payload
      const deletedTasks = state.get.data?.map(item =>
        item._id === deletedTask._id ? { ...item, deletedTask } : item
      )
      return {
        ...state,
        get: {
          ...state.get,
          deleting: false,
          deletedFail: null,
          data: deletedTasks,
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
          deletedFail: action.payload,
        },
      }
    case SET_ACTIVE_TASK_TAB: {
      return {
        ...state,
        activeTab: action.payload,
      }
    }
    case GET_ALL_TASK_REQUEST:
      return {
        ...state,
        all: {
          ...state.all,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case GET_ALL_TASK_SUCCESS:
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case GET_ALL_TASK_FAIL:
      return {
        ...state,
        all: {
          ...state.all,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          data: null,
          fail: null,
        },
      }
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          data: action.payload,
          fail: null,
        },
      }
    case CREATE_TASK_FAIL:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          data: null,
          fail: action.payload,
        },
      }
    case RESET_GET_TASKS:
      return {
        ...state,
        get: {
          ...state.get,
          loading: false,
          data: null,
          fail: null,
        },
      }
    default:
      return state
  }
}
