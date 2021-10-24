import React, { useState, useEffect } from 'react'
import { format, startOfMonth, isSameMonth } from 'date-fns'
import { WbSunny } from '@material-ui/icons'

const DateCell = ({
  chosenDate,
  disabledDate,
  handleChangeTime,
  onDateClick,
  currentMonth,
  holiday,
  day,
}) => {
  const dateFormatted = format(day, 'dd/MM/yyyy')
  const cloneDay = day
  const monthStart = startOfMonth(currentMonth)
  const currentDate = new Date()
  const isBefore = day.getTime() < currentDate.getTime()
  const isHoliday =
    holiday.includes(dateFormatted) || [0, 6].includes(day.getDay())

  const chosen = chosenDate?.find(item => item.date === dateFormatted)

  const sunColor = status => (status === 'pending' ? '#ff7800' : '#01d830')

  const formattedDate = format(day, 'd')
  const [checkedChosenStatus, setCheckedChosenStatus] = useState([])
  const checkedSelectedStatus = disabledDate ? disabledDate.time : []

  const amTime = checkedSelectedStatus.find(t => t.label === 'am')
  const pmTime = checkedSelectedStatus.find(t => t.label === 'pm')

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
        isHoliday
          ? 'holiday'
          : !isSameMonth(day, monthStart) || isBefore
          ? 'disabled'
          : chosen
          ? 'chosen'
          : ''
      }`}
      onClick={e => onDateClick(e, cloneDay)}
    >
      <span className="number">{formattedDate}</span>
      <div className="time">
        <span onClick={e => handleChangeTime(e, cloneDay)}>
          {amTime ? (
            <WbSunny
              style={{
                fill: sunColor(amTime.status),
                fontSize: '17px',
              }}
            />
          ) : (
            <input
              type="checkbox"
              name="am"
              checked={checkedChosenStatus.includes('am')}
              readOnly
              disabled={checkedSelectedStatus.includes('am')}
            />
          )}
        </span>
        <span onClick={e => handleChangeTime(e, cloneDay)}>
          {pmTime ? (
            <WbSunny
              style={{
                fill: sunColor(pmTime.status),
                fontSize: '17px',
              }}
            />
          ) : (
            <input
              type="checkbox"
              name="pm"
              checked={checkedChosenStatus.includes('pm')}
              readOnly
              disabled={checkedSelectedStatus.includes('pm')}
            />
          )}
        </span>
      </div>
    </div>
  )
}

export default DateCell
