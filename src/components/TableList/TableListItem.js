import React from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'

import { useAppContext } from '../../AppContext'
import {
  getAllTaskByUserRequest,
  getAllTaskByUserFail,
  getAllTaskByUserSuccess,
  updateTaskSuccess,
  updateTaskRequest,
  updateTaskFail,
} from '../../actions/taskAction'
import UpdatingIcon from '../../images/updating.svg'

const TableListItem = ({
  item,
  id: taskId,
  isEditing,
  isShowEdit,
  handleEditTaskItem,
}) => {
  const {
    data: {
      task: {
        get: { updating, loading, data: allTaskByUser },
      },
    },
    dispatch,
  } = useAppContext()

  const currentWeekTasks =
    allTaskByUser?.find(item => item.isActiveWeek) || null
  // console.log(isEditing, 'isEditing')
  // const handleEditTaskItem = () => {
  //   const newTasks = currentWeekTasks.tasks.map(task =>
  //     task._id === taskId
  //       ? { ...task, isEditing: true, isShowEdit: false }
  //       : { ...task, isEditing: false, isShowEdit: true }
  //   )

  //   const editedTasksByUser = allTaskByUser.map(item =>
  //     item.isActiveWeek ? { ...item, tasks: newTasks } : item
  //   )
  //   dispatch(getAllTaskByUserSuccess(editedTasksByUser))
  // }

  if (item.type === 'action') {
    return (
      <div className="table-list__body--item action-item">
        {isEditing &&
          (updating ? (
            <img src={UpdatingIcon} alt="updating icon" />
          ) : (
            <span className="edit-icon" onClick={() => {}}>
              <CheckOutlinedIcon />
            </span>
          ))}
        {(isShowEdit === undefined ||
          (isShowEdit === undefined && isShowEdit)) && (
          <span
            className="edit-icon"
            onClick={() => handleEditTaskItem(taskId)}
          >
            <EditOutlinedIcon />
          </span>
        )}
      </div>
    )
  }

  if (item.type === 'label') {
    return <div className="table-list__body--item">{item.value}</div>
  }

  if (item.type === 'date') {
    return <div className="table-list__body--item">date</div>
  }

  if (item.type === 'select') {
    return <div className="table-list__body--item">select</div>
  }

  if (item.type === 'textarea') {
    return <div className="table-list__body--item">textarea</div>
  }

  return ''
}

export default TableListItem
