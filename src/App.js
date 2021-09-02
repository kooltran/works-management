import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

import './App.css'

const App = () => {
  return (
    <Container maxWidth="md">
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </div>
    </Container>
  )
}

export default App
