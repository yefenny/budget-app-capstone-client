import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import FormatService from '../../services/format-service';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ExpensesService from '../../services/expenses-service';

class Expense extends Component {
  state = {
    toggled: false
  };

  handleToggle = () => {
    this.setState({
      toggled: !this.state.toggled
    });
  };
  handleDelete = () => {
    const { id } = this.props.object;
    ExpensesService.deleteExpense(id)
      .then(() => {
        window.location = '/expenses';
      })
      .catch((res) => {
        console.log(res.error);
      });
  };
  render() {
    const { id, date, description, amount, category } = this.props.object;

    let d = new Date(date);
    const newDate = d ? format(d, 'MM/dd/yyyy') : '';

    return (
      <>
        <div className='item-header' onClick={this.handleToggle}>
          <p>${FormatService.formatNumber(parseFloat(amount).toFixed(2))}</p>
          <p>{newDate}</p>
        </div>
        <div
          className={this.state.toggled ? 'item-details ' : 'item-details hide'}
        >
          <div className='row'>
            <p>
              <span className='key-name'>Category:</span>{' '}
              {FormatService.firstUpperCaser(category)}
            </p>
            <button
              onClick={() => {
                this.props.history.push(`/edit/income/${id}`);
              }}
            >
              Edit
            </button>
          </div>
          <div className='row'>
            <p>
              <span className='key-name'>Description:</span>{' '}
              {FormatService.firstUpperCaser(description)}
            </p>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        </div>
      </>
    );
  }
}

Expense.propTypes = {
  object: PropTypes.object
};

export default withRouter(Expense);
