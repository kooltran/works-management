import React, { useState, useEffect } from 'react'
import { format, startOfMonth, isSameMonth } from 'date-fns'

const DateCell = ({
  chosenDate,
  handleChangeTime,
  onDateClick,
  currentMonth,
  day,
}) => {
  const dateFormatted = format(day, 'dd/MM/yyyy')
  const cloneDay = day
  const monthStart = startOfMonth(currentMonth)

  const selectedDate = chosenDate.find(item => item.date === dateFormatted)
  const formattedDate = format(day, 'd')
  const [checkedStatus, setCheckedStatus] = useState([])

  useEffect(() => {
    if (selectedDate) {
      setCheckedStatus(selectedDate.time)
    } else {
      setCheckedStatus([])
    }
  }, [chosenDate, day, selectedDate])

  return (
    <div
      className={`col cell ${
        !isSameMonth(day, monthStart)
          ? 'disabled'
          : selectedDate
          ? 'selected'
          : ''
      }`}
      onClick={e => onDateClick(e, cloneDay)}
    >
      <span className="number">{formattedDate}</span>
      <div className="time">
        <span onClick={e => handleChangeTime(e, cloneDay)}>
          <input
            type="checkbox"
            name="am"
            checked={checkedStatus.includes('am')}
            readOnly
          />
        </span>
        <span onClick={e => handleChangeTime(e, cloneDay)}>
          <input
            type="checkbox"
            name="pm"
            checked={checkedStatus.includes('pm')}
            readOnly
          />
        </span>
      </div>
    </div>
  )
}

export default DateCell
