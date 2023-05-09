import React, { useState } from 'react';
import Auth from '../../utils/auth';

function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {//TODO: Create Login API
            const response = await fetch('enter-our-login-api-here', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ emailOrUsername, password }),
            });
      
            if (response.ok) {
              const { token } = await response.json();
              Auth.login(token);
            } else {
              // enter error handling
            }
          } catch (error) {
            // more error handeling
          }
    };
    
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      );
}

export default Login;