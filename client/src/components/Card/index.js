import React from "react";
import './Card.css';
// import { GET_USER_GIGS } from "../../utils/queries";
// import { useQuery } from "@apollo/client";

const Card = (props) => {
return (
  <div className="card-item">
    {/* <img src={props.image} alt={props.title} /> */}
    <img src={props.image} class="gig-image" alt="..." />
    <h2 className="gigTitle">{props.title}</h2>
    <p className="gigBody">{props.description}</p>
    <p className="gigBody">Compensation: {props.compensation}</p>
    <p className="gigBody">Years of Experience: {props.yearsExperience}</p>
  </div>
);
};

export default Card;


// // WHAT BRAD DID 


// const Card = ({ gigId = "asffhjasdf" }) => {
//   // Query for the gig
//   const { loading, data } = useQuery(GET_GIG, {
//     variables: { gigId: gigId },
//     });
//   if (loading) {
//     return <div>Loading...</div>;
//     }
//   const gig = data?.gig;
//   // Display gig info
//     return <div>Hello, {gig?.title}</div>;
//   };
  

  // export default Card;






