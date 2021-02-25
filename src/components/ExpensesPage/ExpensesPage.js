import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { format } from 'date-fns';
import ExpensesService from '../../services/expenses-service';
import Expense from '../Expense/Expense';

class ExpensesPage extends Component {
  static defaultProps = {
    history: () => {}
  };
  static contextType = UserContext;

  state = {
    expenses: [],
    error: null,
    fromDate: format(new Date(), 'yyyy-MM-dd'),
    toDate: format(new Date(), 'yyyy-MM-dd')
  };

  componentDidMount() {
    this.getAllExpenses();
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

    ExpensesService.filterExpenses(fromDate, toDate)
      .then((expenses) => {
        this.setState({
          expenses
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: error.error
        });
      });
  }
  getAllExpenses() {
    ExpensesService.getExpenses()
      .then((expenses) => {
        if (expenses) {
          this.setState({
            expenses
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
    this.getAllExpenses();
  };
  render() {
    const { error, expenses, fromDate, toDate } = this.state;
    const items = expenses.map((val) => {
      return (
        <li key={val.id}>
          <Expense object={val} />
        </li>
      );
    });
    return (
      <div className='list-container'>
        <div className='title-add'>
          <h2>Expenses</h2>
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

export default ExpensesPage;
