import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { DateUtils } from 'react-day-picker'
import Select from 'react-select'
import { format } from 'date-fns'
import classnames from 'classnames'

import UpdatingIcon from '../../images/updating.svg'
import {
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFail,
  getAllTaskByUserSuccess,
} from '../../actions/taskAction'
import TableListItem from '../Table/TableListItem'

import { ERROR_MESSAGE } from '../../constants'
import { updateTask, deleteTask } from '../../api/taskAPI'
import { useAppContext } from '../../AppContext'
import { dateBetweenRange } from '../../helpers'

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

const FORMAT = 'dd/MM/yyyy'

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

const TaskHistoryItem = ({
  task,
  createdAt,
  isShowTaskActions = true,
  itemId,
}) => {
  const {
    data: {
      task: {
        get: { updating, deleting, data: allTaskByUser },
      },
    },
    dispatch,
  } = useAppContext()

  const currentWeekTasks =
    allTaskByUser?.find(item => item.isActiveWeek) || null

  const [selectedDate, setSelectedDate] = useState({
    startDate: task.startDate,
    endDate: task.endDate,
  })
  const [editStatus, setStatus] = useState(task.status)
  const [taskName, setTaskName] = useState(task.name)

  const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const { name } = dayPickerInput.props

    setSelectedDate({
      ...selectedDate,
      [name]: format(selectedDay, 'dd/MM/yyyy'),
    })
  }

  const handleChangeStatus = option => {
    setStatus(option.value)
  }

  const handleEditTaskItem = () => {
    const newTasks = currentWeekTasks.tasks.map(taskItem =>
      taskItem._id === task._id
        ? { ...taskItem, isEditing: true, isShowEdit: false }
        : { ...taskItem, isEditing: false, isShowEdit: true }
    )

    const editedTasksByUser = allTaskByUser.map(item =>
      item.isActiveWeek ? { ...item, tasks: newTasks } : item
    )
    dispatch(getAllTaskByUserSuccess(editedTasksByUser))
  }

  const handleDeleteTaskItem = async () => {
    const deletedTaskByUser = allTaskByUser.map(item => {
      if (item.isActiveWeek) {
        return {
          ...item,
          tasks: currentWeekTasks.tasks.map(taskItem =>
            taskItem._id === task._id
              ? { ...taskItem, isDeleting: true }
              : taskItem
          ),
        }
      } else {
        return item
      }
    })
    dispatch(getAllTaskByUserSuccess(deletedTaskByUser))
    dispatch(deleteTaskRequest())
    try {
      const data = await deleteTask(task._id)

      const updatedTasks = allTaskByUser.map(item =>
        item._id === data._id ? { ...item, tasks: data.tasks } : item
      )
      dispatch(deleteTaskSuccess(data))
      dispatch(getAllTaskByUserSuccess(updatedTasks))
    } catch (err) {
      dispatch(deleteTaskFail(ERROR_MESSAGE))
    }
  }

  const submitUpdateTask = async payload => {
    dispatch(updateTaskRequest())
    try {
      const data = await updateTask(payload)

      const updatedTasks = allTaskByUser.map(item =>
        item._id === data._id ? { ...item, tasks: data.tasks } : item
      )

      dispatch(updateTaskSuccess(data))
      dispatch(getAllTaskByUserSuccess(updatedTasks))
    } catch (err) {
      dispatch(updateTaskFail(ERROR_MESSAGE))
    }
  }

  const handleSubmitEditTaskItem = () => {
    const taskUpdatePayload = {
      taskId: task._id,
      taskName: taskName,
      startDate: selectedDate.startDate,
      endDate: selectedDate.endDate,
      status: editStatus,
    }

    const taskUpdateValues = Object.values(taskUpdatePayload)
    const taskHistoryValues = Object.values(task).filter(
      value => typeof value === 'string'
    )

    if (
      taskUpdateValues.every(task => !!task) &&
      !taskHistoryValues.every(elem => taskUpdateValues.indexOf(elem) > -1)
    ) {
      submitUpdateTask(taskUpdatePayload)
    } else {
      const updatedTasks = allTaskByUser.map(item =>
        item._id === itemId
          ? {
              ...item,
              tasks: item.tasks.map(taskItem => ({
                ...taskItem,
                isEditing: false,
                isShowEdit: true,
              })),
            }
          : item
      )

      dispatch(getAllTaskByUserSuccess(updatedTasks))
    }
  }

  const handleChangeTaskName = ({ target: { value } }) => {
    setTaskName(value)
  }

  return (
    <div className="table-list__body--row">
      <TableListItem
        className={classnames('task-name', {
          'is-editing': task.isEditing,
        })}
      >
        {task.isEditing ? (
          <TextareaAutosize
            autoFocus
            rows={1}
            name="taskName"
            value={taskName}
            onChange={handleChangeTaskName}
          />
        ) : (
          task.name
        )}
      </TableListItem>
      <TableListItem
        className={classnames('task-start', {
          'is-editing': task.isEditing,
        })}
      >
        {task.isEditing ? (
          <DayPickerInput
            value={selectedDate.startDate}
            onDayChange={handleDayChange}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            name="startDate"
            dayPickerProps={{
              disabledDays: {
                daysOfWeek: [0, 6],
              },
            }}
          />
        ) : (
          task.startDate
        )}
      </TableListItem>
      <TableListItem
        className={classnames('task-end', {
          'is-editing': task.isEditing,
        })}
      >
        {task.isEditing ? (
          <DayPickerInput
            value={selectedDate.endDate}
            onDayChange={handleDayChange}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            name="endDate"
            dayPickerProps={{
              disabledDays: {
                daysOfWeek: [0, 6],
              },
            }}
          />
        ) : (
          task.endDate
        )}
      </TableListItem>
      <TableListItem
        className={classnames('task-status', {
          'is-editing': task.isEditing,
        })}
      >
        {task.isEditing ? (
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Status"
            name="status"
            options={taskStatusOption}
            styles={customStyles}
            onChange={handleChangeStatus}
            value={taskStatusOption.filter(
              option => option.value === editStatus
            )}
          />
        ) : (
          task.status
        )}
      </TableListItem>
      {isShowTaskActions && (
        <TableListItem className="task-actions">
          {dateBetweenRange(createdAt) && (
            <span className="remove-icon" onClick={handleDeleteTaskItem}>
              {task.isDeleting && deleting ? (
                <img src={UpdatingIcon} alt="updating icon" />
              ) : (
                <DeleteOutlineOutlinedIcon />
              )}
            </span>
          )}
          {task.isEditing &&
            (updating ? (
              <img src={UpdatingIcon} alt="updating icon" />
            ) : (
              <span className="edit-icon" onClick={handleSubmitEditTaskItem}>
                <CheckOutlinedIcon />
              </span>
            ))}
          {(task.isShowEdit === undefined || task.isShowEdit) && (
            <span
              className="edit-icon"
              onClick={() => handleEditTaskItem(task._id)}
            >
              <EditOutlinedIcon />
            </span>
          )}
        </TableListItem>
      )}
    </div>
  )
}

export default TaskHistoryItem
