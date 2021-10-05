import React, { useRef, useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { Formik } from 'formik'
import DayPicker from 'react-day-picker'
import moment from 'moment'

import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'
import CustomButton from '../CustomButton/CustomButton'
import { createTask } from '../../api/taskAPI'
import {
  createTaskRequest,
  createTaskSuccess,
  createTaskFail,
  setActiveTask,
} from '../../actions/taskAction'
import { useAppContext } from '../../AppContext'

import TableList from '../Table/TableList'
import TableListHeader from '../Table/TableListHeader'
import TableListBody from '../Table/TableListBody'
import TableListItem from '../Table/TableListItem'

import TaskFormItem from './TaskFormItem'
import './Task.scss'
import 'react-day-picker/lib/style.css'

const getWeekDays = weekStart => {
  const days = [weekStart]
  for (let i = 1; i < 7; i += 1) {
    days.push(moment(weekStart).add(i, 'days').toDate())
  }
  return days
}

const getWeekRange = date => {
  return {
    from: moment(date).startOf('isoWeek').isoWeekday(1).toDate(),
    to: moment(date).endOf('isoWeek').toDate(),
  }
}

const TaskForm = ({ activeTab }) => {
  const formRef = useRef()
  const [taskList, setTasks] = useState([])
  const [showAlert, setShowAlert] = useState({})
  const [hoverRange, setHoverRange] = useState(undefined)
  const [selectedDays, setSelectedDays] = useState(
    getWeekDays(getWeekRange(new Date()).from)
  )
  const [openWeekPicker, setOpenWeekPicker] = useState(false)

  const {
    data: {
      task: {
        create: { data, loading },
      },
    },
    dispatch,
  } = useAppContext()

  const taskItem = {
    id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),
    name: '',
    startDate: '',
    endDate: '',
    status: '',
  }

  const handleDayChange = date => {
    setSelectedDays(getWeekDays(getWeekRange(date).from))
  }

  const handleDayEnter = date => {
    setHoverRange(getWeekRange(date))
  }

  const handleDayLeave = () => {
    setHoverRange(undefined)
  }

  const handleWeekClick = (weekNumber, days, e) => {
    setSelectedDays(days)
  }

  const handleAddTask = () => {
    setTasks([...taskList, taskItem])
  }

  const handleDeleteTaskItem = taskId => {
    const remainingTasks = taskList.filter(task => task.id !== taskId)
    const { setFieldValue } = formRef.current

    setFieldValue(`${taskId}-name`, undefined)
    setFieldValue(`${taskId}-startDate`, undefined)
    setFieldValue(`${taskId}-endDate`, undefined)
    setFieldValue(`${taskId}-status`, undefined)
    setTasks(remainingTasks)
  }

  const submitCreateTasks = async payload => {
    dispatch(createTaskRequest())
    try {
      const data = await createTask(payload)
      dispatch(createTaskSuccess(data))
      dispatch(setActiveTask('task-history'))
    } catch (err) {
      setShowAlert({ type: 'error', message: 'error.message' })
      dispatch(createTaskFail(err))
    }
  }

  const daysAreSelected = selectedDays.length > 0
  const modifiers = {
    hoverRange,
    selectedRange: daysAreSelected && {
      from: selectedDays[0],
      to: selectedDays[6],
    },
    hoverRangeStart: hoverRange && hoverRange.from,
    hoverRangeEnd: hoverRange && hoverRange.to,
    selectedRangeStart: daysAreSelected && selectedDays[0],
    selectedRangeEnd: daysAreSelected && selectedDays[6],
  }

  const handleOpenWeekPicker = () => setOpenWeekPicker(!openWeekPicker)

  const handleSubmitTasks = values => {
    const valuesGrouped = Object.keys(values).reduce((prev, key) => {
      const id = key.split('-')[0]
      const name = key.split('-')[1]
      const value = values[key]

      return { ...prev, [id]: [...(prev[id] || []), { [name]: value }] }
    }, {})

    setShowAlert({})

    const list = Object.values(valuesGrouped).map(item => {
      return item.reduce((acc, prop) => {
        acc[Object.keys(prop)[0]] = prop[Object.keys(prop)[0]]
        return acc
      }, {})
    })

    let isEnterAllFields = false

    if (list.length > 0 && taskList.length === list.length) {
      isEnterAllFields = list.every(item => {
        return ['name', 'startDate', 'endDate', 'status'].every(key => {
          return (
            Object.keys(item).indexOf(key) > -1 &&
            Object.values(item).every(value => !!value)
          )
        })
      })
    }

    if (!isEnterAllFields) {
      setShowAlert({
        type: 'warning',
        message: 'Please all fields of your tasks',
      })
    }

    if (isEnterAllFields) {
      submitCreateTasks({
        tasks: list,
        week: {
          startDate: moment(selectedDays[0]).format(),
          endDate: moment(selectedDays[6]).format(),
        },
      })
    }
  }

  useEffect(() => {
    dispatch(setActiveTask(null))
  }, [])

  const initTaskValues = taskList.reduce((acc, task) => {
    acc[`${task.id}-name`] = ''
    acc[`${task.id}-startDate`] = ''
    acc[`${task.id}-endDate`] = ''
    acc[`${task.id}-status`] = ''
    return acc
  }, {})

  return (
    <>
      <Formik
        onSubmit={handleSubmitTasks}
        initialValues={initTaskValues}
        innerRef={formRef}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => {
          const isFieldNotEmpty = Object.values(values).every(value => !!value)
          return (
            <form onSubmit={handleSubmit}>
              <div className="task-wrapper">
                <div className="task-function">
                  <div
                    className="week-selection"
                    onClick={handleOpenWeekPicker}
                  >
                    {`${moment(selectedDays[0]).format('DD/MM/yyyy')}  -
                      ${moment(selectedDays[6]).format('DD/MM/yyyy')}`}
                    <KeyboardArrowDownIcon />
                    {openWeekPicker && (
                      <DayPicker
                        selectedDays={selectedDays}
                        showWeekNumbers
                        showOutsideDays
                        modifiers={modifiers}
                        onDayClick={handleDayChange}
                        onDayMouseEnter={handleDayEnter}
                        onDayMouseLeave={handleDayLeave}
                        onWeekClick={handleWeekClick}
                        firstDayOfWeek={1}
                        disabledDays={[new Date(2021, 8, 26)]}
                      />
                    )}
                  </div>
                  <div className="add-task" onClick={handleAddTask}>
                    <AddIcon />
                  </div>
                </div>
                <TableList className="task-list">
                  <TableListHeader>
                    <TableListItem className="task-name">
                      Task Name
                    </TableListItem>
                    <TableListItem className="task-start">
                      Start Date
                    </TableListItem>
                    <TableListItem className="task-end">End Date</TableListItem>
                    <TableListItem className="task-status">
                      Status
                    </TableListItem>
                    <TableListItem className="task-actions">
                      Action
                    </TableListItem>
                  </TableListHeader>
                  {taskList.length > 0 && (
                    <TableListBody>
                      {taskList.map(task => (
                        <TaskFormItem
                          key={task.id}
                          task={task}
                          handleChange={handleChange}
                          handleDeleteTaskItem={handleDeleteTaskItem}
                          setFieldValue={setFieldValue}
                          values={values}
                          selectedDays={selectedDays}
                        />
                      ))}
                    </TableListBody>
                  )}
                </TableList>
              </div>
              <div className="task-submit">
                {taskList.length > 0 && (
                  <CustomButton
                    type="submit"
                    variant="outlined"
                    textcolor="#fff"
                    background="#00D1B2"
                    style={{ textTransform: 'capitalize', fontSize: 16 }}
                    hover={{
                      color: '#fff',
                      backgroundColor: '#00D1B2',
                      opacity: 0.8,
                    }}
                    className="task-cta__submit"
                    disabled={loading || !isFieldNotEmpty}
                  >
                    Submit
                  </CustomButton>
                )}
              </div>
            </form>
          )
        }}
      </Formik>
      {showAlert.type && (
        <NotificationDialog
          {...showAlert}
          handleCloseDialog={() => {
            setShowAlert({})
          }}
        />
      )}
    </>
  )
}

export default TaskForm
