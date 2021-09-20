import React, { useRef, useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { Formik } from 'formik'
import Button from '@material-ui/core/Button'

import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'

import { createTask } from '../../api/taskAPI'
import {
  createTaskRequest,
  createTaskSuccess,
  createTaskFail,
  setActiveTask,
} from '../../actions/taskAction'
import { useAppContext } from '../../AppContext'

import TaskFormItem from './TaskFormItem'
import './Task.scss'

const TaskForm = ({ activeTab }) => {
  const formRef = useRef()
  const [taskList, setTasks] = useState([])
  const [showAlert, setShowAlert] = useState({})
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
      submitCreateTasks({ tasks: list })
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
        {({
          handleSubmit,
          handleChange,
          touched,
          errors,
          handleBlur,
          setFieldValue,
          values,
        }) => {
          const isFieldNotEmpty = Object.values(values).every(value => !!value)
          return (
            <form onSubmit={handleSubmit}>
              <div className="task-wrapper">
                <div className="task-list">
                  <div className="task-list__header">
                    <div className="task-list__header--item task-name">
                      Task Name
                    </div>
                    <div className="task-list__header--item task-start">
                      Start Date
                    </div>
                    <div className="task-list__header--item task-end">
                      End Date
                    </div>
                    <div className="task-list__header--item task-status">
                      Status
                    </div>
                    <div className="task-list__header--item task-actions"></div>
                  </div>
                  {taskList.length > 0 && (
                    <div className="task-list__body">
                      {taskList.map(task => (
                        <TaskFormItem
                          key={task.id}
                          task={task}
                          handleChange={handleChange}
                          handleDeleteTaskItem={handleDeleteTaskItem}
                          setFieldValue={setFieldValue}
                          values={values}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="task-cta">
                {taskList.length > 0 && (
                  <Button
                    type="submit"
                    variant="outlined"
                    className="task-cta__submit"
                    disabled={loading || !isFieldNotEmpty}
                  >
                    Submit
                  </Button>
                )}
                <Button
                  className="task-cta__add"
                  onClick={handleAddTask}
                  variant="outlined"
                >
                  <AddIcon />
                  Add task
                </Button>
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
