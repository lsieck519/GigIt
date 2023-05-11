import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './Nav.css';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="">
          <li className="">
            <Link to="/profile">GigProfile</Link>
          </li>
          <li className="">
            <a href="/" onClick={() => Auth.logout()}>
              GigOut
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="">
          <li className="">
            <Link to="/">GigStarted</Link>
          </li>
        </ul>
      );
    }
  }
//added this because before the Nav wasn't showing up
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            Home
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">{showNavigation()}</div>
        </div>
      </div>
    </nav>
  );

}

export default Nav;
