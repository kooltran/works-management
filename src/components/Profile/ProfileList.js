import React, { useEffect, useState } from 'react'
import { components } from 'react-select'
import { object, string } from 'yup'
import Modal from '@material-ui/core/Modal/'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'
import classNames from 'classnames'
import LoginIcon from '@mui/icons-material/Login'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import DoneIcon from '@mui/icons-material/Done'
import GradeIcon from '@mui/icons-material/Grade'
import ListIcon from '@mui/icons-material/List'
import FlagIcon from '@mui/icons-material/Flag'
import ListSubheader from '@material-ui/core/ListSubheader'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'

import List from '@material-ui/core/List'

import CreatableSelect from 'react-select/creatable'

import { TextField, Button, OutlinedInput, makeStyles } from '@material-ui/core'

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

const Schema = object().shape({
  name: string().required().min(1, 'Name must be at least 1 characters'),
  position: string()
    .required()
    .min(1, 'position must be at least 1 characters'),
  lead: string().required().min(1, 'Lead must be at least 1 characters'),
})

const useStyles = makeStyles(() => ({
  label_edit: {
    fontSize: '13px',
  },
  boxStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#FFFFFF',
    border: '2px solid #FFFFFF',
    // boxShadow: 24,
    borderRadius: '3px',
    boxShadow: '5px 5px 200px 5px #b9cfce',
    height: '55%',
    padding: '2rem',
  },
  btnSubmit: {
    width: '25%',
    cursor: 'pointer',
    '&::before': {
      content: '',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#ff7870',
    },
  },
  marginComponentChid: {
    margin: '0.5rem auto',
  },
  buttonSave: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  creatableSelect: {
    color: '#000000',
  },
  optionStyles: {
    display: 'flex',
    backgroundColor: 'red',
    // position: 'absolute',
  },
}))
export const useHelperTextStyles = makeStyles(() => ({
  root: {
    '& .MuiFormLabel-root': {
      color: '#294272',
    },
    '& .MuiInputBase-root': {
      borderRadius: '2px',
      font: '-webkit-small-control',
      padding: '9px 10px 2px',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid rgb(0 255 153 / 74%)',
    },
    '& .MuiInput-underline:after': {
      borderBottom: '1px solid rgb(6 111 105)',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #2fff00 !important',
    },
    '& .MuiListSubheader-root': {
      color: '#00cacb',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      fontSize: '14px',
      fontWeight: 700,
    },
    '& .MuiInputBase-input': {
      paddingLeft: '15px',
    },
    '& .css-i4bv87-MuiSvgIcon-root': {
      fill: '#00dbce9e',
    },
    '& .css-1n7v3ny-option ': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .css-yt9ioa-option ': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .css-9gakcf-option ': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}))

export const ProfileList = () => {
  const role = getRole()
  const classes = useStyles()
  const textStyles = useHelperTextStyles()
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

  const [projectOption, setProjectoption] = useState([])
  const [selectedProjectItem, setProjectItem] = useState({})
  const [projectItemDelete, setProjectItemDelete] = useState([])
  const [isDeleteProjItem, setDeleteProjItem] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    const fstEditingProjItem = editingProfileItem?.project[0]
    const profileOptionsInit = editingProfileItem?.project?.map(item => ({
      label: item,
      value: item,
    }))
    const initProjectItem = {
      isLoading: false,
      label: fstEditingProjItem,
      value: fstEditingProjItem,
    }
    setProjectoption(profileOptionsInit)
    setProfileItem(editingProfileItem)
    setProjectItem(initProjectItem)
    setShow(true)
  }

  const handleChangeProjItem = option => {
    setProjectItem(option)
  }

  const handleCreateProjItem = inputOption => {
    const newProfileOption = {
      label: inputOption,
      value: inputOption,
    }
    setIsLoading(true)
    setProjectoption([...projectOption, newProfileOption])
    setProjectItem(newProfileOption)
    setDeleteProjItem(false)
    setIsLoading(false)
  }

  const handleDeleteOption = data => {
    const deleteOption = projectOption.filter(x => x !== data)
    setProjectoption(deleteOption)
    setDeleteProjItem(true)
  }

  const { Option } = components
  const IconOption = props => (
    <div className={textStyles.root}>
      <Option {...props}>
        <span>{props.label}</span>
        <ClearSharpIcon onClick={() => handleDeleteOption(props.data)} />
      </Option>
    </div>
  )
  const handleCloseEditProfile = () => setShow(false)
  const handleSubmitEditProfileItem = values => {
    console.log(values)
  }
  useEffect(() => {
    if (isDeleteProjItem) {
      setProjectItem(projectOption[0])
    }
  }, [projectOption, isDeleteProjItem])

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
          'loading...'
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
        'loading...'
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
          <Box className={classes.boxStyle}>
            <Formik
              onSubmit={handleSubmitEditProfileItem}
              initialValues={{
                name: editingProfileItem?.name,
                position: editingProfileItem?.position,
                lead: editingProfileItem?.lead,
              }}
              validationSchema={Schema}
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
                  <form onSubmit={handleSubmit}>
                    <div>
                      <List
                        subheader={
                          <ListSubheader>edit profile form</ListSubheader>
                        }
                        className={textStyles.root}
                      ></List>
                      <TextField
                        className={textStyles.root}
                        fullWidth
                        id="profile-name"
                        name="name"
                        label="Profile Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={editingProfileItem?.name}
                        margin="dense"
                        InputProps={{
                          startAdornment: <PersonOutlineIcon />,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        className={textStyles.root}
                        fullWidth
                        id="position"
                        name="name"
                        label="Position"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={editingProfileItem?.position}
                        margin="dense"
                        InputProps={{
                          startAdornment: <GradeIcon />,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div>
                        <h5>Project</h5>
                      </div>
                      <CreatableSelect
                        isClearable
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        components={{ Option: IconOption }}
                        onChange={handleChangeProjItem}
                        onCreateOption={handleCreateProjItem}
                        options={projectOption}
                        value={selectedProjectItem}
                        // menuIsOpen={true}
                      />
                      <TextField
                        className={textStyles.root}
                        fullWidth
                        id="lead"
                        name="lead"
                        label="Leader"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={editingProfileItem?.lead}
                        margin="dense"
                        InputProps={{
                          startAdornment: <FlagIcon />,
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div className={classes.buttonSave}>
                        <Button
                          color="primary"
                          className={classNames(
                            classes.btnSubmit,
                            classes.marginComponentChid
                          )}
                          type="submit"
                          variant="outlined"
                        >
                          Save
                          <DoneIcon
                            sx={{ marginLeft: '0.7rem', width: '1rem' }}
                          />
                        </Button>
                      </div>
                    </div>
                  </form>
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
