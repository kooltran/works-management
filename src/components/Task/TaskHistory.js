import React, { useEffect, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'

import TaskHistoryItem from './TaskHistoryItem'
import { getTasks, updateTask } from '../../api/taskAPI'
import {
  getAllTaskByUserRequest,
  getAllTaskByUserFail,
  getAllTaskByUserSuccess,
  updateTaskSuccess,
  updateTaskRequest,
  updateTaskFail,
} from '../../actions/taskAction'
import TableList from '../TableList/TableList'
import TableListHeader from '../TableList/TableListHeader'
import TableListBody from '../TableList/TableListBody'

import UpdatingIcon from '../../images/updating.svg'

import WeekNavigation from './WeekNagivation'

import { dateBetweenRange } from '../../helpers'

import { useAppContext } from '../../AppContext'

const TaskHistory = ({ activeTab }) => {
  const {
    data: {
      task: {
        get: { updating, loading, data: allTaskByUser },
        activeTab: activeTabContext,
      },
    },
    dispatch,
  } = useAppContext()

  const currentWeekTasks =
    allTaskByUser?.find(item => item.isActiveWeek) || null

  const tableBodyDataInit = currentWeekTasks?.tasks || []

  const [tableBodyData, setTableBodyData] = useState([])

  const tableHeaderData = [
    'task name',
    'start date',
    'end date',
    'status',
    'actions',
  ]

  const getAllTasksByUser = async () => {
    dispatch(getAllTaskByUserRequest())
    try {
      const data = await getTasks()

      const mappingTasks = data =>
        data.map(task => ({
          id: { value: task._id, type: 'key' },
          name: { value: task.name, type: 'label' },
          startDate: { value: task.startDate, type: 'label' },
          endDate: { value: task.endDate, type: 'label' },
          status: { value: task.status, type: 'label' },
          action: {
            value: '',
            type: 'action',
          },
          isShowEdit: { value: task.isShowEdit, type: 'key' },
          isEditing: { value: task.isEditing, type: 'key' },
        }))

      const allCurrentUserTasks = data
        .map(item =>
          data.length === 1
            ? { ...item, isActiveWeek: true }
            : dateBetweenRange(item.createdAt, new Date())
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
        .sort((a, b) => {
          return new Date(a.week) - new Date(b.week)
        })

      dispatch(getAllTaskByUserSuccess(allCurrentUserTasks))
    } catch (err) {
      dispatch(getAllTaskByUserFail(err))
    }
  }

  const handleEditTaskItem = taskId => {
    // const newTasks = currentWeekTasks.tasks.map(task =>
    //   task.id.value === taskId
    //     ? {
    //         ...task,
    //         isShowEdit: { value: false, type: 'key' },
    //         isEditing: { value: true, type: 'key' },
    //         name: { value: task.name, type: 'textarea' },
    //         startDate: { value: task.startDate, type: 'date' },
    //         endDate: { value: task.endDate, type: 'date' },
    //         status: { value: task.status, type: 'select' },
    //       }
    //     : {
    //         ...task,
    //         isShowEdit: { value: true, type: 'key' },
    //         isEditing: { value: false, type: 'key' },
    //       }
    // )

    const newTasks = currentWeekTasks.tasks.map(task =>
      task._id === taskId
        ? { ...task, isEditing: true, isShowEdit: false }
        : { ...task, isEditing: false, isShowEdit: true }
    )

    const editedTasksByUser = allTaskByUser.map(item =>
      item.isActiveWeek ? { ...item, tasks: newTasks } : item
    )
    dispatch(getAllTaskByUserSuccess(editedTasksByUser))
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
        <div className="task-history">
          <div className="task-history__header">
            <WeekNavigation
              tasks={allTaskByUser}
              updateTasks={handleUpdateTasks}
            />
          </div>
          {/* {currentWeekTasks && (
            <TableList>
              <TableListHeader data={tableHeaderData} />
              <TableListBody
                data={tableBodyDataInit}
                handleEditTaskItem={handleEditTaskItem}
              />
            </TableList>
          )} */}
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
            {currentWeekTasks && currentWeekTasks.tasks.length > 0 && (
              <div className="task-list__body">
                {currentWeekTasks.tasks.map(task => {
                  return (
                    <TaskHistoryItem
                      key={task._id}
                      task={task}
                      createdAt={currentWeekTasks.week}
                      handleEditTaskItem={handleEditTaskItem}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        'Your tasks list is empty'
      )}
    </div>
  )
}

export default TaskHistory
