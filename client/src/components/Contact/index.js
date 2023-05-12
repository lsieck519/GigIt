import React from "react";
import "./Contact.css";
// import { GET_USER } from "../../utils/queries";

// takes in the props for me?.data?.social.(the social here)

// Name
// USerName
// email

// data?.me?.user.location
// data?.me?.socials.Github

const Contact = (props) => {
  return (
    <div className="sidebar">
      <aside className="menu">
        <ul className="menu-list">
          <li>
            <a>
              First Last
              {props.firstName} {props.lastName}
            </a>
          </li>
          <li>
            <a>email</a>
          </li>
          <li>
            <a>
              <div className="">
                <img
                  src={`./images/location.png`}
                  alt="gigit logo"
                  width="15px"
                />
              </div>
              <div>City, ST</div>
            </a>
          </li>
          <li>
            <a>linkedIn</a>
          </li>
          <li>
            <a>Instagram</a>
          </li>
          <li>
            <a>Facebook</a>
          </li>
          <li>
            <a>Github</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Contact;
