import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { format } from 'date-fns';
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
      <section>
        <div className='dashboard-container'>
          <h2>{format(new Date(), 'MMMM')}</h2>

          <p>Month starting balance: 0.00</p>
          <div className='dashboard-incomes'>
            <p>Incomes: $ 3,000.00</p>
          </div>
          <div className='dashboard-expenses'>
            <p>Expenses: $ 2,000.00</p>
          </div>
          <div className='dashboard-current'>
            <p>Current balance: $ 2,000.00</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
