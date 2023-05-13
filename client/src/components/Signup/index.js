import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import "./Signup.css";

function Signup(props) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
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
    Auth.login(token, () => {
      const userId = Auth.getProfile()?.data._id;
      navigate(`/profile/${userId}`);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup-form card">
      <div className="card-content" id="gigStarted">
        <p className="noaccount">Don't have an account?</p>
        <h2 className="gigstartedtitle">GigStarted</h2>
        <form onSubmit={handleSubmit}>
          <div className="first-input">
            <input
              placeholder="First Name"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="last-input">
            <input
              placeholder="Last Name"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="username-input">
            <input
              placeholder="Username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
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
              id="pwd"
              onChange={handleChange}
            />
          </div>
          <div className="submit-signup">
            <button className="button is-small" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
