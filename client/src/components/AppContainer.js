import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Auth from '../modules/Auth';

import '../styles/App.css';

import logoSrc from '../images/pillowcoin_logo.png'
const UnicornProfileImage = "https://i.imgur.com/8j0JUUQ.png"

class AppContainer extends Component {
  constructor() {
    super();
    localStorage.setItem('successMessage', '');
  }

  render() {
    return (
      <div className="AppContainer">
        <div className="navHeaderWrapper">
          <NavLink activeClassName="navLinkActive" to="/" className="navHeaderLeft">
            <img className="navHeaderLogoImage"
              src={logoSrc}
              alt="Pillowcoin logo"
            />
            <div className="navHeaderTitle">
              pillowcoin
            </div>
          </NavLink>
          {Auth.isUserAuthenticated() ? (
            <div className="navHeaderRight">
              {this.props.location && this.props.location.pathname === '/dashboard' ?
                <NavLink activeClassName="navLinkActive" to="/account" className="navLink">
                  <img className="navHeaderButtons navHeaderAccountImage"
                    src={UnicornProfileImage}
                    alt={"Unicorn profile picture"}
                  />
                </NavLink> :
                <NavLink activeClassName="navLinkActive" to="/dashboard" className="navLink">
                  <div className="navHeaderButtons">dash</div>
                </NavLink>
              }
              <NavLink activeClassName="navLinkActive" to="/logout" className="navLink">
                <div className="navHeaderButtons">logout</div>
              </NavLink>
            </div>
            ) : (
            <div className="navHeaderRight">
              <NavLink activeClassName="navLinkActive" to="/sign-in" className="navLink">
                <div className="navHeaderButtons">Sign in</div>
              </NavLink>
            </div>
          )}
        </div>
        <div className="appContent">
          {this.props.children}
        </div>
        <div className="footerWrapper">
          <div className="footerContainer">
            <div className="footerCompany">
              <img className="footerLogoImage"
                src={logoSrc}
                alt="Pillowcoin logo"
              />
              <div className="footerTitle">
                pillowcoin
              </div>
            </div>
            <div className="footerMyName">
              Monte Thakkar ©2017
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppContainer
