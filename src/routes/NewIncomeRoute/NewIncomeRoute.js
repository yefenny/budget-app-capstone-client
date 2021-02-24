import React, { Component } from 'react';
import IncomeForm from '../../components/IncomeForm/IncomeForm';

class NewIncomeRoute extends Component {
  render() {
    return (
      <section>
        <IncomeForm history={this.props.history} />
      </section>
    );
  }
}

export default NewIncomeRoute;
