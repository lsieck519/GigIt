import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar-end">
          <li className="navbar-item">
            <Link to="/profile">GigProfile</Link>
          </li>
          <li className="navbar-item">
            <a href="/" onClick={() => Auth.logout()}>
              GigOut
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-end">
          <li className="navbar-item">
            <Link to="/">GigStarted</Link>
          </li>
        </ul>
      );
    }
  }
  //added this because before the Nav wasn't showing up
  return (
    <nav className="navbar m-0 p-0">
      <div className="container m-0 pl-5">
        <div className="navbar-brand">
          <Link className="navbar-item is-justify-content-flex-start" to="/">
            <img src={`/GigIt-white-greendot.png`} alt="gigit logo" />
          </Link>
        </div>
        <div className="navbar-menu is-flex-direction-row pl-10">
          <div className="navbar-end is-align-items-center is-justify-content-space-between">
            {showNavigation()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
