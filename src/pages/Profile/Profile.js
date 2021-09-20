import React, { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import { IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
  getCurrentProfileRequest,
  getCurrentProfileSuccess,
  getCurrentProfileFail,
} from '../../actions/profileAction'
import { getRole } from '../../helpers'
import { getProfile, getCurrentProfile } from '../../api/profileAPI'
import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'
import { useAppContext } from '../../AppContext'
import ProfileList from '../../components/Profile/ProfileList'

const Profile = () => {
  const [showAlert, setShowAlert] = useState({})
  const {
    data: {
      profile: {
        get: {
          data: allListProfile,
          loading: allListProfileLoading,
          fail: getAllListProfileFail,
        },
      },
      currentProfile: {
        data: currentProfile,
        loading: currentProfileLoading,
        fail: currentProfileFail,
      },
    },
    dispatch,
  } = useAppContext()
  const role = getRole()

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
      dispatch(getProfileFail(err.response.data.message || err.message))

      setShowAlert({
        type: 'error',
        message: err.response.data.message,
      })
    }
  }

  useEffect(() => {
    if (role === 'admin') {
      if (allListProfile === null) {
        getProfileList()
      }
    } else {
      if (currentProfile === null) {
        getCurrentProfileItem()
      }
    }
  }, [])

  return (
    <div className="profile-wrapper">
      {allListProfileLoading || currentProfileLoading ? (
        'loading...'
      ) : (
        <ProfileList
          profileList={allListProfile}
          currentProfile={currentProfile}
        />
      )}

      {showAlert.type && (
        <NotificationDialog
          {...showAlert}
          handleCloseDialog={() => {
            setShowAlert({})
          }}
        />
      )}
    </div>
  )
}

export default Profile
