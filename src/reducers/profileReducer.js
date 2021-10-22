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
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
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
        get: {
          ...state.get,
          createSuccess: false,
          creating: true,
          createFail: null,
        },
      }
    case CREATE_PROFILE_SUCCESS:
      const createdProfile = action.payload
      return {
        ...state,
        get: {
          ...state.get,
          creating: false,
          createSuccess: true,
          data: [...state?.get?.data, createdProfile],
          createFail: null,
        },
      }
    case CREATE_PROFILE_FAIL:
      console.log(action.payload, 'action.payload')
      return {
        ...state,
        get: {
          ...state.get,
          createSuccess: false,
          creating: false,
          createFail: action.payload,
        },
      }
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          updating: true,
        },
      }
    case UPDATE_PROFILE_SUCCESS: {
      const updatedProfileItem = action.payload
      const updatedProfile = state?.get?.data.map(item =>
        item._id === updatedProfileItem._id ? updatedProfileItem : item
      )
      return {
        ...state,
        get: {
          ...state.get,
          updating: false,
          data: updatedProfile,
          fail: null,
        },
      }
    }
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          updating: false,
          data: null,
          fail: action.payload,
        },
      }
    case DELETE_PROFILE_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          deleting: true,
        },
      }
    case DELETE_PROFILE_SUCCESS: {
      const deletedProfileItem = action.payload
      const deletedProfiles = state?.get?.data.filter(
        item => item._id !== deletedProfileItem._id
      )
      return {
        ...state,
        get: {
          ...state.get,
          deleting: false,
          data: deletedProfiles,
          fail: null,
        },
      }
    }
    case DELETE_PROFILE_FAIL:
      return {
        ...state,
        get: {
          ...state.get,
          deleting: false,
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
