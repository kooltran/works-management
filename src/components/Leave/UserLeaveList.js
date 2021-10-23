import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal/'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import Add from '@material-ui/icons/Add'

import { useAppContext } from '../../AppContext'
import {
  getCurrentLeaveRequest,
  getCurrentLeaveSuccess,
  getCurrentLeaveFail,
} from '../../actions/leaveAction'
import { getCurrentUserLeaves } from '../../api/leaveAPI'

import PageLoading from '../../components/PageLoading/PageLoading'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import NotificationDialog from '../NotificationDialog/NotificationDialog'
import CustomButton from '../../components/CustomButton/CustomButton'
import LeaveForm from '../../components/Leave/LeaveForm'

import Pill from '../Pill'
import List from '../List'

import { ERROR_MESSAGE } from '../../constants'

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

const UserLeaveList = () => {
  const {
    data: {
      leave: {
        get: {
          data: currentLeaveData,
          loading: loadingLeaveData,
          fail: getUserLeaveFail,
          creating,
          createdFail,
        },
      },
    },
    dispatch,
  } = useAppContext()
  const [showAlert, setShowAlert] = useState({})
  const [showCreateLeaveForm, setShowLeaveForm] = useState(!!creating)

  const leaveData =
    currentLeaveData?.map(item => {
      const dates = item.dates
        .map(d => (d.time.length === 2 ? d.date : `${d.date}(${d.time[0]})`))
        .flat()
        .sort()

      const duration = item.dates.reduce(
        (acc, d) => (d.time.length === 2 ? acc + 1 : acc + 0.5),
        0
      )
      return {
        Date: dates.join(', '),
        'Duration (day)': duration,
        Type: item.type.split('-').join(' '),
        Reason: item.reason,
        Status: item.status,
      }
    }) || []

  const getCurrentLeaves = async () => {
    dispatch(getCurrentLeaveRequest())
    try {
      const data = await getCurrentUserLeaves()
      dispatch(getCurrentLeaveSuccess(data))
    } catch (err) {
      dispatch(getCurrentLeaveFail(ERROR_MESSAGE))
    }
  }

  const pillColorMapping = {
    pending: {
      background: '#fdf0e4',
      color: '#F2994A',
    },
    approved: {
      background: 'rgb(47,128,237,0.2)',
      color: '#2F80ED',
    },
  }

  const ListResolver = d => {
    const result = { ...d }
    if (d.Status) {
      result.Status = (
        <Pill
          pillBg={pillColorMapping[d.Status].background}
          pillColor={pillColorMapping[d.Status].color}
          style={{ textTransform: 'capitalize' }}
        >
          {d.Status}
        </Pill>
      )
    }
    return result
  }

  const handleCloseAlert = () => setShowAlert({})

  const handleOpenLeaveForm = () => setShowLeaveForm(true)

  const handleCloseLeaveForm = () => setShowLeaveForm(false)

  useEffect(() => {
    getCurrentLeaves()
  }, [])

  useEffect(() => {
    if (getUserLeaveFail || createdFail) {
      setShowAlert({ type: 'error', message: getUserLeaveFail || createdFail })
    } else {
      setShowAlert({})
    }
  }, [getUserLeaveFail, createdFail])

  useEffect(() => {
    setShowLeaveForm(creating)
  }, [creating])

  return (
    <div>
      {loadingLeaveData ? (
        <PageLoading />
      ) : (
        <>
          {currentLeaveData && (
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

              <List
                id="cui-sample-list-sortables"
                data={leaveData}
                toggleInnerContent={false}
                options={{
                  styles: {
                    Status: {
                      '--itemWidth': '15%',
                      textAlign: 'right',
                      alignContent: 'flex-end',
                    },
                    Reason: {
                      '--itemWidth': '15%',
                      textTransform: 'capitalize',
                    },
                    Type: {
                      textTransform: 'capitalize',
                    },
                    'Duration (day)': {
                      alignContent: 'center',
                      textAlign: 'center',
                    },
                  },
                }}
                itemResolver={ListResolver}
                loading={loadingLeaveData}
              />

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
          {getUserLeaveFail && <PageNotFound />}
        </>
      )}

      {showAlert.message && (
        <NotificationDialog
          {...showAlert}
          handleCloseDialog={handleCloseAlert}
        />
      )}
    </div>
  )
}

export default UserLeaveList
