import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import './Signup.css';

function Signup(props) {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
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
          placeholder="First Name"
          value={formState.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;