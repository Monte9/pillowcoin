import React, { Component } from 'react';

import AppContainer from '../AppContainer'

import logoSrc from '../../images/pillowcoin_logo.png'

export default class NotFound extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

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
        {passwords.length ? (
          <div>
            <h1>5 Passwords</h1>
            <ul className="passwords">
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </AppContainer>
    );
  }
}
