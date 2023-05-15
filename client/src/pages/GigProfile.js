import React from "react";
import AuthService from "../utils/auth";
import { useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import { GET_USER_PROFILE } from "../utils/queries";

import { useMutation } from "@apollo/client";
import { ADD_GIG } from "../utils/mutations";
import { useRef, useState } from "react";

import Card from "../components/Card";
import About from "../components/About";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

// Create a page where we display gig information
const GigProfile = () => {
  // getting user profile
  const { userId } = useParams();
  const loggedInUser = AuthService.getProfile();
  const loggedInUserId = loggedInUser?.data?._id;

  const [gigRefresh, refreshGigs] = useState(0);

  // setting the gig descriptions to use state
  const title = useRef(null);
  const description = useRef(null);
  const image = useRef(null);
  const compensation = useRef(null);
  const yearsExperience = useRef(null);

  console.log("loggedInUser:", loggedInUser);
  console.log("loggedInUserId:", loggedInUserId);

  // Fetch the user profile by using the useQuery hook
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId, loggedInUserId: loggedInUserId },
  });
  // also need to have ADD_GIG form be shown if the user is logged in
  // const isCurrentUser = userId === loggedInUserId;
  // const canEditAbout = isCurrentUser && loggedInUserId !== '';

  // adding useMutation for a new gig
  const [addGig] = useMutation(ADD_GIG);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const gigs = data?.user?.gigs ?? [];

  // adding a gig
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addGig({
      variables: {
        title: title.current.value,
        description: description.current.value,
        image: image.current.value,
        compensation: compensation.current.value,
        yearsExperience: yearsExperience.current.value,
      },
    });
    refreshGigs(gigRefresh + 1);
  };

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
            <div className="container about-container">
              <About userId={userId} loggedInUserId={loggedInUserId} />
              {/* <Card userId={userId} loggedInUserId={currentUserId} /> */}
            </div>
          </section>
          {/* section for adding a gig */}
          <div className="add-gigs"> Add a Gig! </div>
          <form className="addGigForm" onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                className="input"
                type="text"
                ref={title}
                placeholder="What gig can you provide?"
                name="addingGigTitle"
                value={gigs?.title}
              />
            </label>
            <label>
              Photo (Optional):
              <input
                className="input"
                type="text"
                ref={image}
                placeholder="Provide a link for an image of your gig!"
                name="addingGigTitle"
                value={gigs?.image}
              />
            </label>
            <label>
              Description:
              <input
                className="input"
                type="text"
                ref={description}
                placeholder="Tell us about what your gig is..."
                name="addingGigTitle"
                value={gigs?.description}
              />
            </label>
            <label>
              Compensation:
              <input
                className="input"
                type="text"
                ref={compensation}
                placeholder="How much will you charge?"
                name="addingGigTitle"
                value={gigs?.compensation}
              />
            </label>
            <label>
              Years Experience:
              <input
                className="input"
                type="text"
                ref={yearsExperience}
                placeholder="How long have you been doing this gig?"
                name="addingGigTitle"
                value={gigs?.yearsExperience}
              />
            </label>
            <button className="add-gig-button button">
              Add Gig to Profile
            </button>
            <p className="refreshTitle">
              Refresh the page and check out your newly posted gig!
            </p>
          </form>
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
