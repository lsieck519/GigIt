import React from "react";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import { GET_USER_PROFILE } from "../utils/queries";

import Card from "../components/Card";
import About from "../components/About";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

// Create a page where we display gig information
const GigProfile = () => {
  const { userId } = useParams();
  const loggedInUser = AuthService.getProfile();
  const loggedInUserId = loggedInUser?.data?._id;

  console.log("loggedInUser:", loggedInUser);
  console.log("loggedInUserId:", loggedInUserId);

  // Fetch the user profile by using the useQuery hook
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId, loggedInUserId: loggedInUserId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const gigs = data?.user?.gigs ?? [];

  return (
    <>
      <div className="columns">
        <aside className="menu column is-one-fifth">
          <div className="contact-list">
            <Contact userId={userId} loggedInUserId={loggedInUserId} />
          </div>
        </aside>
        <div className="section column is-four-fifths">
          <section>
            <div className="container">
              <About userId={userId} loggedInUserId={loggedInUserId} />
              {/* <Card userId={userId} loggedInUserId={currentUserId} /> */}
            </div>
          </section>
          <div>
            {gigs.map((gig) => (
              <Card
                key={gig._id}
                image={gig.image}
                title={gig.title}
                description={gig.description}
                compensation={gig.compensation}
                yearsExperience={gig.yearsExperience}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GigProfile;
