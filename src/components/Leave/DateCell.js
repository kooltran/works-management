import React, { useState, useEffect } from 'react'
import { format, startOfMonth, isSameMonth } from 'date-fns'
import { useAppContext } from '../../AppContext'
import { WbSunnyOutlined } from '@material-ui/icons'
import lo from 'lodash'

const DateCell = ({
  chosenDate,
  disabledDate,
  handleChangeTime,
  onDateClick,
  currentMonth,
  day,
}) => {
  const {
    data: {
      leave: {
        get: { data: currentLeaveData },
      },
    },
  } = useAppContext()
  const dateFormatted = format(day, 'dd/MM/yyyy')
  const cloneDay = day
  const monthStart = startOfMonth(currentMonth)

  const chosen = chosenDate?.find(item => item.date === dateFormatted)
  let selected = disabledDate?.filter(item => item.date === dateFormatted) || []
  selected =
    selected.length === 2 ? { ...selected[0], time: ['am', 'pm'] } : selected[0]

  let leaveStatus = null
  
  if (selected && selected.date) {
    const leaveCurrent = currentLeaveData.find((leave) => {
      const dates = leave.dates.flat()
      return dates.some((date) => date.date === selected.date && lo.isEqual(date.time.sort(), selected.time.sort()))
    })
    leaveStatus = leaveCurrent.status
  }

  const sunColor = leaveStatus === 'pending'
                    ? '#fffb00'
                    : '#01d830'

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
          : checkedSelectedStatus.length > 0
          ? 'selected'
          : ''
      }`}
      onClick={e => onDateClick(e, cloneDay)}
    >
      <span className="number">{formattedDate}</span>
      <div className="time">
        <span onClick={e => handleChangeTime(e, cloneDay)}>
          {checkedSelectedStatus.includes('am') && leaveStatus
            ? (<WbSunnyOutlined style={{ fill: sunColor, fontSize: '17px'}} />)
            : (<input
              type="checkbox"
              name="am"
              checked={
                checkedChosenStatus.includes('am') ||
                checkedSelectedStatus.includes('am')
              }
              readOnly
              disabled={checkedSelectedStatus.includes('am')}
            />)
          }
        </span>
        <span onClick={e => handleChangeTime(e, cloneDay)}>
          {checkedSelectedStatus.includes('pm') && leaveStatus
            ? (<WbSunnyOutlined style={{ fill: sunColor, fontSize: '17px'}} />)
            : (<input
                type="checkbox"
                name="pm"
                checked={
                  checkedChosenStatus.includes('pm') ||
                  checkedSelectedStatus.includes('pm')
                }
                readOnly
                disabled={checkedSelectedStatus.includes('pm')}
              />)
          }
        </span>
      </div>
    </div>
  )
}

export default DateCell
