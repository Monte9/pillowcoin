import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../src/components/Pages/Home'
import Dashboard from '../src/components/Pages/Dashboard'
import SignIn from '../src/components/Pages/SignIn'
import Account from '../src/components/Pages/Account'

const Routes = (props) => {
  return (
    <Router {...props}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/sign-in" component={SignIn} />

        <Route path="/account" component={Account} />
        <Route path="/logout" component={(props) => <Home redirect="logout" {...props} />} />

        <Route component={Home} />
      </Switch>
    </Router>
  )
}

export default Routes;
