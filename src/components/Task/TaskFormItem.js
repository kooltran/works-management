import React from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import TextareaAutosize from 'react-textarea-autosize'
import Select from 'react-select'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { format } from 'date-fns'

import TableListItem from '../Table/TableListItem'
import { FORMAT, formatDate, parseDate } from '../../helpers'

import 'react-day-picker/lib/style.css'

const TaskFormItem = ({
  task,
  handleDeleteTaskItem,
  handleChange,
  setFieldValue,
  values,
  selectedDays,
}) => {
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

  return (
    <div className="table-list__body--row">
      <TableListItem className="task-name">
        <TextareaAutosize
          autoFocus
          rows={1}
          onChange={handleChange}
          name={`${task.id}-name`}
        />
      </TableListItem>
      <TableListItem className="task-start">
        <DayPickerInput
          value={values[`${task.id}-startDate`]}
          onDayChange={handleDayChange}
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          name={`${task.id}-startDate`}
          placeholder="DD/MM/YYYY"
          showOutsideDays
          dayPickerProps={{
            showOutsideDays: true,
            firstDayOfWeek: 1,
            enableOutsideDaysClick: true,
            disabledDays: {
              daysOfWeek: [0, 6],
              before: selectedDays[0],
              after: selectedDays[6],
            },
          }}
        />
      </TableListItem>
      <TableListItem className="task-end">
        <DayPickerInput
          value={values[`${task.id}-endDate`]}
          onDayChange={handleDayChange}
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          name={`${task.id}-endDate`}
          placeholder="DD/MM/YYYY"
          dayPickerProps={{
            showOutsideDays: true,
            enableOutsideDaysClick: true,
            firstDayOfWeek: 1,
            disabledDays: {
              daysOfWeek: [0, 6],
              before: selectedDays[0],
              after: selectedDays[6],
            },
          }}
        />
      </TableListItem>
      <TableListItem className="task-status">
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Status"
          name={`${task.id}-status`}
          options={taskStatusOption}
          styles={customStyles}
          onChange={handleChangeStatus(`${task.id}-status`)}
        />
      </TableListItem>
      <TableListItem className="task-actions">
        <span
          className="remove-icon"
          onClick={() => handleDeleteTaskItem(task.id)}
        >
          <DeleteOutlineOutlinedIcon />
        </span>
      </TableListItem>
    </div>
  )
}

export default TaskFormItem
