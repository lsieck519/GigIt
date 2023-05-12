import React from "react";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import {GET_USER_PROFILE} from "../utils/queries";
// import Contact from "../components/Contact";

import Card from "../components/Card";
import About from "../components/About";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

// Create a page where we display gig information
const GigProfile = () => {
  const { userId } = useParams();
  const currentUserId = AuthService.getProfile()?._id;

  // Fetch the user profile by using the useQuery hook
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {id: userId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const gigs= data?.user?.gigs ?? [];

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
      {gigs.map((gig) => (
        <Card
          image={gig.image}
          title={gig.title}
          description={gig.description}
          compensation={gig.compensation}
          yearsExperience={gig.yearsExperience}
        />
      ))}
      <Footer />
    </>
  )

}

export default GigProfile;
