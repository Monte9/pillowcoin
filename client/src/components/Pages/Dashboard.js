import React, { Component } from 'react';
import contract from 'truffle-contract'

import AppContainer from '../AppContainer'
import DashboardStats from '../Shared/DashboardStats'

import getWeb3 from '../../utils/getWeb3'
import pillowcoin_artifacts from '../../money/build/contracts/Pillowcoin.json'
import logoSrc from '../../images/pillowcoin_logo.png'

let PillowcoinContract = contract(pillowcoin_artifacts)

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      account: '',
      account_balance: -1,
      total_coins: -1,
      web3: null
    }
  }

  componentDidMount() {
    // Get initial balances of account
    var account = null;
    var account_balance = -1;
    var total_coins = -1;

    // Get network provider and web3 instance.
    getWeb3.then(results => {
      // Get MetaMask account
      results.web3.eth.getAccounts((err, accounts) => {
        if (accounts.length <= 0) {
          console.log('No accounts found. MetaMask might be locked!')
          return
        }

        account = accounts[0]
        let coin = null

        // Initialize contract with web3 instance
        PillowcoinContract.setProvider(results.web3.currentProvider)

        // Get total supply for contract tokens (Pillowcoins)
        PillowcoinContract.deployed().then(instance => {
          coin = instance
          return coin.totalSupply()
        }).then(totalSupply => {
          total_coins = totalSupply.toNumber()
          return coin.balanceOf(account)
        }).then(balance => {
          account_balance = balance.toNumber();

          this.setState({
            account,
            account_balance,
            total_coins,
            web3: results
          })
        })
      })
    }).catch((error) => {
      console.log("Error finding web3 or failed to get account/total supply/balance from web3.\nPlease try again.")
    })
  }

  render() {
    const { total_coins } = this.state

    return (
      <AppContainer>
        <div className="dashboardContainer">
          <DashboardStats total_coins={total_coins} user_count={0} />
          <div className="dashboardSecondaryView">
            <div className="dashboardDetailsView">
              <div className="dashboardDetailsHeaderView">
                <div className="dashboardDetailsHeaderLabel">
                  Your Account
                </div>
              </div>
              <div className="dashboardDetailsAccountView">
                <img className="dashboardDetailsAccountLogo"
                  src={logoSrc}
                  alt="Pillowcoin logo"
                />
                <div className="dashboardDetailsAccountName">Pillowcoin</div>
                <div className="dashboardDetailsAccountValueView">
                  <div className="dashboardDetailsAccountValueLabel">0.0000 PLC</div>
                  <div className="dashboardDetailsAccountValueLabel gray2">$0.00</div>
                </div>
              </div>
              <div className="dashboardDetailsPaymentView">
                <div className="dashboardDetailsPaymentType">
                  <div className="paymentButton"
                    onClick={() => console.log("Send Pillowcoin")}>
                    <i className="icon ion-ios-paperplane buttonIcon" aria-hidden="true"></i>
                    Send
                  </div>
                </div>
                <div className="dashboardDetailsPaymentType">
                  <div className="paymentButton blue"
                    onClick={() => console.log("Receive Pillowcoin")}>
                    <i className="icon ion-qr-scanner buttonIcon" aria-hidden="true"></i>
                    Receive
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboardDetailsView">
              <div className="dashboardDetailsHeaderView">
                <div className="dashboardDetailsHeaderLabel">
                  Recent Activity
                </div>
              </div>
              <div className="dashboardDetailsActivityView">
                <h3 className="gray3">No recent activities</h3>
                <h5 className="activitySubtitle">Send or receive Pillowcoins to get started.</h5>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    );
  }
}
