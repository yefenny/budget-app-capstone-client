import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardRoute extends Component {
  render() {
    return (
      <section>
        <Dashboard history={this.props.history} />
      </section>
    );
  }
}

export default DashboardRoute;
