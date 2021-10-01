import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined'
import ListItemText from '@material-ui/core/ListItemText'
import { IconButton } from '@material-ui/core'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'

import Profile from '../Profile/Profile'
import Tasks from '../Tasks/Tasks'

import useAuth from '../../components/Auth/useAuth'
import { getCurrentUser } from '../../helpers'

import './Home.scss'

import { withStyles } from '@material-ui/styles'

import logoImage from '../../images/logo.svg'
import person from '../../images/person.svg'

const drawerWidth = 240

const sideBarItems = [
  {
    value: 'profile',
    label: 'Profile',
  },
  {
    value: 'reports',
    label: 'Reports',
  },
  {
    value: 'leave',
    label: 'Leave Management',
  },
]

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: '#FFFFFF',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#333747',
    color: '#FFFFFF',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: 0,
    marginLeft: 0,
    height: '100vh',
    background: '#f0f0f0',
  },
  logo: {
    margin: '40px 30px',
    width: '100%',
  },
  person: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#F3F6F7',
    marginRight: '1em',
  },
  caretButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#fff',
  },
}))

const ListItem = withStyles({
  root: {
    '&': {
      backgroundColor: '#333747',
      color: '#FFFFFF',
      '& .MuiListItemIcon-root': {
        color: '#FFFFFF',
      },
    },
    '&$selected': {
      backgroundColor: '#0FCEC3',
      color: '#FFFFFF',
      '& .MuiListItemIcon-root': {
        color: '#FFFFFF',
      },
    },
    '&$selected:hover': {
      backgroundColor: '#0FCEC3',
      color: '#FFFFFF',
      '& .MuiListItemIcon-root': {
        color: '#FFFFFF',
      },
    },
  },
  selected: {},
})(MuiListItem)

export default function Home() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [selectedItem, setSelected] = React.useState(sideBarItems[0])

  const { submitLogout } = useAuth()
  const user = getCurrentUser()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleChooseListItem = item => {
    setSelected(item)
  }

  const mappingListItem = {
    profile: {
      Icon: <PersonOutlineOutlinedIcon />,
      content: <Profile />,
    },
    reports: {
      Icon: <AssignmentTurnedInOutlinedIcon />,
      content: <Tasks />,
    },
    leave: {
      Icon: <EventOutlinedIcon />,
    },
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="nav-header">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{selectedItem.label}</Typography>
          <div className="nav-header__menu">
            <img src={person} alt="person" className={classes.person} />
            <span className="user-name">{user?.name}</span>
            <span className="user-logout" onClick={submitLogout}>
              <ExitToAppOutlinedIcon />
            </span>
            <span className="menu-notification">
              <NotificationsNoneIcon />
            </span>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <img src={logoImage} alt="S3Corporation" className={classes.logo} />
          <IconButton
            onClick={handleDrawerClose}
            className={classes.caretButton}
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {sideBarItems.map(item => (
            <ListItem
              button
              key={item.value}
              selected={item.value === selectedItem.value}
              onClick={() => handleChooseListItem(item)}
            >
              <ListItemIcon>{mappingListItem[item.value].Icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {mappingListItem[selectedItem.value].content}
      </main>
    </div>
  )
}
