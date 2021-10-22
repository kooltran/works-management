import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Modal from '@material-ui/core/Modal/'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import Add from '@material-ui/icons/Add'

import { useAppContext } from '../../AppContext'
import { getRole } from '../../helpers'

import CustomButton from '../../components/CustomButton/CustomButton'
import LeaveForm from '../../components/Leave/LeaveForm'
import UserLeaveList from '../../components/Leave/UserLeaveList'
import LeaveAdmin from '../../components/Leave/LeaveAdmin'

import './Leave.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: 8,
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: '20px 30px',
  background: '#f0f0f0',
  p: 4,
}

const LeaveManagement = () => {
  const {
    data: {
      leave: {
        get: { creating },
      },
    },
  } = useAppContext()

  const role = getRole()

  const [showCreateLeaveForm, setShowLeaveForm] = useState(!!creating)
  const handleCloseLeaveForm = () => setShowLeaveForm(false)

  const handleOpenLeaveForm = () => setShowLeaveForm(true)

  useEffect(() => {
    setShowLeaveForm(creating)
  }, [creating])

  return (
    <div className="leave-wrapper">
      {role === 'admin' ? (
        <LeaveAdmin />
      ) : (
        <>
          <div className="leave-add">
            <CustomButton
              variant="outlined"
              textcolor="#fff"
              background="#00D1B2"
              style={{ textTransform: 'capitalize', fontSize: 16 }}
              hover={{
                color: '#fff',
                backgroundColor: '#00D1B2',
                opacity: 0.8,
              }}
              onClick={handleOpenLeaveForm}
            >
              Create Leave
              <Add />
            </CustomButton>
          </div>

          <UserLeaveList />

          <Modal
            className="leave-modal"
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={!!showCreateLeaveForm}
            onClose={handleCloseLeaveForm}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={showCreateLeaveForm}>
              <Box sx={style}>
                <LeaveForm />
              </Box>
            </Fade>
          </Modal>
        </>
      )}
    </div>
  )
}

export default LeaveManagement
