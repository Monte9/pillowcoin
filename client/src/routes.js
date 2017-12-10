import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../src/components/Pages/Home'
import Dashboard from '../src/components/Pages/Dashboard'
import SignIn from '../src/components/Pages/SignIn'

import Signup from '../src/components/Pages/Signup'
import Login from '../src/components/Pages/Login'

import NotFound from '../src/components/Pages/NotFound'

const Routes = (props) => {
  return (
    <Router {...props}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/logout" component={(props) => <Home redirect="logout" {...props} />} />

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes;
