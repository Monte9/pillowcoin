import React, { Component } from 'react';

import AppContainer from '../AppContainer'

import Auth from '../../modules/Auth'

import logoSrc from '../../images/pillowcoin_logo.png'

export default class Home extends Component {
  componentDidMount() {
    const { redirect, history } = this.props

    switch(redirect) {
      case 'logout':
        Auth.deauthenticateUser();
      default:
        if (Auth.isUserAuthenticated()) {
          history.replace('/dashboard');
        } else {
          history.replace('/');
        }
    }
  }

  render() {
    return (
      <AppContainer>
        <div className="headerWrapper">
          <div className="headerContainer">
            <div className="headerLogo">
              <img className="headerLogoImage"
                src={logoSrc}
                alt="Pillowcoin logo"
              />
            </div>
            <div className="headerTitle">
              pillowcoin
            </div>
            <div className="headerSubtitle">
              Pillow's own cryptocurrency
            </div>
          </div>
        </div>
      </AppContainer>
    );
  }
}
