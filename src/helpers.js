import Cookies from 'universal-cookie'
import { format } from 'date-fns'
import moment from 'moment'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { DateUtils } from 'react-day-picker'

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

const sortBy = (arr, by, order = 'asc', options = { tz: 'Asia/Singapore' }) => {
  const tz = options.tz || 'Asia/Singapore'
  if (!by) return arr
  const result = arr.sort((a, b) => {
    if (by === 'date') {
      const d1D = a[by]
      const d2D = b[by]
      const d1 = moment(d1D).tz(tz).format('YYYYMMDD')
      const d2 = moment(d2D).tz(tz).format('YYYYMMDD')
      if (order === 'desc') {
        return d2 - d1
      } else {
        return d1 - d2
      }
    }
    if (order === 'desc') {
      if (a[by] > b[by]) {
        return -1
      }
      if (a[by] < b[by]) {
        return 1
      }
      if (a[by] || b[by]) {
        if (a[by] === null) {
          return 1
        }
        if (b[by] === null) {
          return -1
        }
      }
      return 0
    }
    if (a[by] < b[by]) {
      return -1
    }
    if (a[by] > b[by]) {
      return 1
    }
    if (a[by] || b[by]) {
      if (a[by] === null) {
        return -1
      }
      if (b[by] === null) {
        return 1
      }
    }
    return 0
  })
  return result
}

const convertToLongDate = dateString => {
  if (!dateString) {
    return undefined
  }

  const d = new Date(dateString)

  const day = d.getDate()
  const month = d.getMonth()
  const monthName = months[month]
  const year = d.getFullYear()

  return `${day} ${monthName} ${year}`
}

const renderProfileValues = projectOptionArr =>
  projectOptionArr.map(item => item.value)

const FORMAT = 'dd/MM/yyyy'

const formatDate = (date, format, locale) => {
  return dateFnsFormat(date, format, { locale })
}

const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale })
  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

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
  sortBy,
  convertToLongDate,
  renderProfileValues,
  FORMAT,
  formatDate,
  parseDate,
}
