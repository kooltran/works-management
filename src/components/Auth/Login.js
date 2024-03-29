import React, { useState, useRef } from 'react'
import { object, string } from 'yup'
import { Button } from '@material-ui/core'
import { Formik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

import classNames from 'classnames'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LockIcon from '@mui/icons-material/Lock'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import EmailIcon from '@mui/icons-material/Email'
import LoginIcon from '@mui/icons-material/Login'

import { useAppContext } from '../../AppContext'
import useAuth from './useAuth'
import NotificationDialog from '../NotificationDialog/NotificationDialog'
import { isEmpty } from '../../helpers'
import UpdatingIcon from '../../images/updating.svg'
import S3corp from '../../images/logo.svg'
import imgBG from '../../images/backgroundLogin.jpg'

const Schema = object().shape({
  email: string()
    .matches(
      /^[a-zA-Z0-9!#$%&''*+/=?^_`{}~@."\-\s]*$/,
      'Please enter valid email address'
    )
    .email('Please enter valid email address')
    .max(64, 'Maximum of 64 characters are allowed for Email address')
    .required()
    .label('Email'),
  password: string()
    .required()
    .min(6, 'Password must be at least 6 characters'),
})

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  body: {
    backgroundImage: `url(${imgBG})`,
    width: '100%',
    height: '100vh',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    WebkitBackgroundSize: 'cover',
    color: '#FFFFFF',
    fontFamily: 'Quicksand, sans-serif',
    textAlign: 'center',
    MozBackgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  formLogin: {
    width: 350,
    backgroundColor: '#FFFFFF',
    margin: '0 auto',
    padding: '2rem',
    boxShadow: '10px 10px 120px 10px #97ddff9c',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    borderRadius: '1rem',
  },
  btnSubmit: {
    cursor: 'pointer',
    '&::before': {
      content: '',
      position: 'absolute',
      zIndex: 1,
      backgroundColor: '#ff7870',
    },
  },
  marginComponentChid: {
    margin: '1rem 0em',
  },
  imgLogin: {
    width: 200,
  },
  boxChildCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  boxChildEnd: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  textDanger: {
    color: 'red',
    padding: '15px',
  },
  iconMessage: {
    // fill: 'red'
  },
}))

export const useHelperTextStyles = makeStyles(() => ({
  root: {
    color: 'red !important',
  },
}))

const Login = () => {
  const formRef = useRef()
  const classes = useStyles()
  const helperTextClasses = useHelperTextStyles()
  const [showAlert, setShowAlert] = useState({})
  const {
    data: { auth },
  } = useAppContext()

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPwd = () => {
    setShowPassword(!showPassword)
  }

  const { submitLogin } = useAuth()

  const handleSubmitLogin = values => {
    submitLogin(values)
  }

  return (
    <div className={classes.body}>
      <Formik
        onSubmit={handleSubmitLogin}
        initialValues={{ email: '', password: '' }}
        validationSchema={Schema}
        innerRef={formRef}
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
            <div className={classes.formContainer}>
              <form className={classes.formLogin} onSubmit={handleSubmit}>
                <img className={classes.imgLogin} src={S3corp} alt="S3Login" />

                <div>
                  <Box
                    className={
                      touched.email && errors.email
                        ? classes.boxChildCenter
                        : classes.boxChildEnd
                    }
                  >
                    <div>
                      <EmailIcon sx={{ fill: '#0FCEC3', mr: 1, my: 0.5 }} />
                    </div>
                    <TextField
                      fullWidth
                      type="email"
                      id="login-email"
                      name="email"
                      label="Email"
                      defaultValue=""
                      helperText={touched.email && errors.email}
                      FormHelperTextProps={{
                        classes: {
                          root: helperTextClasses.root,
                        },
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="dense"
                      variant="standard"
                    ></TextField>
                  </Box>
                </div>
                <div className={classes.marginComponentChid}>
                  <Box
                    className={
                      touched.password && errors.password
                        ? classes.boxChildCenter
                        : classes.boxChildEnd
                    }
                  >
                    <div>
                      <LockIcon sx={{ fill: '#0FCEC3', mr: 1, my: 0.5 }} />
                    </div>
                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      id="login-password"
                      name="password"
                      label="Password"
                      defaultValue=""
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="dense"
                      variant="standard"
                      FormHelperTextProps={{
                        classes: {
                          root: helperTextClasses.root,
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleShowPwd} edge="end">
                              {showPassword ? (
                                <Visibility sx={{ fill: '#1da1f287' }} />
                              ) : (
                                <VisibilityOff sx={{ fill: '#1da1f287' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>
                  </Box>
                  <Box>
                    {
                      <div className={classes.textDanger}>
                        {auth?.data?.error_message}
                      </div>
                    }
                  </Box>
                </div>
                <Button
                  color="primary"
                  className={classNames(
                    classes.btnSubmit,
                    classes.marginComponentChid
                  )}
                  type="submit"
                  variant="outlined"
                  disabled={
                    !values.email ||
                    !values.password ||
                    auth.loading ||
                    !isEmpty(errors)
                  }
                >
                  Login
                  {auth.loading ? (
                    <img src={UpdatingIcon} alt="logining" />
                  ) : (
                    <LoginIcon sx={{ marginLeft: '0.7rem', width: '1rem' }} />
                  )}
                </Button>
              </form>
            </div>
          )
        }}
      </Formik>
      {showAlert.type && (
        <NotificationDialog
          {...showAlert}
          handleCloseDialog={() => {
            setShowAlert({})
          }}
        />
      )}
      <h3>{auth?.data?.error_message || auth?.fail}</h3>
    </div>
  )
}

export default Login
