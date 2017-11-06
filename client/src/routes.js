import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../src/components/Pages/Home'
import Dashboard from '../src/components/Pages/Dashboard'
import Login from '../src/components/Pages/Login'
import Signup from '../src/components/Pages/Signup'
import NotFound from '../src/components/Pages/NotFound'

const Routes = (props) => {
  return (
    <Router {...props}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={(props) => <Home redirect="logout" {...props}/>} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes;
