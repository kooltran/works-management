import Cookies from 'universal-cookie'

const isEmpty = obj => {
  for (var prop in obj) {
    return false
  }
  return true
}

const getRole = () => {
  const cookies = new Cookies()
  const role = cookies.get('role')

  return role
}

const getCurrentUser = () => {
  const cookies = new Cookies()
  const user = cookies.get('user')

  return user
}

export { isEmpty, getRole, getCurrentUser }
