import React, { useEffect } from 'react'
import TaskForm from '../../components/Task/TaskForm'
import TaskHistory from '../../components/Task/TaskHistory'
import AllTaskHistory from '../../components/Task/AllTaskHistory'
import { useAppContext } from '../../AppContext'
import { getRole } from '../../helpers'
import CustomTab from '../../components/Tab/CustomTab'

const tabMapping = {
  0: 'task-form',
  1: 'task-history',
}

const Tasks = () => {
  const {
    data: {
      task: {
        activeTab: activeTabContext,
        get: { data: allTaskByUser },
      },
    },
  } = useAppContext()

  const activeTabContextIndex = Object.keys(tabMapping).find(
    key => tabMapping[key] === activeTabContext
  )
  const [activeTab, setTab] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }

  const role = getRole()

  useEffect(() => {
    if (activeTabContextIndex) {
      setTab(Number(activeTabContextIndex))
    }
  }, [activeTabContextIndex])

  const tabData = [
    {
      label: 'Task Form',
      content: <TaskForm />,
    },
    {
      label: 'Task History',
      content: <TaskHistory />,
      disabled: allTaskByUser?.length === 0,
    },
  ]

  return (
    <div className="task-management">
      {role === 'user' ? (
        <div className="task-management__user">
          <CustomTab
            tabData={tabData}
            activeTab={activeTab}
            handleChangeTab={handleChangeTab}
          />
        </div>
      ) : (
        <div className="task-management__admin">
          <AllTaskHistory />
        </div>
      )}
    </div>
  )
}

export default Tasks
