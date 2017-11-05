import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import '../styles/App.css';

import logoSrc from '../images/pillowcoin_logo.png'

class AppContainer extends Component {
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
          <div className="navHeaderRight">
            <NavLink activeClassName="navLinkActive" to="/login" className="navLink">
              <div className="navHeaderButtons">Login</div>
            </NavLink>
          </div>
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
