import React, { useState, useEffect } from 'react'
import { format, startOfMonth, isSameMonth } from 'date-fns'

const DateCell = ({
  chosenDate,
  disabledDate,
  handleChangeTime,
  onDateClick,
  currentMonth,
  day,
}) => {
  const dateFormatted = format(day, 'dd/MM/yyyy')
  const cloneDay = day
  const monthStart = startOfMonth(currentMonth)

  const chosen = chosenDate.find(item => item.date === dateFormatted)
  let selected = disabledDate.filter(item => item.date === dateFormatted)
  selected = selected.length === 2 ? {...selected[0], time: ["am", "pm"]} : selected[0]

  const formattedDate = format(day, 'd')
  const [checkedChosenStatus, setCheckedChosenStatus] = useState([])
  const checkedSelectedStatus = selected ? selected.time : []

  useEffect(() => {
    if (chosen) {
      setCheckedChosenStatus(chosen.time)
    } else {
      setCheckedChosenStatus([])
    }
  }, [chosenDate, day, chosen])

  return (
    <div
      className={`col cell ${
        !isSameMonth(day, monthStart)
          ? 'disabled'
          : chosen
          ? 'chosen'
          : checkedSelectedStatus.length === 1
          ? 'selected-half'
          : checkedSelectedStatus.length === 2
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
            checked={checkedChosenStatus.includes('am') || checkedSelectedStatus.includes('am')}
            readOnly
            disabled={checkedSelectedStatus.includes('am')}
          />
        </span>
        <span onClick={e => handleChangeTime(e, cloneDay)}>
          <input
            type="checkbox"
            name="pm"
            checked={checkedChosenStatus.includes('pm') || checkedSelectedStatus.includes('pm')}
            readOnly
            disabled={checkedSelectedStatus.includes('pm')}
          />
        </span>
      </div>
    </div>
  )
}

export default DateCell
