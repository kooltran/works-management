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

      const res = Object.keys(allTaskByWeek).map(key => {
        const tasksOfUser = allTaskByWeek[key]

        if (dateBetweenRange(key, new Date())) {
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
      {loading
        ? 'loading...'
        : activeWeekTasks && (
            <>
              <div className="task-history__header">
                <WeekNavigation
                  tasks={allTasks}
                  updateTasks={handleUpdateTasks}
                />
              </div>
              <div className="task-list">
                <div className="task-list__header">
                  <div className="task-list__header--item">Name</div>
                  <div className="task-list__header--item">Tasks</div>
                </div>
                <div className="task-list__body">
                  {activeWeekTasks.tasksOfUser.map(item => (
                    <div key={item.user._id} className="task-list__body--row">
                      <div className="task-list__body--item">
                        {item.user.name}
                      </div>
                      <div className="task-list__body--item">
                        <ul className="task-names">
                          {item.tasks.map(task => (
                            <li key={task._id} className="task-names__item">
                              {task.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
    </div>
  )
}

export default AllTaskHistory
