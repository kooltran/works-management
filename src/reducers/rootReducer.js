import combineReducers from 'react-combine-reducers'
import { authReducer } from '../reducers/authReducer'

const authInitState = {
  data: {
    token: null,
    user: null,
  },
  isLoggedIn: false,
  loading: false,
  fail: null,
}

const [rootReducer, initialStateCombined] = combineReducers({
  auth: [authReducer, authInitState],
})

export { rootReducer, initialStateCombined }
