import React, { useState, useEffect } from 'react'
import Add from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal/'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'

import ProfileList from '../../components/Profile/ProfileList'
import ProfileUser from '../../components/Profile/ProfileUser'
import NewProfile from '../../components/Profile/NewProfile'
import CustomButton from '../../components/CustomButton/CustomButton'

import { useAppContext } from '../../AppContext'
import { getRole } from '../../helpers'

const useStyles = makeStyles(() => ({
  boxStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: '#FFFFFF',
    border: '2px solid #FFFFFF',
    borderRadius: '3px',
    boxShadow: '5px 5px 200px 5px #b9cfce',
    padding: '1.5rem 2rem',
  },
}))

const Profile = () => {
  const classes = useStyles()
  const role = getRole()
  const [openProfileForm, setOpenProfileForm] = useState(false)

  const {
    data: {
      profile: {
        get: { createSuccess },
      },
    },
  } = useAppContext()

  const handleOpenProfileForm = () => {
    setOpenProfileForm(true)
  }

  const handleCloseProfileForm = () => {
    setOpenProfileForm(false)
  }

  useEffect(() => {
    if (createSuccess) {
      setOpenProfileForm(false)
    }
  }, [createSuccess])

  return (
    <div className="profile-wrapper">
      {role === 'admin' ? (
        <>
          <div className="profile-add__btn">
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
              onClick={handleOpenProfileForm}
            >
              Create new profile
              <Add />
            </CustomButton>
          </div>
          <ProfileList />
        </>
      ) : (
        <ProfileUser />
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openProfileForm}
        onClose={handleCloseProfileForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openProfileForm}>
          <Box className={classes.boxStyle}>
            <NewProfile />
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default Profile
