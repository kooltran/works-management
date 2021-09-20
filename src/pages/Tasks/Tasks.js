import React, { useEffect } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import TaskForm from '../../components/Task/TaskForm'
import TaskHistory from '../../components/Task/TaskHistory'
import { useAppContext } from '../../AppContext'

const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

const tabMapping = {
  0: 'task-form',
  1: 'task-history',
}

const Tasks = () => {
  const {
    data: {
      task: { activeTab: activeTabContext },
    },
  } = useAppContext()
  const activeTabContextIndex = Object.keys(tabMapping).find(
    key => tabMapping[key] === activeTabContext
  )
  const [activeTab, setTab] = React.useState(0)
  const handleChangeTab = (event, newValue) => {
    setTab(newValue)
  }

  useEffect(() => {
    if (activeTabContextIndex) {
      setTab(Number(activeTabContextIndex))
    }
  }, [activeTabContextIndex])

  return (
    <div>
      <Tabs
        value={activeTab}
        onChange={handleChangeTab}
        aria-label="simple tabs example"
      >
        <Tab label="Task Form" />
        <Tab label="Task History" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <TaskForm activeTab={tabMapping[activeTab]} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <TaskHistory activeTab={tabMapping[activeTab]} />
      </TabPanel>
    </div>
  )
}

export default Tasks
