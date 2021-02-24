import React, { Component } from 'react';
import IncomesPage from '../../components/IncomesPage/IncomesPage';


class IncomesRoute extends Component {
  render() {
    return (
      <section>
        <IncomesPage history={this.props.history} />
      </section>
    );
  }
}

export default IncomesRoute;
