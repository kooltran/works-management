import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './pages/Profile/Profile'
import Home from './pages/Home/Home'
import ProtectedRoute from './ProtectedRoute'

import './App.css'

const App = () => {
  return (
    <Container maxWidth="md">
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
    </Container>
  )
}

export default App
