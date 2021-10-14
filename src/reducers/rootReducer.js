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
  create: {
    loading: false,
    data: null,
    fail: null,
  },
  get: {
    loading: false,
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
