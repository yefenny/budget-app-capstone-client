import React from 'react';
import { withRouter } from 'react-router-dom';
import IncomesService from '../../services/incomes-service';
import { format } from 'date-fns';

class IncomeForm extends React.Component {
  state = {
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    amount: 0,
    income_category_id: '',
    income_categories: [],
    error: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;
// Get Income Categories to load Income Categories Select
    IncomesService.getIncomeCategories()
      .then((income_categories) => {
        console.log('here');
        if (income_categories) {
          this.setState({
            income_categories
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: error.error
        });
      });
// If id it will know that is the form to edit and will fetch the specific Income by Id
    if (id) {
      IncomesService.getIncomeById(id)
        .then((income) => {
          let { date, amount, description, income_category_id } = income;
          this.setState({
            date: format(new Date(date), 'yyyy-MM-dd'),
            description,
            amount,
            income_category_id
          });
        })
        .catch((res) => {
          this.setState({
            error: res.error
          });
        });
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // Validate that required values are not empty
  validateAll = async () => {
    let { date, amount, description, income_category_id } = this.state;
    const required = {
      date,
      description: description.trim(),
      amount,
      income_category_id
    };

    for (const [key, value] of Object.entries(required)) {
      if (!value) {
        await this.setState({
          error: `${key} is required`
        });
        return false;
      }
    }
    return true;
  };
  validateDate = {};

  handleSubmit = (e) => {
    const { date, amount, description, income_category_id } = this.state;
    const { id } = this.props.match.params;
    e.preventDefault();
    this.setState({
      error: null
    });
    // if required values are not empty
    if (this.validateAll()) {
      const newIncome = {
        date,
        amount,
        description,
        income_category_id
      };
    // if id exists the Income will be updated
      if (id) {
        IncomesService.updateIncome(id, newIncome)
          .then(() => {
            this.props.history.push('/incomes');
          })
          .catch((res) => {
            this.setState({ error: res.error });
          });
      } else {
        // if id doesn't exists a new Income will be created
        IncomesService.createIncome(newIncome)
          .then(() => {
            this.props.history.push('/incomes');
          })
          .catch((res) => {
            this.setState({ error: res.error });
          });
      }
    }
  };

  render() {
    const {
      date,
      income_category_id,
      description,
      income_categories,
      amount,
      error
    } = this.state;
    const { id } = this.props.match.params;
    // Create the options for Income Categories
    const incomeCategoriesOption = income_categories.map((val) => {
      return (
        <option key={val.id} value={val.id}>
          {val.title}
        </option>
      );
    });
    return (
      <section>
        <div className='private-form'>
          <h2>{id ? 'Edit Income' : 'New Income'}</h2>
          <form
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <div className='error'>{error && <p>{error}</p>}</div>
            <label htmlFor='date'>Date:</label>
            <input
              type='date'
              id='date'
              name='date'
              defaultValue={date}
              max={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
              required
            />
            <label htmlFor='amount' className='right'>
              Amount:
            </label>
            <input
              step='0.01'
              value={amount}
              min='0'
              type='number'
              id='amount'
              name='amount'
              onChange={(e) => {
                this.handleInputChange(e);
              }}
              required
            />
            <label htmlFor='income_category_id'>Category</label>
            <select
              name='income_category_id'
              id='income_category_id'
              value={income_category_id}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
              required
            >
              <option value=''>--------- Select ---------</option>
              {incomeCategoriesOption}
            </select>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              rows='4'
              cols='30'
              value={description}
              onChange={(e) => {
                this.handleInputChange(e);
              }}
              required
            ></textarea>
            <div className='form-buttons'>
              <button>{id ? 'Update' : 'Create'}</button>
              <button type='button' onClick={this.props.history.goBack}>
                {' '}
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(IncomeForm);
