import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Nav.css";

function loggedInUserId() {
  if (Auth.loggedIn()) {
    const user = Auth.getProfile();
    return user.data._id;
  }
  return "";
}

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    const onAuthChange = () => {
      setIsLoggedIn(Auth.loggedIn());
    };

    window.addEventListener("authChange", onAuthChange);

    return () => {
      window.removeEventListener("authChange", onAuthChange);
    };
  }, []);

  function showNavigation() {
    if (isLoggedIn) {
      return (
        <ul className="navbar-end">
          <li className="navbar-item">
            <Link to={`/profile/${loggedInUserId()}`}>GigProfile</Link>
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
      <div className="navbar-brand">
        <Link className="navbar-item is-justify-content-flex-start" to="/">
          <img src={`/images/GigIt-white-greendot.png`} alt="gigit logo" />
        </Link>
      </div>
      <div className="navbar-menu is-flex-direction-row">
        {/* <div className="navbar-links is-align-items-center is-justify-content-space-between"> */}
        {showNavigation()}
        {/* </div> */}
      </div>
    </nav>
  );
}

export default Nav;
