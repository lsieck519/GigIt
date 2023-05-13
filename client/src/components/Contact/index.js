import React, { useEffect, useState } from "react";
import AuthService from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import "./Contact.css";
import { GET_USER_PROFILE } from "../../utils/queries";
import { UPDATE_CONTACT } from "../../utils/mutations";

const Contact = ({ userId, loggedInUserId, props }) => {
  const [contact, setContact] = useState("");
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      id: userId,
      loggedInUserId: AuthService.getProfile()?.data?._id,
    },
  });

  const [updateContact] = useMutation(UPDATE_CONTACT);

  useEffect(() => {
    if (data && data.user) {
      setContact(data.user.contact);
    }
  }, [data]);
  // takes in the props for me?.data?.social.(the social here)

  // Name
  // USerName
  // email

  // data?.me?.user.location
  const socials = data?.user?.socials ?? [];

  const handleSaveContact = () => {
    updateContact({
      variables: { contact },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  const {
    firstName,
    lastName,
    email,
    city,
    state,
    linkedIn,
    instagram,
    github,
    facebook,
    stackOverflow,
    twitter,
  } = data.user;
  const isCurrentUser = userId === loggedInUserId;
  const canEditContact = isCurrentUser && loggedInUserId !== "";

  return (
    <div className="contact">
      <div className="is-flex is-justify-content-center pt-4 pr-4 pb-4">
        <img
          src={"/images/pamela.jpeg"}
          alt="location pin"
          className="user-image"
        />
      </div>
      <aside className="container">
        <ul className="contact-items">
          <h3 className="is-size-3">
            {firstName} {lastName}
          </h3>
          <li>
            <a>
              <div className="">
                <div className="contact-item">
                  <img
                    src={`/images/email.png`}
                    alt="email icon"
                    className="contact-icon-email"
                  />
                  {email}
                </div>
              </div>
            </a>
          </li>
          <li>
            <a>
              <div className="">
                <div className="contact-item">
                  <img
                    src={`/images/location.png`}
                    alt="location icon"
                    className="contact-icon"
                  />
                  {city}, {state}
                </div>
              </div>
            </a>
          </li>
          <li>
            <a className="contact-link">
              <div className="">
                <div className="contact-item">
                  <img
                    src={`/images/linkedIn.png`}
                    alt="linkedIn icon"
                    className="contact-icon"
                  />
                  {linkedIn}
                </div>
              </div>
            </a>
          </li>
          <li>
            <a className="contact-link">
              <div className="">
                <div className="contact-item">
                  <img
                    src={`/images/Instagram_Glyph_White.png`}
                    alt="instagram icon"
                    className="contact-icon"
                  />
                  {instagram}
                </div>
              </div>
            </a>
          </li>
          <li>
            <a className="contact-link">
              <div className="">
                <div className="contact-item">
                  <img
                    src={`/images/f_logo_RGB-White_72.png`}
                    alt="facebook icon"
                    className="contact-icon"
                  />
                  {facebook}
                </div>
              </div>
            </a>
          </li>
          <li>
            <a className="contact-link">
              <div className="">
                <div className="contact-item">
                  <img
                    src={`/images/github-mark-white.png`}
                    alt="github icon"
                    className="contact-icon"
                  />
                  {github}
                </div>
              </div>
            </a>
          </li>
          {canEditContact && (
            <>
              {/* <textarea value={about} onChange={handleAboutC
              hange} /> */}
              <button className="button" onClick={handleSaveContact}>
                {/* this button does not work at all right now */}
                <img
                  src={"/images/pencil.png"}
                  alt="location pin"
                  className="edit-icon"
                />{" "}
                Edit
              </button>
            </>
          )}
        </ul>
      </aside>
    </div>
  );
};

export default Contact;
