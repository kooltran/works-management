import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { isEmpty } from '../../helpers'
import { useAppContext } from '../../AppContext'

import useAuth from './useAuth'

const Schema = object().shape({
  name: string().required().min(6, 'Name must be at least 6 characters'),
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
  const {
    data: { auth },
  } = useAppContext()

  const { submitRegister } = useAuth()

  const handleSubmitRegister = values => {
    submitRegister(values)
  }

  return (
    <>
      <Formik
        onSubmit={handleSubmitRegister}
        initialValues={{ email: '', password: '' }}
        validationSchema={Schema}
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
                <TextField
                  fullWidth
                  error={checkError('name')}
                  id="input-name"
                  name="name"
                  label="Name"
                  defaultValue=""
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="dense"
                />
              </div>
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
                  !values.name ||
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
      <h4>{auth.data?.error_message}</h4>
    </>
  )
}

export default Register
