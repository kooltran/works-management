import React from 'react'
import { object, string } from 'yup'
import { TextField, Button } from '@material-ui/core'
import { Formik } from 'formik'

import { useAppContext } from '../../AppContext'
import useAuth from './useAuth'
import { isEmpty } from '../../helpers'

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

const Login = () => {
  const {
    data: { auth },
  } = useAppContext()

  const { submitLogin } = useAuth()

  const handleSubmitLogin = values => {
    submitLogin(values)
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmitLogin}
        initialValues={{ email: '', password: '' }}
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
          const checkError = name => {
            if (touched[name]) {
              return !!errors[name]
            }
          }

          return (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  fullWidth
                  error={checkError('email')}
                  id="input-email"
                  name="email"
                  label="Email"
                  defaultValue=""
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="dense"
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
                Login
              </Button>
            </form>
          )
        }}
      </Formik>
      <h3>{auth?.data?.error_message || auth?.fail}</h3>
    </>
  )
}

export default Login
