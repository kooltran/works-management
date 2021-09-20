import React, { useState } from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import TextareaAutosize from 'react-textarea-autosize'
import Select from 'react-select'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { format } from 'date-fns'

import 'react-day-picker/lib/style.css'

const TaskFormItem = ({
  task,
  handleDeleteTaskItem,
  handleChange,
  setFieldValue,
  values,
}) => {
  const FORMAT = 'dd/MM/yyyy'

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
    }),
    container: provided => ({
      ...provided,
      width: '100%',
      height: '100%',
    }),
    indicatorSeparator: provided => ({
      ...provided,
      display: 'none',
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

  const taskStatusOption = [
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'done',
      label: 'Done',
    },
  ]

  const handleDayChange = (selectedDate, modifiers, dayPickerInput) => {
    const { name } = dayPickerInput.props

    setFieldValue(name, format(selectedDate, 'dd/MM/yyyy'))
  }

  const handleChangeStatus = name => option => {
    if (option) {
      setFieldValue(name, option.value)
    }
  }

  const parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale })
    if (DateUtils.isDate(parsed)) {
      return parsed
    }
    return undefined
  }

  const formatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale })
  }

  return (
    <div className="task-list__body--row">
      <div className="task-list__body--item task-name">
        <TextareaAutosize
          autoFocus
          rows={1}
          onChange={handleChange}
          name={`${task.id}-name`}
        />
      </div>
      <div className="task-list__body--item task-start">
        <DayPickerInput
          value={values[`${task.id}-startDate`]}
          onDayChange={handleDayChange}
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          name={`${task.id}-startDate`}
          placeholder="DD/MM/YYYY"
          dayPickerProps={{
            disabledDays: {
              daysOfWeek: [0, 6],
            },
          }}
        />
      </div>
      <div className="task-list__body--item task-end">
        <DayPickerInput
          value={values[`${task.id}-endDate`]}
          onDayChange={handleDayChange}
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          name={`${task.id}-endDate`}
          placeholder="DD/MM/YYYY"
          dayPickerProps={{
            disabledDays: {
              daysOfWeek: [0, 6],
            },
          }}
        />
      </div>
      <div className="task-list__body--item task-status">
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Status"
          name={`${task.id}-status`}
          options={taskStatusOption}
          styles={customStyles}
          onChange={handleChangeStatus(`${task.id}-status`)}
        />
      </div>
      <div className="task-list__body--item task-actions">
        <span
          className="remove-icon"
          onClick={() => handleDeleteTaskItem(task.id)}
        >
          <DeleteOutlineOutlinedIcon />
        </span>
        <span className="edit-icon">
          <EditOutlinedIcon />
        </span>
      </div>
    </div>
  )
}

export default TaskFormItem
