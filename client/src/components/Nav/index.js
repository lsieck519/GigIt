import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

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
}

export default Nav;
