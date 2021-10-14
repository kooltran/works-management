import React, { useEffect } from 'react'

import TaskHistoryItem from './TaskHistoryItem'
import { getTasks } from '../../api/taskAPI'
import {
  getAllTaskByUserRequest,
  getAllTaskByUserFail,
  getAllTaskByUserSuccess,
} from '../../actions/taskAction'

import WeekNavigation from './WeekNagivation'

import TableList from '../Table/TableList'
import TableListHeader from '../Table/TableListHeader'
import TableListBody from '../Table/TableListBody'
import TableListItem from '../Table/TableListItem'

import { dateBetweenRange } from '../../helpers'

import { useAppContext } from '../../AppContext'

const TaskHistory = ({ activeTab }) => {
  const {
    data: {
      task: {
        get: { loading, data: allTaskByUser },
        activeTab: activeTabContext,
      },
    },
    dispatch,
  } = useAppContext()

  const currentWeekTasks =
    allTaskByUser?.find(item => item.isActiveWeek) || null

  const getAllTasksByUser = async () => {
    dispatch(getAllTaskByUserRequest())
    try {
      const data = await getTasks()

      const allCurrentUserTasks = data
        .sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt)
        })
        .map((item, index) =>
          index === data.length - 1
            ? {
                _id: item._id,
                tasks: item.tasks,
                user: item.user,
                week: item.createdAt,
                isActiveWeek: true,
              }
            : {
                _id: item._id,
                tasks: item.tasks,
                user: item.user,
                week: item.createdAt,
                isActiveWeek: false,
              }
        )

      dispatch(getAllTaskByUserSuccess(allCurrentUserTasks))
    } catch (err) {
      dispatch(getAllTaskByUserFail(err))
    }
  }

  const handleUpdateTasks = tasks => dispatch(getAllTaskByUserSuccess(tasks))

  useEffect(() => {
    if (currentWeekTasks === null || activeTabContext === 'task-history') {
      getAllTasksByUser()
    }
  }, [activeTabContext])

  return (
    <div className="task-wrapper">
      {loading ? (
        'loading...'
      ) : allTaskByUser?.length > 0 ? (
        <div className="task-history task-list">
          <div className="task-history__header">
            <WeekNavigation
              tasks={allTaskByUser}
              updateTasks={handleUpdateTasks}
            />
          </div>
          <TableList col="5">
            <TableListHeader>
              <TableListItem className="task-name">Task Name</TableListItem>
              <TableListItem className="task-start">Start Date</TableListItem>
              <TableListItem className="task-end">End Date</TableListItem>
              <TableListItem className="task-status">Status</TableListItem>
              <TableListItem className="task-actions">Actions</TableListItem>
            </TableListHeader>
            {currentWeekTasks && currentWeekTasks.tasks.length > 0 && (
              <TableListBody>
                {currentWeekTasks.tasks.map(task => {
                  return (
                    <TaskHistoryItem
                      key={task._id}
                      task={task}
                      createdAt={currentWeekTasks.week}
                      itemId={currentWeekTasks._id}
                    />
                  )
                })}
              </TableListBody>
            )}
          </TableList>
        </div>
      ) : (
        'Your tasks list is empty'
      )}
    </div>
  )
}

export default TaskHistory
