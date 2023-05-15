import React from "react";
import "./Card.css";
// import { GET_USER_GIGS } from "../../utils/queries";
// import { useQuery } from "@apollo/client";

const Card = (props) => {
  const tileStyle = {
    color: "white",
    backgroundColor: "#368b63",
    padding: "0px",
  };

  return (
    <div style={tileStyle} className="child is-child box card-background">
      {/* <img src={props.image} alt={props.title} /> */}
      <div className="top-card">
        <h2 className="gigTitle">{props.title}</h2>
        <img src={props.image} className="gig-image" alt="..." />
      </div>
      <div className="bottom-card">
        <p className="gigBody">{props.description}</p>
        <p className="gigBody">
          <strong>Compensation: </strong>
          {props.compensation}
        </p>
        <p className="gigBody">
          <strong>Years of Experience:</strong> {props.yearsExperience}
        </p>
      </div>
    </div>
  );
};

export default Card;
