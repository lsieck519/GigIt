import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import './Login.css';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const mutationResponse = await login({
            variables: { email: formState.email, password: formState.password },
          });
          const token = mutationResponse.data.login.token;
          Auth.login(token);
        } catch (e) {
          console.log(e);
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
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
              required
          />
         
            <button className='button is-info' type="submit">Log In</button>
           
            {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
          </form>
        </div>
      );
}

export default Login;