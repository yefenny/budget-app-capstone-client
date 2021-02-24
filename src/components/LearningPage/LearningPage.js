import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import LanguageService from '../../services/incomes-service';

class LearningPage extends Component {
  static defaultProps = {
    history: () => {}
  };
  static contextType = UserContext;

  state = {
    currentWord: {},
    error: null,
    answered: false,
    guess: '',
    response: {}
  };

  componentDidMount = () => {
    LanguageService.getWord()
      .then((currentWord) => {
        this.setState({
          currentWord
        });
        this.context.setCurrentWord(currentWord);
      })
      .catch((error) => {
        this.setState({ error });
        this.context.setError(error);
      });
  };

  handleChange = (e) => {
    this.setState({
      guess: e.target.value
    });
  };
  handleSubmit = async (e) => {
    const { guess } = this.state;
    e.preventDefault();
    if (guess.trim() === '') {
      this.setState({
        error: 'Insert your translation',
        guess: ''
      });
      return;
    }
    this.setState({
      error: null
    });
    await LanguageService.postGuess({ guess })
      .then(async (response) => {
        if (response) {
          await this.setState({
            answered: true,
            response
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: error.error
        });
      });
  };

  handleNextWord = async () => {
    await this.setState({
      answered: false,
      currentWord: this.state.response,
      response: {},
      guess: ''
    });
  };

  renderFeedback = () => {
    const { response, guess, currentWord } = this.state;
    let text;
    if (response.isCorrect) text = 'You were correct! :D';
    else text = 'Good try, but not quite right :(';
    return (
      <div className='feedback-container'>
        <h2>{text}</h2>
        <div className='DisplayFeedback'>
          {' '}
          <p>
            The correct translation for{' '}
            <span lang='fr'>{currentWord.nextWord} </span>was {response.answer}{' '}
            and you chose {guess}!
          </p>
        </div>
        <button onClick={this.handleNextWord}>Try another word!</button>
        <div className='DisplayNextWord'>
          <h3>
            Next word: <span lang='fr'>{response.nextWord}</span>
          </h3>
          <span>
            You have answered this word correctly {response.wordCorrectCount}{' '}
            times.
          </span>
          <span>
            You have answered this word incorrectly{' '}
            {response.wordIncorrectCount} times.
          </span>
        </div>
        <div className='DisplayScore'>
          {' '}
          <p>Your total score is: {response.totalScore}</p>
        </div>
      </div>
    );
  };

  learnRender = () => {
    const { currentWord, guess, error } = this.state;
    return (
      <div className='learning-container'>
        <h2>Translate the word:</h2>
        <span className='next-word' lang='fr'>
          {currentWord.nextWord}
        </span>

        <form
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <div className='error'>
            <span>{error && error}</span>
          </div>
          <label htmlFor='learn-guess-input'>
            What's the translation for this word?
          </label>
          <input
            type='text'
            id='learn-guess-input'
            name='learn-guess-input'
            required
            value={guess}
            onChange={(e) => {
              this.handleChange(e);
            }}
          />
          <button type='submit'>Submit your answer</button>
        </form>
        <div className='answer-count'>
          <span>
            You have answered this word correctly {currentWord.wordCorrectCount}{' '}
            times.
          </span>
          <span>
            You have answered this word incorrectly{' '}
            {currentWord.wordIncorrectCount} times.
          </span>
        </div>
        <p>Your total score is: {currentWord.totalScore}</p>
      </div>
    );
  };

  render() {
    const { answered } = this.state;
    const content = answered ? this.renderFeedback() : this.learnRender();
    return content;
  }
}

export default LearningPage;
