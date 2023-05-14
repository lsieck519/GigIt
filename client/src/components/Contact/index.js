import React, { useEffect, useState } from "react";
import AuthService from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import "./Contact.css";
import { GET_USER_PROFILE } from "../../utils/queries";
import { UPDATE_SOCIAL } from "../../utils/mutations";

const Contact = ({ userId, loggedInUserId }) => {
  const [contact, setContact] = useState("");
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      id: userId,
      loggedInUserId: AuthService.getProfile()?.data?._id,
    },
  });

  const [updateContact] = useMutation(UPDATE_SOCIAL);

  useEffect(() => {
    if (data && data.user) {
      setContact(data.user.contact);
    }
  }, [data]);

  const socials = data?.user?.socials ?? [];
  console.log(socials);

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
          src={`/images/${firstName}.jpeg`}
          alt="profile"
          className="user-image"
          onError={(e) => {
            e.target.src = "/images/default.png";
          }}
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
                  <a href={`mailto:${email}`}>{email}</a>
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
                  <a
                    href={`https://www.google.com/maps/place/${city},+${state}`}
                  >
                    {city}, {state}
                  </a>
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
                  <a href={`https://linkedin.com/${socials[0]?.linkedIn}`}>
                    {socials[0]?.linkedIn}
                  </a>
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
                  <a href={`https://instagram.com/${socials[1]?.instagram}`}>
                    {socials[1]?.instagram}
                  </a>
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
                  <a href={`https://facebook.com/${socials[2]?.facebook}`}>
                    {socials[2]?.facebook}
                  </a>
                </div>
              </div>
            </a>
          </li>
          {/* <li>
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
          </li> */}
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
