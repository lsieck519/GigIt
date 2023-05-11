import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import './Login.css';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="email-input">
          <input
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="password-input">
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="cred-error">Incorrect Email or Password!</p>
          </div>
        ) : null}
        <div className="submit-login">
          <button className="button is-light is-small"  type="submit">
            LogIn
          </button>
        </div>
      </form>
    </div>
  );
}


export default Login;