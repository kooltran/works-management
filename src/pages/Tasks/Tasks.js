import React, { useEffect } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import TaskForm from '../../components/Task/TaskForm'
import TaskHistory from '../../components/Task/TaskHistory'
import AllTaskHistory from '../../components/Task/AllTaskHistory'
import { useAppContext } from '../../AppContext'
import { getRole } from '../../helpers'

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

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 4,
    '& > span': {
      maxWidth: '30%',
      width: '100%',
      backgroundColor: '#0FCEC3',
    },
  },
  flexContainer: {
    height: '100%',
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'upper-cas',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    '&:focus': {
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />)

const useStyles = makeStyles(theme => ({
  tabTitle: {
    width: '100%',
    height: '100%',
    marginBottom: '20px',
    backgroundColor: '#fff',
    minHeight: 70,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tabTitleItem: {
    width: '100%',
    minWidth: '50%',
    height: '100%',
    padding: '10px 0',
    '&:first-child > span': {
      borderRight: '1px solid #E0E0E0',
      height: '100%',
    },
  },
}))

const Tasks = () => {
  const classes = useStyles()
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

  return (
    <div className="task-management">
      {role === 'user' ? (
        <div className="task-management__user">
          <StyledTabs
            className={classes.tabTitle}
            value={activeTab}
            onChange={handleChangeTab}
            aria-label="simple tabs example"
            indicatorColor="primary"
          >
            <StyledTab className={classes.tabTitleItem} label="Task Form" />
            <StyledTab
              className={classes.tabTitleItem}
              label="Task History"
              disabled={allTaskByUser?.length === 0}
            />
          </StyledTabs>
          <TabPanel value={activeTab} index={0}>
            <TaskForm activeTab={tabMapping[activeTab]} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <TaskHistory activeTab={tabMapping[activeTab]} />
          </TabPanel>
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
