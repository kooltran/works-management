import combineReducers from 'react-combine-reducers'
import { authReducer } from '../reducers/authReducer'
import {
  profileReducer,
  currentProfileReducer,
} from '../reducers/profileReducer'

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

const [rootReducer, initialStateCombined] = combineReducers({
  auth: [authReducer, authInitState],
  profile: [profileReducer, profileInitState],
  currentProfile: [currentProfileReducer, currentProfileInitState],
})

export { rootReducer, initialStateCombined }
