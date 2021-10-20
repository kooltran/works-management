import React, { useEffect } from 'react'
import { getAllTasks } from '../../api/taskAPI'
import {
  getAllTaskRequest,
  getAllTaskSuccess,
  getAllTaskFail,
} from '../../actions/taskAction'
import { useAppContext } from '../../AppContext'
import { dateBetweenRange, getStartDateWeek } from '../../helpers'
import WeekNavigation from './WeekNagivation'

import TableList from '../Table/TableList'
import TableListHeader from '../Table/TableListHeader'
import TableListBody from '../Table/TableListBody'
import TableListItem from '../Table/TableListItem'

import PageLoading from '../../images/page_loading.svg'

const AllTaskHistory = () => {
  const {
    data: {
      task: {
        all: { loading, data: allTasks },
      },
    },
    dispatch,
  } = useAppContext()
  const activeWeekTasks = allTasks?.find(item => item.isActiveWeek)

  const getAllTask = async () => {
    dispatch(getAllTaskRequest())
    try {
      const data = await getAllTasks()

      const allTasksFormatByWeek = data.map(item => ({
        user: item.user,
        tasks: item.tasks,
        id: item._id,
        week: getStartDateWeek(item.createdAt).format(),
      }))

      const allTaskByWeek = allTasksFormatByWeek?.reduce(
        (result, item) => ({
          ...result,
          [item.week]: [...(result[item.week] || []), item],
        }),
        {}
      )
      const weeks = Object.keys(allTaskByWeek)

      const res = weeks.map((key, index) => {
        const tasksOfUser = allTaskByWeek[key]

        if (dateBetweenRange(key, new Date()) || index === weeks.length - 1) {
          return {
            week: tasksOfUser[0].week,
            tasksOfUser,
            isActiveWeek: true,
          }
        } else {
          return {
            week: tasksOfUser[0].week,
            tasksOfUser,
            isActiveWeek: false,
          }
        }
      })
      dispatch(getAllTaskSuccess(res))
    } catch (err) {
      dispatch(getAllTaskFail(err?.resonse?.message || err.message))
    }
  }

  const handleUpdateTasks = tasks => dispatch(getAllTaskSuccess(tasks))

  useEffect(() => {
    getAllTask()
  }, [])

  return (
    <div className="task-history__all">
      {loading ? (
        <div className="page-loading">
          <img src={PageLoading} alt="page_loading" />
        </div>
      ) : (
        activeWeekTasks && (
          <>
            <div className="task-history__header">
              <WeekNavigation
                tasks={allTasks}
                updateTasks={handleUpdateTasks}
              />
            </div>
            <TableList col="2">
              <TableListHeader>
                <TableListItem>Name</TableListItem>
                <TableListItem>Tasks</TableListItem>
              </TableListHeader>
              <TableListBody>
                {activeWeekTasks.tasksOfUser.map(item => (
                  <div key={item.user._id} className="table-list__body--row">
                    <TableListItem>{item.user.name}</TableListItem>
                    <TableListItem>
                      <ul className="task-names">
                        {item.tasks.map(task => (
                          <li key={task._id} className="task-names__item">
                            {task.name}
                          </li>
                        ))}
                      </ul>
                    </TableListItem>
                  </div>
                ))}
              </TableListBody>
            </TableList>
          </>
        )
      )}
    </div>
  )
}

export default AllTaskHistory
