import React, { Component } from 'react';

import AppContainer from '../AppContainer'

import Auth from '../../modules/Auth';

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      secretData: '',
      email: localStorage.getItem('email'),
      name: ''
    };
  }

  componentDidMount() {
    let self = this;

    // create a string for an HTTP body message
    let email = 'email=' + encodeURIComponent(this.state.email);

    let xhr = new XMLHttpRequest();
    xhr.open('post', '/api/dashboard');

    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', 'bearer ' + Auth.getToken());
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.responseType = 'json';

    xhr.onload = function () {
      let state = {};

      if (this.status === 200) {
        state.secretData = this.response.message;
        state.user = this.response.user
        self.setState(state);
      } else {
        console.log("Login failed")
      }
    };
    xhr.send(email);
  }

  render() {
    const { secretData } = this.state;

    return (
      <AppContainer>
        {secretData ? (
          <div>
            <div>Dashboard</div>
            <div>{this.state.email}</div>
          </div>
        ) : (
            <div>Dashboard loading...</div>
          )}
      </AppContainer>
    );
  }
}
