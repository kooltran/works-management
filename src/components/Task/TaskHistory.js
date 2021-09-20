import React, { useEffect } from 'react'
import moment from 'moment'
import { Button } from '@material-ui/core'

import TaskHistoryItem from './TaskHistoryItem'
import { getTasks } from '../../api/taskAPI'
import {
  getTaskRequest,
  getTaskSuccess,
  getTaskFail,
  getAllTaskByUser,
} from '../../actions/taskAction'

import {
  dateBetweenRange,
  getEndDateWeek,
  getStartDateWeek,
} from '../../helpers'

import { useAppContext } from '../../AppContext'

const TaskHistory = ({ activeTab }) => {
  const {
    data: {
      task: {
        get: { data: currentTaskContext, loading, all: allTaskByUser },
        activeTab: activeTabContext,
      },
    },
    dispatch,
  } = useAppContext()

  const currentWeekDate = allTaskByUser?.find(item => item.isActiveWeek)
    .createdAt

  const prevWeekDate = moment(currentWeekDate).subtract(1, 'weeks')
  const nextWeekDate = moment(currentWeekDate).add(1, 'weeks')

  const isEnablePrev = allTaskByUser?.find(item =>
    dateBetweenRange(item.createdAt, prevWeekDate)
  )

  const isEnableNext = allTaskByUser?.find(item =>
    dateBetweenRange(item.createdAt, nextWeekDate)
  )

  const getCurrentTasksByUser = async () => {
    dispatch(getTaskRequest())
    try {
      const data = await getTasks()
      const currentWeekTasks = data.find(item =>
        dateBetweenRange(item.createdAt, new Date())
      )

      const allCurrentUserTasks = data.map(item =>
        dateBetweenRange(item.createdAt, new Date())
          ? { ...item, isActiveWeek: true }
          : { ...item, isActiveWeek: false }
      )

      dispatch(getTaskSuccess(currentWeekTasks))
      dispatch(getAllTaskByUser(allCurrentUserTasks))
    } catch (err) {
      dispatch(getTaskFail(err))
    }
  }

  const handleEditTaskItem = taskId => {
    const newTasks = currentTaskContext.tasks.map(task =>
      task._id === taskId
        ? { ...task, isEditing: true, isShowEdit: false }
        : { ...task, isEditing: false, isShowEdit: true }
    )
    dispatch(getTaskSuccess({ ...currentTaskContext, tasks: newTasks }))
  }

  const handleNavigateWeeks = date => {
    const currentWeekTasks = allTaskByUser.find(item =>
      dateBetweenRange(item.createdAt, date)
    )

    const allCurrentUserTasks = allTaskByUser.map(item =>
      dateBetweenRange(item.createdAt, date)
        ? { ...item, isActiveWeek: true }
        : { ...item, isActiveWeek: false }
    )

    dispatch(getTaskSuccess(currentWeekTasks))
    dispatch(getAllTaskByUser(allCurrentUserTasks))
  }

  useEffect(() => {
    if (currentTaskContext === null || activeTabContext === 'task-history') {
      getCurrentTasksByUser()
    }
  }, [activeTabContext])
  console.log(currentTaskContext, 'currentTaskContext')
  return (
    <div className="task-wrapper">
      {loading ? (
        'loading...'
      ) : (
        <div className="task-history">
          <h3>
            {`${getStartDateWeek(currentTaskContext?.createdAt).format(
              'DD/MM/yyyy'
            )} - ${getEndDateWeek(currentTaskContext?.createdAt).format(
              'DD/MM/yyyy'
            )}`}
          </h3>
          <div className="task-list">
            <div className="task-list__header">
              <div className="task-list__header--item task-name">Task Name</div>
              <div className="task-list__header--item task-start">
                Start Date
              </div>
              <div className="task-list__header--item task-end">End Date</div>
              <div className="task-list__header--item task-status">Status</div>
              <div className="task-list__header--item task-actions">
                Actions
              </div>
            </div>
            {currentTaskContext && currentTaskContext.tasks.length > 0 && (
              <div className="task-list__body">
                {currentTaskContext.tasks.map(task => {
                  return (
                    <TaskHistoryItem
                      key={task._id}
                      task={task}
                      createdAt={currentTaskContext.createdAt}
                      handleEditTaskItem={handleEditTaskItem}
                    />
                  )
                })}
              </div>
            )}
          </div>
          <div className="task-history__pagination">
            <Button
              variant="outlined"
              onClick={() => handleNavigateWeeks(prevWeekDate)}
              disabled={!isEnablePrev}
            >
              Prev Week
            </Button>
            <Button
              variant="outlined"
              disabled={!isEnableNext}
              onClick={() => handleNavigateWeeks(nextWeekDate)}
            >
              Next Week
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskHistory
