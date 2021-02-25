import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import Dashboard from '../Dashboard/Dashboard';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import './App.css';
import IncomesPage from '../IncomesPage/IncomesPage';
import IncomeForm from '../IncomeForm/IncomeForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import ExpensesPage from '../ExpensesPage/ExpensesPage';
import ExpenseForm from '../ExpenseForm/ExpenseForm';

export default class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    return (
      <div className='App'>
        <Header />
        <main>
          {hasError && <p>There was an error! Oh no!</p>}
          <Switch>
            <PrivateRoute exact path={'/'} component={Dashboard} />
            <PrivateRoute path={'/incomes'} component={IncomesPage} />
            <PrivateRoute path={'/expenses'} component={ExpensesPage} />
            <PrivateRoute path={'/new/income'} component={IncomeForm} />
            <PrivateRoute path={'/new/expense'} component={ExpenseForm} />
            <PrivateRoute path={'/edit/income/:id'} component={IncomeForm} />
            <PrivateRoute path={'/edit/expense/:id'} component={ExpenseForm} />
            <PublicOnlyRoute path={'/register'} component={RegistrationForm} />
            <PublicOnlyRoute path={'/login'} component={LoginForm} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
