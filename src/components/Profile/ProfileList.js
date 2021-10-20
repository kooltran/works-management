import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal/'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'

import PageLoading from '../../images/page_loading.svg'

import { TextField } from '@material-ui/core'

import { Formik } from 'formik'

import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
  getCurrentProfileRequest,
  getCurrentProfileSuccess,
  getCurrentProfileFail,
} from '../../actions/profileAction'

import { getProfile, getCurrentProfile } from '../../api/profileAPI'

import TableList from '../Table/TableList'
import TableListHeader from '../Table/TableListHeader'
import TableListBody from '../Table/TableListBody'
import TableListItem from '../Table/TableListItem'
import { useAppContext } from '../../AppContext'

import { getRole } from '../../helpers'

import './Profile.scss'
import ProfileItem from './ProfileListItem'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ProfileList = () => {
  const role = getRole()
  const [showEditProfile, setShow] = useState(false)
  const [editingProfileItem, setProfileItem] = useState({})
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

  const handleEditProfile = id => {
    const editingProfileItem = allListProfile.find(item => item._id === id)
    setProfileItem(editingProfileItem)
    setShow(true)
  }

  const handleCloseEditProfile = () => setShow(false)

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
    <>
      {role === 'admin' ? (
        allListProfileLoading ? (
          <div className="page-loading">
            <img src={PageLoading} alt="page_loading" />
          </div>
        ) : (
          <TableList className="profile-list" col="6">
            <TableListHeader>
              <TableListItem className="profile-name">Staff Name</TableListItem>
              <TableListItem>Email</TableListItem>
              <TableListItem>Position</TableListItem>
              <TableListItem>Project</TableListItem>
              <TableListItem className="profile-lead">Lead</TableListItem>
              <TableListItem className="profile-action">Actions</TableListItem>
            </TableListHeader>
            {allListProfile && (
              <TableListBody>
                {allListProfile.map(item => {
                  return (
                    <ProfileItem
                      key={item._id}
                      item={item}
                      handleEditProfile={handleEditProfile}
                    />
                  )
                })}
              </TableListBody>
            )}
          </TableList>
        )
      ) : currentProfileLoading ? (
        <div className="page-loading">
          <img src={PageLoading} alt="page_loading" />
        </div>
      ) : (
        <ProfileItem
          item={currentProfile}
          handleEditProfile={handleEditProfile}
        />
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showEditProfile}
        onClose={handleCloseEditProfile}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showEditProfile}>
          <Box sx={style}>
            <Formik
              // onSubmit={handleSubmitLogin}
              initialValues={{}}
              // validationSchema={Schema}
              // innerRef={formRef}
            >
              {({
                handleSubmit,
                handleChange,
                touched,
                errors,
                handleBlur,
                values,
              }) => {
                return (
                  <div>
                    <TextField
                      fullWidth
                      id="profile-name"
                      name="name"
                      label="Profile Name"
                      // helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={editingProfileItem.name}
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                )
              }}
            </Formik>
          </Box>
        </Fade>
      </Modal>

      {showAlert.type && (
        <NotificationDialog
          {...showAlert}
          handleCloseDialog={() => {
            setShowAlert({})
          }}
        />
      )}
    </>
  )
}

export default ProfileList
