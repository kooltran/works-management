import React, { useState, useRef } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Formik } from 'formik'
import { object, string } from 'yup'
import Box from '@mui/material/Box'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import LoginIcon from '@mui/icons-material/Login'

import NotificationDialog from '../NotificationDialog/NotificationDialog'
import { isEmpty } from '../../helpers'
import { useAppContext } from '../../AppContext'
import { useStyles, useHelperTextStyles } from './Login'
import useAuth from './useAuth'
import classNames from 'classnames'

import S3corp from '../../images/logo.svg'
import UpdatingIcon from '../../images/updating.svg'

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

const Register = () => {
  const classes = useStyles()
  const helperTextClasses = useHelperTextStyles()
  const [showAlert, setShowAlert] = useState({})
  const formRef = useRef()
  const {
    data: { auth },
  } = useAppContext()

  const [showPassword, setShowPassword] = useState(false)

  const handleClick = () => {
    setShowPassword(!showPassword)
  }

  const { submitRegister } = useAuth()

  const handleSubmitRegister = values => {
    submitRegister(values)
  }

  return (
    <div className={classes.body}>
      <Formik
        onSubmit={handleSubmitRegister}
        initialValues={{ email: '', password: '' }}
        validationSchema={Schema}
        innerRef={formRef}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          errors,
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
                      id="register-email"
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
                      id="register-password"
                      name="password"
                      label="Password"
                      defaultValue=""
                      helperText={touched.password && errors.password}
                      FormHelperTextProps={{
                        classes: {
                          root: helperTextClasses.root,
                        },
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="dense"
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClick} edge="end">
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
                        {auth?.data?.user?.error_message}
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
                  Register
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
      <h4>{auth.data?.error_message}</h4>
    </div>
  )
}

export default Register
