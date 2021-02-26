import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FormatService from '../../services/format-service';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import IncomesService from '../../services/incomes-service';

class Income extends Component {
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
    IncomesService.deleteIncome(id)
      .then(() => {
        window.location = '/incomes';
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

Income.propTypes = {
  object: PropTypes.object
};

export default withRouter(Income);
