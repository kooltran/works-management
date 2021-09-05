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
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import EventOutlinedIcon from '@material-ui/icons/EventOutlined'
import ListItemText from '@material-ui/core/ListItemText'
import { Alert } from '@material-ui/lab'
import { IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'

import ProfileList from '../../components/Profile/ProfileList'
import ProfileListItem from '../../components/Profile/ProfileListItem'
import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
  getCurrentProfileRequest,
  getCurrentProfileSuccess,
  getCurrentProfileFail,
} from '../../actions/profileAction'
import useAuth from '../../components/Auth/useAuth'
import { getProfile, getCurrentProfile } from '../../api/profileAPI'
import { useAppContext } from '../../AppContext'
import { getRole, getCurrentUser } from '../../helpers'

import './Home.scss'

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
    label: 'Leave management',
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
    marginLeft: 0,
  },
}))

export default function Home() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [showAlert, setShowAlert] = useState({})
  const [selectedItem, setSelected] = React.useState(sideBarItems[0])
  const {
    data: { profile, currentProfile },
    dispatch,
  } = useAppContext()
  const { submitLogout } = useAuth()

  const role = getRole()
  const user = getCurrentUser()

  const getCurrentProfileItem = async () => {
    dispatch(getCurrentProfileRequest())

    try {
      const res = await getCurrentProfile()
      dispatch(getCurrentProfileSuccess(res))
    } catch (err) {
      dispatch(getCurrentProfileFail(err.response.data.message || err.message))

      setShowAlert({
        type: 'error',
        message: err.response.data.message,
      })
    }
  }

  const getProfileList = async () => {
    dispatch(getProfileRequest())

    try {
      const res = await getProfile()
      dispatch(getProfileSuccess(res.data))
    } catch (err) {
      dispatch(getProfileFail(err.response?.data?.message || err.message))

      setShowAlert({
        type: 'error',
        message: err.response?.data?.message || err.message,
      })
    }
  }

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
      content:
        role === 'admin' ? (
          <ProfileList profileList={profile.get.data} />
        ) : currentProfile.loading ? (
          'loading...'
        ) : (
          <ProfileListItem item={currentProfile.data} />
        ),
    },
    reports: {
      Icon: <AssignmentTurnedInOutlinedIcon />,
    },
    leave: {
      Icon: <EventOutlinedIcon />,
    },
  }

  useEffect(() => {
    if (role === 'admin') {
      getProfileList()
    } else {
      getCurrentProfileItem()
    }
  }, [])

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
          <Typography variant="h6" noWrap>
            {selectedItem.label}
          </Typography>
          <div className="nav-header__menu">
            <span className="user-name">{user?.name}</span>
            <span className="user-logout" onClick={submitLogout}>
              <ExitToAppOutlinedIcon />
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
          <IconButton onClick={handleDrawerClose}>
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
      {showAlert.type && (
        <Slide
          direction="left"
          in={!!showAlert.type}
          mountOnEnter
          unmountOnExit
        >
          <Alert
            className="product-alert"
            severity={showAlert.type}
            color={showAlert.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowAlert({})
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {profile.get.fail}
          </Alert>
        </Slide>
      )}
    </div>
  )
}
