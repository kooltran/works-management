import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './pages/Profile/Profile'
import Home from './pages/Home/Home'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
