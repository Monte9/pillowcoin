import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

import AppContainer from '../AppContainer'

import getWeb3 from '../../utils/getWeb3'
import employees from '../../utils/employee'
import Auth from '../../modules/Auth';

import MainEthereumNetworkImage from '../../images/main-network.png'
import LockedMetaMaskImage from '../../images/pillowcoin_logo_locked.png'

// metamask_status
// -1: loading
// 0: No MetaMask installed
// 1: Installing MetaMask
// 2: MetaMask is locked
// 3: Wallet accessible

// network status
// 0: mainnet
// 1: deprecated morden network
// 1: ropsten test network
// 1: localhost network

export default class MetaMask extends Component {
  constructor() {
    super();

    this.state = {
      metamask_status: -1,
      network: {
        message: 'No network detected',
        status: -1
      },
      web3: null,
      account: '',
      email: '',
      name: '',
      profile_image: '',
      title: '',
      index: 0
    }
  }

  componentDidMount() {
    const { history } = this.props

    if (Auth.isUserAuthenticated()) {
      history.replace('/dashboard');
    }

    // Get network provider and web3 instance.
    getWeb3.then(results => {

      // Check if MetaMask is installed
      if (results.web3.currentProvider.isMetaMask !== true) {
        this.setState({
          metamask_status: 0
        })
        return
      }

      // Check if MetaMask is unlocked, i.e. accounts accessible
      results.web3.eth.getAccounts((err, accounts) => {
        if (accounts.length <= 0) {
          this.setState({
            metamask_status: 2
          })
          return
        }

        this.setState({
          account: accounts[0],
          metamask_status: 3
        })
      })

      // Check which network MetaMask is connected to
      results.web3.version.getNetwork((err, netId) => {
        let network = {}

        switch (netId) {
          case "1":
            network = {
              message: 'This is the Ethereum mainnet',
              status: 0
            }
            break
          case "3":
            network = {
              message: 'This is the Ropsten testnet',
              status: 1
            }
            break
          case "42":
            network = {
              message: 'This is the Kovan public testnet',
              status: 2
            }
            break
          case "4":
            network = {
              message: 'This is the Rinkeby geth testnet',
              status: 3
            }
            break
          default:
            network = {
              message: 'This is the localhost network',
              status: 4
            }
        }

        this.setState({
          network
        })
      })

      this.setState({
        web3: results
      })
    })
    .catch(() => {
      console.log('Error finding web3. Please try again.')
    })

    const { index } = this.state

    this.setState({
      profile_image: employees[index].photo,
      title: employees[index].department,
    })
  }

  switchToMainNetworkMessage(message) {
    return (
      <div className="metaMaskContainer">
        <div className="metaMaskView">
          <h2>Oops, you’re on the wrong network</h2>
          <h4>Simply open MetaMask and switch over to the <strong>Main Ethereum Network.</strong></h4>
          <h6>{message}</h6>
          <img className="mainNetworkImage" src={MainEthereumNetworkImage} alt="MetaMask Main Network" />
        </div>
      </div>
    )
  }

