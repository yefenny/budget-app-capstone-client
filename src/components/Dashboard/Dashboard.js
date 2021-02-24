import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/incomes-service';
import Word from '../Word/Word';

class Dashboard extends Component {
  static defaultProps = {
    history: () => {}
  };
  static contextType = UserContext;

  state = { language: {}, words: [], error: null };

  componentDidMount = () => {
    // LanguageService.getLanguage()
    //   .then((res) => {
    //     const { language, words } = res;
    //     this.context.setLanguage(language);
    //     this.context.setWords(words);
    //     this.setState({
    //       words: this.context.words,
    //       language: this.context.language
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({ error });
    //     this.context.setError(error);
    //   });
  };
  handleStart = () => {
    this.props.history.push('/learn');
  };
  render() {
    const { language, words } = this.state;
    const listWords = words.map((word) => {
      return (
        <li key={word.id}>
          <Word word={word} />{' '}
        </li>
      );
    });
    return (
      <div className='dashboard-container'>
        {/* <h2>{language.name}</h2>
        <button onClick={this.handleStart}>Start practicing</button>
        <h3>Words to practice</h3>
        <ul> {listWords}</ul>

        <span className='total-score'>
          Total correct answers: {language.total_score}
        </span> */}
      </div>
    );
  }
}

export default Dashboard;
