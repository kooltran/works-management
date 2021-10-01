import Cookies from 'universal-cookie'
import { format } from 'date-fns'
import moment from 'moment'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

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

const sortByMonth = arr => {
  arr.sort(function (a, b) {
    return months.indexOf(format(a, 'LLLL')) - months.indexOf(format(b, 'LLLL'))
  })
}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value)
}

const getStartDateWeek = (date = new Date()) =>
  moment(date).startOf('isoWeek').isoWeekday(1)

const getEndDateWeek = (date = new Date()) => moment(date).endOf('isoWeek')

const dateBetweenRange = (date, rangeDate = new Date()) =>
  moment(date).isBetween(
    getStartDateWeek(rangeDate),
    getEndDateWeek(rangeDate),
    undefined,
    '[]'
  )

const getWeekRange = (date = new Date()) => `${getStartDateWeek(date).format(
  'DD/MM/yyyy'
)} -
  ${getEndDateWeek(date).format('DD/MM/yyyy')}`

export {
  isEmpty,
  getRole,
  getCurrentUser,
  sortByMonth,
  getKeyByValue,
  dateBetweenRange,
  getStartDateWeek,
  getEndDateWeek,
  getWeekRange,
}