  loadingView() {
    return (
      <div className="metaMaskContainer">
        <div className="metaMaskView">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  displayNoMetaMaskInstalled() {
    return (
      <div className="metaMaskContainer">
        <div className="metaMaskView">
          <h2>Wanna join?</h2>
          <h4>You’ll need a safe place to store all of your <strong>Pillowcoins!</strong> The perfect place is in a secure wallet like <strong>MetaMask.</strong> This will also act as your login to this website (no extra password needed).</h4>
          <div className="metaMaskButtonContainer">
            <a className="metaMaskButton"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => this.setState({ metamask_status: 1 })}
            >
              Install MetaMask
            </a>
          </div>
        </div>
      </div>
    )
  }

  _onReadyYoutube(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  displayMetaMaskYoutubeTutorial() {
    const opts = {
      height: window.innerWidth > 700 ? '390' : '312',
      width: window.innerWidth > 700 ? '640' : '324',
      playerVars: {
        autoplay: 0
      }
    };

    return (
      <div className="youtubeContainer">
        <YouTube
          videoId="tfETpi-9ORs"
          opts={opts}
          onReady={this._onReady}
        />
      </div>
    );
  }

  displayInstallingMetaMask() {
    return (
      <div className="metaMaskContainer">
        <div className="metaMaskView">
          <h2>Finish installing MetaMask to continue</h2>
          <h4>Make sure you follow the instructions on MetaMask to finish the installation.</h4>
          <div className="metaMaskButtonContainer">
            <div className="metaMaskButton installed" onClick={() => window.location.reload()}>
              I installed MetaMask
            </div>
          </div>
          {this.displayMetaMaskYoutubeTutorial()}
        </div>
      </div>
    )
  }

  displayUnlockeMetaMask() {
    const { status, message } = this.state.network

    if (status !== 0) {
      return this.switchToMainNetworkMessage(message)
    } else {
      return (
        <div className="metaMaskContainer">
          <div className="metaMaskView">
            <h2>Your MetaMask is locked</h2>
            <h4>Simply open MetaMask and follow the instructions to unlock it.</h4>
            <img className="lockedMetaMaskImage" src={LockedMetaMaskImage} alt="Locked MetaMask" />
          </div>
        </div>
      )
    }
  }

  submitSignIn(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    let self = this;
    let history = this.props.history;

    const userName = this.state.name;
    const userEmail = this.state.email;
    const userPassword = this.state.account;
    const userProfileImage = this.state.profile_image;
    const userTitle = this.state.title;

    // create a string for an HTTP body message
    let user = 'name=' + encodeURIComponent(userName)
      + '&email=' + encodeURIComponent(userEmail)
      + '&password=' + encodeURIComponent(userPassword)
      + '&image=' + encodeURIComponent(userProfileImage)
      + '&title=' + encodeURIComponent(userTitle);

    // create an AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signin');
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

        // save the token
        Auth.authenticateUser(this.response.token);

        //save the user's email to the localStorage
        localStorage.setItem('email', userEmail);

        history.replace('/dashboard')
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

  toggleProfileImage() {
    const { index } = this.state
    const updated_index = index + 1 < employees.length ? index + 1 : 0

    this.setState({
      index: updated_index,
      profile_image: employees[updated_index].photo,
      title: employees[updated_index].department,
    })
  }

  displaySignInView() {
    const { account, email, name, network, profile_image, title, index, errors, errorMessage } = this.state
    const { status, message } = network

    if (status !== 0) {
      return this.switchToMainNetworkMessage(message)
    } else {
      console.log('====================================');
      console.log(this.state);
      console.log('====================================');

      return (
        <div className="metaMaskContainer">
          <div className="metaMaskView">
            <h2>And finally...</h2>
            <h4>We need an email address for your account.</h4>
            <div className="profileImageContainer">
              <img className="profileImage"
                src={profile_image}
                onClick={this.toggleProfileImage.bind(this)}
                alt={name}
              />
              <h6>{title}<br />{index + 1} / {employees.length}
              </h6>
            </div>
            <div className="inputContainer">
              <div className="inputContainerInner">
                <div className="inputGroupContainer">
                  <div className="inputGroupLabel">Wallet address</div>
                  <input type="text" id="address" name="address"
                    className="inputGroupInput readOnly"
                    placeholder="Wallet Address" value={account} maxLength="100"
                    onChange={(event) => this.setState({ account: event.target.value })}
                    readOnly
                  />
                  {errors && errors.password && <div className="inputGroupErrorLabel">{errors.password}</div>}
                </div>
                <div className="inputGroupContainer">
                  <div className="inputGroupLabel">Email</div>
                  <input type="email" id="email" name="email"
                    className="inputGroupInput"
                    placeholder="e.g.: unicorn@pillow.com" value={email} maxLength="70"
                    onChange={(event) => this.setState({ email: event.target.value })}
                  />
                  {errors && errors.email && <div className="inputGroupErrorLabel">{errors.email}</div>}
                </div>
                <div className="inputGroupContainer">
                  <div className="inputGroupLabel">Name</div>
                  <input type="text" id="name" name="name"
                    className="inputGroupInput"
                    placeholder="e.g.: Pillow Unicorn" value={name} maxLength="30"
                    onChange={(event) => this.setState({ name: event.target.value })}
                  />
                  {errors && errors.name && <div className="inputGroupErrorLabel">{errors.name}</div>}
                </div>
              </div>
              <div className="metaMaskNoteContainer">
                <div className="metaMaskNoteLabel">
                  Make sure to save your MetaMask login information and account recovery details! We can’t help you regain access if you lose it.
                </div>
              </div>
              <div className="metaMaskButtonContainer">
                {errorMessage && <div className="inputGroupErrorLabel">{errorMessage}</div>}
                <div className="metaMaskButton installed" onClick={this.submitSignIn.bind(this)}>
                  Save account info
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  displayMetaMaskMessage() {
    const { metamask_status } = this.state

    switch(metamask_status) {
      case -1:
        return this.loadingView()
      case 0:
        return this.displayNoMetaMaskInstalled()
      case 1:
        return this.displayInstallingMetaMask()
      case 2:
        return this.displayUnlockeMetaMask()
      case 3:
        return this.displaySignInView()
      default:
        return this.displaySignInView()
    }
  }

  render() {
    return (
      <AppContainer>
        {this.displayMetaMaskMessage()}
      </AppContainer>
    );
  }
}
