import React, { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab'
import { IconButton, Slide } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
} from '../../actions/profileAction'
import { getProfile } from '../../api/profileAPI'
import { useAppContext } from '../../AppContext'
import ProfileList from '../../components/Profile/ProfileList'

const Profile = () => {
  const [showAlert, setShowAlert] = useState({})
  const {
    data: { profile },
    dispatch,
  } = useAppContext()

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
    getProfileList()
  }, [])

  return (
    <div className="profile-wrapper">
      {profile.get.loading ? (
        'loading...'
      ) : (
        <ProfileList profileList={profile.get.data} />
      )}

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

export default Profile
