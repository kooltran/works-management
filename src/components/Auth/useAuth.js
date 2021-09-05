import { useHistory } from 'react-router-dom'
import { useAppContext } from '../../AppContext'
import {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  loginFail,
} from '../../actions/authAction'
import { registerAuth, loginAuth, logoutAuth } from '../../api/authAPI'

const useAuth = () => {
  const history = useHistory()
  const { dispatch } = useAppContext()

  const submitRegister = async payload => {
    dispatch(registerRequest())
    try {
      const data = await registerAuth(payload)
      dispatch(registerSuccess(data))
      if (data?.user) {
        history.push('/login')
      }
    } catch (err) {
      dispatch(registerFail(err.message))
    }
  }

  const submitLogin = async payload => {
    dispatch(loginRequest())
    try {
      const data = await loginAuth(payload)
      dispatch(loginSuccess(data))
      if (data.success) {
        history.push('/')
      }
    } catch (error) {
      console.log(error, 'error')
      dispatch(loginFail(error?.response?.data || error.message))
    }
  }

  const submitLogout = async () => {
    try {
      await logoutAuth()
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return {
    submitLogin,
    submitRegister,
    submitLogout,
  }
}

export default useAuth
