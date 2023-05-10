// // implementation of the card component 

// // important react 
import React from "react"; 
import './Card.css';
import { GET_USER_GIGS } from "../../utils/queries";


// // creating a card 
// // by passing in props we can add in different props to the Card component each time we use it, 
// // and it will display the appropriate data based on the props passed in, such as the gigs we are trying to display
// const Card = (props) => {
//     return (
//       <div className="card">
//         {/* this will be the image and the title of the gig */}
//         <img src={props.image} alt={props.title} />
//         <div className="card-body">
//             {/* the description will be explaing about the prop*/}
//           <p className="card-description">{props.description}</p>
//             {/* thinking of adding a button to show that it can be further implemented to have it added to the stripe cart */}
//           <a href={props.link} className="btn btn-primary">add to cart</a>
//         </div>
//       </div>
//     );
//   };

// export default Card;


// // to implement this later when rendering the page we will use it like this 
// // import React from 'react';
// // import Card from './Card';

// // const gigIt = () => {
// //   const cardData = {
// //     image: 'image here',
// //     title: 'some gig we can do ',
// //     description: 'this is about my gig!',
// //   };
const Card = (props) => {
  return (
    <div>
        {/* image={cardData.image}  */}
        {props.title} 
        {/* description={cardData.description}  */}
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






