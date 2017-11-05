import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import Typography from 'material-ui/Typography';

import AppContainer from '../AppContainer'

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      errorMessage: '',
      errors: {}
    };
  }

  processForm(event) {
    console.log('====================================');
    console.log("form submitted");
    console.log('====================================');
  }

  render() {
    return (
      <AppContainer>
        <div className="loginContainer">
          <Card className="signupCard">
            <form action="/" className="formContainer" onSubmit={this.processForm.bind(this)}>
              <div className="loginTitle">SIGN UP</div>

              {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

              <div className="inputContainer">
                <TextField
                  id="name"
                  label="Name"
                  className="field-line"
                  margin="normal"
                  errorText={this.state.errors.name}
                />
                <TextField
                  id="email"
                  label="Email"
                  className="field-line"
                  type="email"
                  autoComplete="current-email"
                  margin="normal"
                  errorText={this.state.errors.email}
                />
                <TextField
                  id="password"
                  label="Password"
                  className="field-line"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  errorText={this.state.errors.password}
                />
              </div>

              <div className="buttonContainer">
                <Button raised type="submit" color="primary" className="signupButton">
                  Create New Account
                </Button>
              </div>

              <div>Already have an account? <Link to={`/login`}>Log in</Link></div>
            </form>
          </Card>
        </div>
      </AppContainer>
    );
  }
}

export default Signup;
