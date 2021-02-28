import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      user_name: username.value,
      password: password.value
    })
      .then((res) => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <section className='public-section'>
        <h2>Log in</h2>
        <p>
          Don't know how you expend all your money ? Budget app can help you,
          This app allows you to track your expenses and incomes easily an get
          in control of your spending!
        </p>
        <form className='LoginForm' onSubmit={this.handleSubmit}>
          <div role='alert'>{error && <p>{error}</p>}</div>
          <div>
            <Label htmlFor='login-username-input'>Username</Label>
            <Input
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              required
            />
          </div>
          <div>
            <Label htmlFor='login-password-input'>Password</Label>
            <Input
              id='login-password-input'
              name='password'
              type='password'
              required
            />
          </div>

          <Button type='submit'>Login</Button>
          <span className='login-user'>Test user: admin</span>
          <span className='login-user'>Password: 'pass'</span>
        </form>
      </section>
    );
  }
}

export default LoginForm;
