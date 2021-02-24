import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { format } from 'date-fns';
import IncomesService from '../../services/incomes-service';
import Income from '../Income/Income';

class IncomesPage extends Component {
  static defaultProps = {
    history: () => {}
  };
  static contextType = UserContext;

  state = {
    incomes: [],
    error: null,
    fromDate: format(new Date(), 'yyyy-MM-dd'),
    toDate: format(new Date(), 'yyyy-MM-dd')
  };

  componentDidMount() {
    this.getAllIncomes();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit(e) {
    const { fromDate, toDate } = this.state;
    e.preventDefault();

    IncomesService.filterIncomes(fromDate, toDate)
      .then((incomes) => {
        this.setState({
          incomes
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: error.error
        });
      });
  }
  getAllIncomes() {
    IncomesService.getIncomes()
      .then((incomes) => {
        if (incomes) {
          this.setState({
            incomes
          });
        }
      })
      .catch((error) => {
        this.setState({
          error: error.error
        });
      });
  }

  handleAll = () => {
    this.getAllIncomes();
  };
  render() {
    const { error, incomes, fromDate, toDate } = this.state;
    const items = incomes.map((val) => {
      return (
        <li key={val.id}>
          <Income object={val} />
        </li>
      );
    });
    return (
      <div className='list-container'>
        <div className='title-add'>
          <h2>Incomes</h2>
          <button
            type='button'
            className='add-income'
            onClick={() => {
              this.props.history.push('/new/income');
            }}
          >
            {' '}
            + Add
          </button>
        </div>
        <form
          className='searchForm'
          onSubmit={(e) => {
            this.handleSubmit(e);
          }}
        >
          <label htmlFor='fromDate'>From:</label>
          <input
            type='date'
            id='fromDate'
            name='fromDate'
            value={fromDate}
            max={new Date()}
            onChange={(e) => {
              this.handleInputChange(e);
            }}
          />
          <label htmlFor='toDate'>To:</label>
          <input
            type='date'
            id='toDate'
            name='toDate'
            value={toDate}
            max={new Date()}
            onChange={(e) => {
              this.handleInputChange(e);
            }}
          />
          <button type='submit' name='searchButton'>
            Search
          </button>
          <button type='button' name='allButton' onClick={this.handleAll}>
            All
          </button>
        </form>
        <div className='income-form-error'>{error && <p>{error}</p>}</div>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default IncomesPage;
