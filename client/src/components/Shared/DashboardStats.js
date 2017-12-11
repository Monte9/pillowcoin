import React, { Component } from 'react';

export default class DashboardStats extends Component {
  render() {
    const { current_price, total_coins, user_count, stats } = this.props

    return (
      <div className="dashboardMainViewContainer">
        <div className="dashboardMainView">
          <div className="dashboardMainTopView">
            <div className="dashboardMainTopInfoView">
              <h2 className="customLineHeight gray3">${current_price}</h2>
              <h10>Pillowcoin price</h10>
            </div>
            <div className="dashboardMainTopInfoView borderLeftRight">
              <h2 className="customLineHeight gray3">{total_coins}</h2>
              <h10>Total pillowcoins</h10>
            </div>
            <div className="dashboardMainTopInfoView">
              <h2 className="customLineHeight gray3">{user_count}</h2>
              <h10>Users</h10>
            </div>
          </div>
          <div className="dashboardMainBottomView gray3">
            <h7>{stats ? 'Stats Available' : 'Stats coming soon...'}</h7>
          </div>
        </div>
      </div>
    );
  }
}

DashboardStats.defaultProps = {
  current_price: 0,
  total_coins: 0,
  user_count: 0,
  stats: null
}
