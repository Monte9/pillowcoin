import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Card from 'material-ui/Card';
import Button from 'material-ui/Button';
import { TextField } from 'material-ui';
import { FormHelperText } from 'material-ui/Form';

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
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let self = this;
    let history = this.props.history;

    const userName = this.state.name;
    const userEmail = this.state.email;
    const userPassword = this.state.password;

    // create a string for an HTTP body message
    let user = 'name=' + encodeURIComponent(userName)
      + '&email=' + encodeURIComponent(userEmail)
      + '&password=' + encodeURIComponent(userPassword);

    // create an AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.onload = function () {
      let state = {};

      if (this.status === 200) {
        // success
        state.errorMessage = '';
        state.errors = {};

        // change the component state
        self.setState(state);

        // set a message
        localStorage.setItem('successMessage', this.response.message);

        // change the current URL to /
        history.replace('/login')
      } else {
        // failure
        state.errorMessage = this.response.message;
        state.errors = this.response.errors ? this.response.errors : {};

        // change the component state
        self.setState(state);
      }
    };
    xhr.send(user);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <AppContainer>
        <div className="loginContainer">
          <Card className="signupCard">
            <form action="/" className="formContainer" onSubmit={this.processForm.bind(this)}>
              <div className="loginTitle">SIGN UP</div>

              {this.state.errorMessage && <p className="errorMessage">{this.state.errorMessage}</p>}

              <div className="inputContainer">
                <TextField
                  id="name"
                  label="Name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  className="field-line"
                  margin="normal"
                  error={this.state.errors.name}
                />
                <FormHelperText className="errorMessage">{this.state.errors.name}</FormHelperText>

                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  autoComplete="current-email"
                  className="field-line"
                  margin="normal"
                  error={this.state.errors.email}
                />
                <FormHelperText className="errorMessage">{this.state.errors.email}</FormHelperText>

                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  autoComplete="current-password"
                  className="field-line"
                  margin="normal"
                  error={this.state.errors.password}
                />
                <FormHelperText className="errorMessage">{this.state.errors.password}</FormHelperText>
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
