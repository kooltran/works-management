import React, { useEffect, useState, useRef } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Formik } from 'formik'
import { object, string } from 'yup'
import Select from 'react-select'
import NotificationDialog from '../../components/NotificationDialog/NotificatinoDialog'

import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
} from '../../actions/profileAction'
import { getProfile } from '../../api/profileAPI'
import { isEmpty } from '../../helpers'
import { useAppContext } from '../../AppContext'

import useAuth from './useAuth'

const Schema = object().shape({
  // name: string().required().min(6, 'Name must be at least 6 characters'),
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
  const [showAlert, setShowAlert] = useState({})
  const formRef = useRef()

  const {
    data: {
      auth,
      profile: {
        get: { data: profileData = {}, loading, fail },
      },
    },
    dispatch,
  } = useAppContext()

  const profileOptions =
    profileData?.map(item => ({
      value: item.email,
      label: item.name,
    })) || []

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

  const { submitRegister } = useAuth()

  const handleSubmitRegister = values => {
    submitRegister(values)
  }

  const handleChangeName = option => {
    const { setFieldValue } = formRef.current
    if (option) {
      setFieldValue('email', option.value)
      setFieldValue('name', option.label)
    }
  }

  useEffect(() => {
    getProfileList()
  }, [])

  return (
    <>
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
          const checkError = name => {
            if (touched[name]) {
              return !!errors[name]
            }
          }
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Please select your name"
                  isDisabled={loading}
                  isLoading={loading}
                  isClearable={true}
                  isSearchable={true}
                  name="email"
                  options={profileOptions}
                  onChange={handleChangeName}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="password"
                  error={checkError('password')}
                  id="input-password"
                  name="password"
                  label="password"
                  defaultValue=""
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="dense"
                />
              </div>
              <Button
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
              </Button>
            </form>
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
    </>
  )
}

export default Register
