import React, { useState, useEffect } from 'react'
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addMonths,
  subMonths,
  getYear,
} from 'date-fns'
import classNames from 'classnames'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { sortByMonth } from '../../helpers'

import { setDatesLeave } from '../../actions/leaveAction'
import { useAppContext } from '../../AppContext'
import DateCell from './DateCell'
import './styles.scss'

const LeaveDatePicker = ({ selectedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [rows, setRows] = useState([])
  const [months, setMonth] = useState([])
  const [showMonths, setShowMonths] = useState(false)
  const [chosenDate, setChosenDate] = useState(selectedDates)
  console.log(chosenDate, 'chosenDate')
  const { _, dispatch } = useAppContext()

  const handleShowMonths = () => {
    setShowMonths(!showMonths)
  }

  const handleChangeMonth = month => {
    setCurrentMonth(month)
    setShowMonths(false)
  }

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy'
    return (
      <div className="cui-calendar__row flex-middle">
        <div className="col col-start left-arrow">
          <div className="icon" onClick={prevMonth}>
            <NavigateBeforeIcon />
          </div>
        </div>
        <div className="col col-center month-title" onClick={handleShowMonths}>
          <span>{format(currentMonth, dateFormat)}</span>
          <div
            className={classNames('cui-calendar__months', { show: showMonths })}
          >
            <div className="months-content">
              {months.map(month => (
                <div
                  key={month}
                  className={classNames('col col-center month-item', {
                    selected:
                      format(month, 'LLL') === format(currentMonth, 'LLL'),
                  })}
                  onClick={() => handleChangeMonth(month)}
                >
                  {format(month, 'LLL')}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col col-end right-arrow" onClick={nextMonth}>
          <div className="icon">
            <NavigateNextIcon />
          </div>
        </div>
      </div>
    )
  }

  const renderDays = () => {
    const dateFormat = 'EE'
    const days = []

    let startDate = startOfWeek(currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center day-name" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="cui-calendar__days row">{days}</div>
  }

  const handleChangeTime = (e, day) => {
    const formattedDay = format(day, 'dd/MM/yyyy')
    e.stopPropagation()
    const { name, checked } = e.target
    const selectedDate = chosenDate.find(item => item.date === formattedDay)

    const initTime = selectedDate ? selectedDate.time : []

    let time = [...initTime]
    if (checked) {
      time.push(name)
    } else {
      time = time.filter(t => t !== name)
    }

    if (time.length === 0) {
      const filteredDates = chosenDate.filter(
        item => item.date !== formattedDay
      )
      setChosenDate(filteredDates)
    } else {
      if (selectedDate) {
        const res = chosenDate.map(item =>
          item.date === selectedDate.date ? { ...item, time: time } : item
        )
        setChosenDate(res)
      } else {
        setChosenDate([...chosenDate, { date: formattedDay, time: time }])
      }
    }
  }

  const renderBody = () => {
    return (
      <div className="cui-calendar__body">
        {rows.map((row, idx) => {
          return (
            <div key={idx} className="row">
              {row?.map(day => (
                <DateCell
                  key={day}
                  chosenDate={chosenDate}
                  handleChangeTime={handleChangeTime}
                  onDateClick={handleDayClick}
                  currentMonth={currentMonth}
                  day={day}
                />
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  const handleDayClick = (e, day) => {
    const dateFormatted = format(day, 'dd/MM/yyyy')
    e.preventDefault()
    if (!chosenDate.find(item => item.date === dateFormatted)) {
      setChosenDate([
        ...chosenDate,
        { date: dateFormatted, time: ['am', 'pm'] },
      ])
    } else {
      const filterChosenDate = chosenDate.filter(
        item => item.date !== dateFormatted
      )
      setChosenDate(filterChosenDate)
    }
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const months = []
    const rows = []

    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(day)

        day = addDays(day, 1)
      }
      rows.push(days)
      days = []
    }

    setRows(rows)

    for (let i = 0; i < 12; i++) {
      months.push(addMonths(new Date(getYear(currentMonth), 0, 1), i))
    }
    sortByMonth(months)
    setMonth(months)
  }, [currentMonth])

  useEffect(() => {
    dispatch(setDatesLeave(chosenDate))
  }, [chosenDate])

  return (
    <div className="cui-calendar">
      {renderHeader()}
      {renderDays()}
      {renderBody()}
    </div>
  )
}

export default LeaveDatePicker
