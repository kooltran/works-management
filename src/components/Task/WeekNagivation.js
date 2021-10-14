import React, { useState } from 'react'
import classnames from 'classnames'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined'
import Select from 'react-select'

import { getStartDateWeek, getWeekRange } from '../../helpers'

const customStyles = {
  control: provided => ({
    ...provided,
    height: '100%',
    width: '100%',
    border: 0,
    minHeight: 0,
    outline: 'none',
    boxShadow: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',
  }),
  container: provided => ({
    ...provided,
    width: '100%',
    height: '100%',
  }),
  valueContainer: provided => ({
    ...provided,
    justifyContent: 'center',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: 'rgba(0, 0, 0, 0.87)',
  }),
  menu: provided => ({
    ...provided,
    margin: 0,
    borderRadius: 0,
  }),
  menuList: provided => ({
    ...provided,
    borderRadius: 0,
  }),
}

const WeekNavigation = ({ tasks, updateTasks }) => {
  const lastTaskItem = tasks.find((item, index) => index === tasks.length - 1)
  const firstTaskItem = tasks.find((item, index) => index === 0)

  const [isDisabledPrev, setDisabledPrev] = useState(firstTaskItem.isActiveWeek)
  const [isDisabledNext, setDisabledNext] = useState(lastTaskItem.isActiveWeek)
  const [selectedWeek, setSelectedWeek] = useState({
    value: getStartDateWeek(tasks[tasks.length - 1].week),
    label: getWeekRange(tasks[tasks.length - 1].week),
  })

  const weekOptions =
    tasks?.map(item => ({
      value: item.week,
      label: getWeekRange(item.week),
    })) || []

  const handlePrev = () => {
    let prevItem
    let prevIndex

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isActiveWeek) {
        prevItem = tasks[i - 1]
        prevIndex = i - 1
      }
    }

    if (prevIndex >= 0) {
      const res = tasks.map(item =>
        item.week === prevItem.week
          ? { ...item, isActiveWeek: true }
          : { ...item, isActiveWeek: false }
      )
      setSelectedWeek({
        value: prevItem.week,
        label: getWeekRange(prevItem.week),
      })
      setDisabledNext(false)
      updateTasks(res)
    }

    if (prevIndex === 0) {
      setDisabledPrev(true)
    }
  }

  const handleNext = () => {
    let nextItem
    let nextIndex
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isActiveWeek) {
        nextItem = tasks[i + 1]
        nextIndex = i + 1
      }
    }

    if (nextIndex < tasks.length) {
      const res = tasks.map(item =>
        item.week === nextItem.week
          ? { ...item, isActiveWeek: true }
          : { ...item, isActiveWeek: false }
      )
      setSelectedWeek({
        value: nextItem.week,
        label: getWeekRange(nextItem.week),
      })
      setDisabledPrev(false)
      updateTasks(res)
    }
    if (nextIndex === tasks.length - 1) {
      setDisabledNext(true)
    }
  }

  const handleChangeWeek = option => {
    setSelectedWeek(option)
    const res = tasks?.map(item =>
      item.week === option.value
        ? { ...item, isActiveWeek: true }
        : { ...item, isActiveWeek: false }
    )

    if (option.value === tasks[0].week) {
      setDisabledPrev(true)
      setDisabledNext(false)
    } else if (option.value === tasks[tasks.length - 1].week) {
      setDisabledNext(true)
      setDisabledPrev(false)
    } else {
      setDisabledPrev(false)
      setDisabledNext(false)
    }
    updateTasks(res)
  }
  return (
    <>
      <div
        className={classnames('week-prev', {
          'is-disabled': isDisabledPrev,
        })}
        onClick={handlePrev}
      >
        <ArrowBackIosOutlinedIcon />
        <span>Prev Week</span>
      </div>
      <div className="week-status">
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="week-status"
          options={weekOptions}
          value={selectedWeek}
          styles={customStyles}
          onChange={handleChangeWeek}
          isSearchable={false}
        />
      </div>
      <div
        className={classnames('week-next', {
          'is-disabled': isDisabledNext,
        })}
        onClick={handleNext}
      >
        <span>Next Week</span>
        <ArrowForwardIosOutlinedIcon />
      </div>
    </>
  )
}

export default WeekNavigation
