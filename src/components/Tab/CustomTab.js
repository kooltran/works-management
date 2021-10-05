import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, withStyles } from '@material-ui/core/styles'

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

const CustomTab = ({ tabData, activeTab, handleChangeTab }) => {
  const classes = useStyles()

  return (
    <>
      <StyledTabs
        className={classes.tabTitle}
        value={activeTab}
        onChange={handleChangeTab}
        aria-label="simple tabs example"
        indicatorColor="primary"
      >
        {tabData.map((tab, index) => (
          <StyledTab
            key={index}
            className={classes.tabTitleItem}
            label={tab.label}
            disabled={tab.disabled}
          />
        ))}
      </StyledTabs>
      {tabData.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </>
  )
}

export default CustomTab
