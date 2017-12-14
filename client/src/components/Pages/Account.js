import React, { Component } from 'react';

import AppContainer from '../AppContainer'

import Auth from '../../modules/Auth'

const UnicornProfileImage = "https://i.imgur.com/8j0JUUQ.png"

export default class Account extends Component {
  componentDidMount() {
    const { history } = this.props

    if (!Auth.isUserAuthenticated()) {
      history.replace('/sign-in');
    }
  }

  render() {
    return (
      <AppContainer {...this.props}>
        <div className="accountContainer">
          <div className="accountDetailsContainer">
            <div className="accountProfileImageContainer">
              <img className="profileImage"
                src={UnicornProfileImage}
                alt={"Unicorn profile picture"}
              />
            </div>
            <div className="accountNameContainer">
              <h3 className="accountNameLabel">Monte Thakkar</h3>
              <div className="accountAddressLabel">Copy address</div>
            </div>
          </div>
        </div>
      </AppContainer>
    );
  }
}
