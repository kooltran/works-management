import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { getRole } from './helpers'

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const role = getRole()
  console.log(role, 'role')
  return (
    <Route
      {...restOfProps}
      render={props =>
        role ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default ProtectedRoute
