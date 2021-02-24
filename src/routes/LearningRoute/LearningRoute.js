import React, { Component } from 'react';
import LearningPage from '../../components/LearningPage/LearningPage';

class LearningRoute extends Component {
  render() {
    return (
      <section>
        <LearningPage history={this.props.history} />
      </section>
    );
  }
}

export default LearningRoute;
