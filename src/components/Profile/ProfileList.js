import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal/'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import { CloseOutlined, EditOutlined } from '@material-ui/icons'

import ProfileForm from './ProfileForm'
import PageLoading from '../../components/PageLoading/PageLoading'
import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'
import CustomButton from '../../components/CustomButton/CustomButton'

import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
  getCurrentProfileRequest,
  getCurrentProfileSuccess,
  getCurrentProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFail,
} from '../../actions/profileAction'

import {
  getProfile,
  getCurrentProfile,
  updateProfile,
  deleteProfile,
} from '../../api/profileAPI'

import ProfileItem from './ProfileListItem'
import List from '../List'

import { useAppContext } from '../../AppContext'
import { getRole, renderProfileValues } from '../../helpers'

import './Profile.scss'

const modelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 8,
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  overflowY: 'auto',
  padding: '20px 30px',
  background: '#f0f0f0',
  p: 4,
}

const useStyles = makeStyles(() => ({
  boxStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#FFFFFF',
    border: '2px solid #FFFFFF',
    borderRadius: '3px',
    boxShadow: '5px 5px 200px 5px #b9cfce',
    padding: '1.5rem 2rem',
  },
}))

export const ProfileList = () => {
  const role = getRole()
  const classes = useStyles()
  const [showEditProfile, setShow] = useState(false)
  const [editingProfileItem, setProfileItem] = useState({})
  const [showAlert, setShowAlert] = useState({})
  const [showDeleteConfirm, setShowDelete] = useState(false)
  const [deletingProfile, setDeletingProfile] = useState('')

  const {
    data: {
      profile: {
        get: {
          data: allListProfile,
          loading: allListProfileLoading,
          updating,
          deleting,
        },
      },
      currentProfile: { data: currentProfile, loading: currentProfileLoading },
    },
    dispatch,
  } = useAppContext()

  const handleEditProfile = id => {
    const editingProfileItem = allListProfile.find(item => item._id === id)
    const profileOptionsInit = editingProfileItem?.project?.map(item => ({
      label: item,
      value: item,
    }))

    setProjectoption(profileOptionsInit)
    setProfileItem(editingProfileItem)
    setShow(true)
  }

  const handleSubmitDeleteProfile = async () => {
    dispatch(deleteProfileRequest())
    try {
      const deletedProfileItem = await deleteProfile(deletingProfile)
      dispatch(deleteProfileSuccess(deletedProfileItem))
      setShowDelete(false)
    } catch (err) {
      dispatch(deleteProfileFail(err?.response?.data?.message || err?.message))
      setShowDelete(false)
      setShowAlert({
        type: 'error',
        message: err?.response?.data?.message || err?.message,
      })
    }
  }

  const handleShowConfirmDelete = id => {
    setDeletingProfile(id)
    setShowDelete(true)
  }

  const handleCloseConfirmDelete = () => setShowDelete(false)

  const profileListData = allListProfile?.map(item => {
    return {
      'Staff Name': item.name,
      Email: item.email,
      Position: item.position,
      Project: (
        <ul style={{ padding: 0, paddingLeft: 15 }}>
          {item.project.map(project => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      ),
      Lead: item.lead,
      'Start Date': item.startDate,
      Action: (
        <>
          <span
            className="action-icon"
            onClick={() => handleShowConfirmDelete(item._id)}
          >
            <CloseOutlined htmlColor="red" />
          </span>
          {item.status !== 'approved' && (
            <span
              className="action-icon"
              onClick={() => handleEditProfile(item._id)}
            >
              <EditOutlined htmlColor="#0FCEC3" />
            </span>
          )}
        </>
      ),
    }
  })

  const [projectOption, setProjectoption] = useState([])

  const projectsValue = renderProfileValues(projectOption)

  const getProfileList = async () => {
    dispatch(getProfileRequest())
    try {
      const res = await getProfile()
      dispatch(getProfileSuccess(res.data))
    } catch (err) {
      dispatch(getProfileFail(err?.response?.data?.message || err?.message))
      setShowAlert({
        type: 'error',
        message: err?.response?.data?.message || err?.message,
      })
    }
  }

  const updateProfileList = async payload => {
    dispatch(updateProfileRequest())
    try {
      const res = await updateProfile(editingProfileItem._id, payload)
      dispatch(updateProfileSuccess(res))
      setShow(false)
    } catch (err) {
      dispatch(updateProfileFail(err?.response?.data?.message || err.message))
      setShow({
        type: 'error',
        message: err?.response?.data?.message || err?.message,
      })
      setShowAlert({
        type: 'error',
        message: err?.response?.data?.message || err?.message,
      })
    }
  }

  const handleCloseEditProfile = () => setShow(false)

  useEffect(() => {
    getProfileList()
  }, [])

  return (
    <>
      {allListProfileLoading ? (
        <PageLoading />
      ) : (
        <List
          id="profile-list"
          data={profileListData}
          toggleInnerContent={false}
          options={{
            styles: {
              'Staff Name': {
                '--itemWidth': '10%',
              },
              Position: {
                '--itemWidth': '15%',
              },
              Lead: {
                '--itemWidth': '10%',
              },
              Email: {
                wordBreak: 'break-word',
              },
              Action: {
                '--itemWidth': '15%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                textAlign: 'center',
              },
            },
          }}
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
          <Box className={classes.boxStyle}>
            <ProfileForm
              initCreatableOptions={projectOption}
              isDisabled={updating}
              profileValues={{
                name: editingProfileItem?.name,
                position: editingProfileItem?.position,
                lead: editingProfileItem?.lead,
                project: projectsValue,
              }}
              updateProfileList={updateProfileList}
              title="Edit Profile"
            />
          </Box>
        </Fade>
      </Modal>

      <Modal
        className="leave-modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showDeleteConfirm}
        onClose={handleCloseConfirmDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showDeleteConfirm}>
          <Box sx={modelStyle}>
            <h4>Do you want to delete this profile?</h4>
            <div
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <CustomButton
                textcolor="#333"
                style={{
                  border: '1px solid #0FCEC3',
                  width: '100%',
                  height: 40,
                }}
                hover={{
                  color: '#fff',
                  backgroundColor: '#00D1B2',
                  opacity: 0.8,
                }}
                disabled={deleting}
                onClick={handleCloseConfirmDelete}
              >
                No
              </CustomButton>
              <CustomButton
                textcolor="#fff"
                background="#0FCEC3"
                style={{
                  border: '1px solid #0FCEC3',
                  width: '100%',
                  height: 40,
                  marginLeft: 10,
                }}
                hover={{
                  color: '#fff',
                  backgroundColor: '#00D1B2',
                  opacity: 0.8,
                }}
                disabled={deleting}
                onClick={handleSubmitDeleteProfile}
              >
                {deleting ? 'Deleting...' : 'Yes'}
              </CustomButton>
            </div>
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
