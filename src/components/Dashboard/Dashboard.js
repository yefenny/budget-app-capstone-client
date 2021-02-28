import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import { format } from 'date-fns';
import FormatService from '../../services/format-service';
import BalanceService from '../../services/balance-service';

class Dashboard extends Component {
  static defaultProps = {
    history: () => {}
  };
  static contextType = UserContext;

  state = {
    starting_balance: 0,
    incomes: 0,
    expenses: 0,
    current_balance: 0,
    negative: false,
    error: null
  };

  componentDidMount = () => {
    BalanceService.getBalance().then((res) => {
      const { starting_balance, incomes, expenses, current_balance } = res;
      this.setState({
        starting_balance,
        incomes,
        expenses,
        current_balance
      });
      if (current_balance < 0) {
        this.setState({
          negative: !this.state.negative
        });
      }
    });
  };
  handleStart = () => {
    this.props.history.push('/learn');
  };
  render() {
    const {
      starting_balance,
      incomes,
      expenses,
      current_balance,
      negative
    } = this.state;

    return (
      <section>
        <div className='dashboard-container'>
          <h2>{format(new Date(), 'MMMM')}</h2>

          <p>
            Month starting balance: $
            {FormatService.formatNumber(
              parseFloat(starting_balance).toFixed(2)
            )}
          </p>
          <div className='dashboard-incomes'>
            <p>
              Incomes: $
              {FormatService.formatNumber(parseFloat(incomes).toFixed(2))}
            </p>
          </div>
          <div className='dashboard-expenses'>
            <p>
              Expenses: $
              {FormatService.formatNumber(parseFloat(expenses).toFixed(2))}
            </p>
          </div>
          <div className='dashboard-current'>
            <p>
              Current balance:{' '}
              <span className={negative ? 'red' : ''}>
                $
                {FormatService.formatNumber(
                  parseFloat(current_balance).toFixed(2)
                )}
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
