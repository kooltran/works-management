import combineReducers from 'react-combine-reducers'
import { authReducer } from '../reducers/authReducer'
import {
  profileReducer,
  currentProfileReducer,
} from '../reducers/profileReducer'

import { leaveReducer } from './leaveReducer'

import { taskReducer } from './taskReducer'

const authInitState = {
  data: {
    token: null,
    user: null,
  },
  isLoggedIn: false,
  loading: false,
  fail: null,
}

const profileInitState = {
  get: {
    loading: false,
    updating: false,
    deleting: false,
    creating: false,
    createFail: null,
    createSuccess: false,
    data: null,
    fail: null,
  },
  create: {
    loading: false,
    data: null,
    fail: null,
  },
}

const currentProfileInitState = {
  loading: false,
  data: null,
  fail: null,
}

const taskInitState = {
  get: {
    loading: false,
    updating: false,
    deleting: false,
    updatedFail: null,
    deletedFail: null,
    data: null,
    fail: null,
  },
  all: {
    loading: false,
    data: null,
    fail: null,
  },
  create: {
    loading: false,
    data: null,
    fail: null,
  },
  activeTab: null,
}

const leaveInitState = {
  dates: [],
  get: {
    loading: false,
    creating: false,
    createdFail: false,
    data: null,
    fail: null,
  },
  all: {
    loading: false,
    deleting: false,
    approving: false,
    data: null,
    fail: null,
  },
}

const [rootReducer, initialStateCombined] = combineReducers({
  auth: [authReducer, authInitState],
  profile: [profileReducer, profileInitState],
  currentProfile: [currentProfileReducer, currentProfileInitState],
  task: [taskReducer, taskInitState],
  leave: [leaveReducer, leaveInitState],
})

export { rootReducer, initialStateCombined }
