import React, { Component } from 'react';
import FormatService from '../../services/format-service';

class Word extends Component {
  static defaultProps = {
    word: {}
  };
  render() {
    const { original, correct_count, incorrect_count } = this.props.word;
    return (
      <div className='word-container'>
        <h4 lang='fr'>{FormatService.firstUpperCaser(original)}</h4>
        <span>Correct answer count: {correct_count}</span>
        <span>Incorrect answer count: {incorrect_count}</span>
      </div>
    );
  }
}

export default Word;
