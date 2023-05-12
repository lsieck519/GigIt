import React from "react";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {GET_USER_PROFILE} from "../utils/queries";
// import Contact from "../components/Contact";
// import Card from "../components/Card";
import About from "../components/About";

// Create a page where we display gig information
const GigProfile = () => {
  const { userId } = useParams();
  const currentUserId = AuthService.getProfile()?._id;

  // Fetch the user profile by using the useQuery hook
  const { loading, error } = useQuery(GET_USER_PROFILE, {
    variables: {id: userId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <>
    <aside>
      {/* <Contact userId={userId} loggedInUserId={currentUserId} /> */}
    </aside>
    <section className="section">
      <div className="container">
        <About userId={userId} loggedInUserId={currentUserId} />
        {/* <Card userId={userId} loggedInUserId={currentUserId} /> */}
      </div>
    </section>
    </>
  )

}

export default GigProfile;
