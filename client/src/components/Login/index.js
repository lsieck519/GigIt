import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import "./Login.css";

function Login(props) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token, () => {
        const userId = Auth.getProfile()?.data._id;
        navigate(`/profile/${userId}`);
      });
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
    <div className="login-form card">
      <div className="card-content">
        <h2 className="gigintitle" id="GigIn">
          GigIn
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="email-input">
            <input
              className="input"
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="password-input">
            <input
              className="input"
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

          <button className="button" type="submit">
            GigIn
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
