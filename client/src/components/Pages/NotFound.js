import React, { Component } from 'react';

import AppContainer from '../AppContainer'

export default class NotFound extends Component {
  render() {
    return (
      <AppContainer>
        <div className="NotFoundContainer">
          You are too ambitious! <span role="img" aria-label="Grimacing">😬</span> This page doesn't exits yet.
        </div>
      </AppContainer>
    );
  }
}
