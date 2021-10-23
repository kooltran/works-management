import React from 'react'

import { Alert } from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import { IconButton, Slide } from '@material-ui/core'

import './NotificationDialog.scss'

const NotificationDialog = ({ type, message, handleCloseDialog }) => {
  return (
    <Slide direction="left" in={!!type} mountOnEnter unmountOnExit>
      <Alert
        className="notification-dialog"
        severity={type}
        color={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleCloseDialog}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Slide>
  )
}

export default NotificationDialog
