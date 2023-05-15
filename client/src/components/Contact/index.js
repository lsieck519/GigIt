import React, { useEffect, useState } from "react";
import AuthService from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import "./Contact.css";
import { GET_USER_PROFILE } from "../../utils/queries";
import { UPDATE_SOCIAL, UPDATE_CONTACT } from "../../utils/mutations";

const Contact = ({ userId, loggedInUserId }) => {
  const [email, setEmail] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const [city, setCity] = useState("");
  const [editedCity, setEditedCity] = useState("");

  const [state, setState] = useState("");
  const [editedState, setEditedState] = useState("");

  const [linkedIn, setLinkedIn] = useState("");
  const [editedLinkedIn, setEditedLinkedIn] = useState("");

  const [instagram, setInstagram] = useState("");
  const [editedInstagram, setEditedInstagram] = useState("");

  const [facebook, setFacebook] = useState("");
  const [editedFacebook, setEditedFacebook] = useState("");

  const [github, setGithub] = useState("");
  const [editedGithub, setEditedGithub] = useState("");

  const [editMode, setEditMode] = useState(false);
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      id: userId,
      loggedInUserId: AuthService.getProfile()?.data?._id,
    },
  });

  useEffect(() => {
    if (data && data.user) {
      setEmail(data.user.email);
      setCity(data.user.city);
      setState(data.user.state);
      setLinkedIn(data.user.socials.linkedIn);
      setInstagram(data.user.socials.instagram);
      setFacebook(data.user.socials.facebook);
      setGithub(data.user.socials.github);
    }
  }, [data]);

  const [updateSocial] = useMutation(UPDATE_SOCIAL);
  const [updateContact] = useMutation(UPDATE_CONTACT);

  const socials = data?.user?.socials ?? [];
  console.log(socials);

  // handleContactChange includes switch cases so each input field can be edited individually
  const handleContactChange = (e) => {
    const fieldName = e.target.id;
    const value = e.target.value;

    switch (fieldName) {
      case "editEmailField":
        setEditedEmail(value);
        break;
      case "editCityField":
        setEditedCity(value);
        break;
      case "editStateField":
        setEditedState(value);
        break;
      case "editLinkedInField":
        setEditedLinkedIn(value);
        break;
      case "editInstagramField":
        setEditedInstagram(value);
        break;
      case "editFacebookField":
        setEditedFacebook(value);
        break;
      case "editGithubField":
        setEditedGithub(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("hello");
    try {
      console.log("hello again");
      const { data } = await updateSocial({
        variables: {
          linkedIn: editedLinkedIn,
          instagram: editedInstagram,
          facebook: editedFacebook,
          github: editedGithub,
        },
      });
      const stuff = await updateContact({
        variables: {
          email: editedEmail,
          city: editedCity,
          state: editedState,
        },
      });
      setEmail(editedEmail);
      setCity(editedCity);
      setState(editedState);
      setLinkedIn(editedLinkedIn);
      setInstagram(editedInstagram);
      setFacebook(editedFacebook);
      setGithub(editedGithub);

      setEditMode(false);
    } catch (err) {
      console.error("Unable to update contact fields");
    }
  };

  const handleEditClick = () => {
    setEditedEmail(email);
    setEditedCity(city);
    setEditedState(state);
    setEditedLinkedIn(linkedIn);
    setEditedInstagram(instagram);
    setEditedFacebook(facebook);
    setEditedGithub(github);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditedEmail(email);
    setEditedCity(city);
    setEditedState(state);
    setEditedLinkedIn(linkedIn);
    setEditedInstagram(instagram);
    setEditedFacebook(facebook);
    setEditedGithub(github);
    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  const { firstName, lastName } = data.user;

  const isCurrentUser = userId === loggedInUserId;
  const canEditContact = isCurrentUser && loggedInUserId !== "";

  return (
    <div className="contact">
      {editMode && (
        <>
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
              <form onSubmit={handleFormSubmit}>
                {/* div for email address */}
                <div className="contact-item" id="editContactSection">
                  <img
                    src={`/images/email.png`}
                    alt="email icon"
                    className="contact-icon-email"
                  />
                  <input
                    className="edit-contact-input input"
                    type="text"
                    id="editEmailField"
                    value={editedEmail}
                    onChange={handleContactChange}
                  />
                </div>

                {/* div for City, ST */}
                <div className="contact-item">
                  <img
                    src={`/images/location.png`}
                    alt="location icon"
                    className="contact-icon"
                  />
                  <input
                    className="edit-contact-input input"
                    type="text"
                    id="editCityField"
                    value={editedCity}
                    onChange={handleContactChange}
                  />
                  <div className="comma">,</div>
                  <input
                    className="edit-contact-input input"
                    type="text"
                    id="editStateField"
                    value={editedState}
                    onChange={handleContactChange}
                  />
                </div>

                {/* div for linkedIn */}
                <div className="contact-item">
                  <img
                    src={`/images/linkedIn.png`}
                    alt="linkedIn icon"
                    className="contact-icon"
                  />
                  <input
                    className="edit-contact-input input"
                    type="text"
                    id="editLinkedInField"
                    value={editedLinkedIn}
                    onChange={handleContactChange}
                  />
                </div>

                {/* div for instagram */}
                <div className="contact-item">
                  <img
                    src={`/images/Instagram_Glyph_White.png`}
                    alt="instagram icon"
                    className="contact-icon"
                  />{" "}
                  <input
                    className="edit-contact-input input"
                    type="text"
                    id="editInstagramField"
                    value={editedInstagram}
                    onChange={handleContactChange}
                  />
                </div>

                {/* div for facebook */}
                <div className="contact-item">
                  <img
                    src={`/images/f_logo_RGB-White_72.png`}
                    alt="facebook icon"
                    className="contact-icon"
                  />{" "}
                  <input
                    className="edit-contact-input input"
                    type="text"
                    id="editFacebookField"
                    value={editedFacebook}
                    onChange={handleContactChange}
                  />
                </div>

                {/* div for github */}
                <div className="contact-item">
                  <img
                    src={`/images/github-mark-white.png`}
                    alt="github icon"
                    className="contact-icon"
                  />
                  <input
                    className="edit-contact-input input"
                    type="text"
                    id="editGithubField"
                    value={editedGithub}
                    onChange={handleContactChange}
                  />
                </div>

                <li>
                  <button
                    type="submit"
                    className="edit-socials-button button is-small"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="edit-socials-button button is-small"
                  >
                    Cancel
                  </button>
                </li>
              </form>
            </ul>
          </aside>
        </>
      )}

      {!editMode && (
        <>
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
              {email && (
                <li>
                  <a href={`mailto:${email}`}>
                    <div className="">
                      <div className="contact-item">
                        <img
                          src={`/images/email.png`}
                          alt="email icon"
                          className="contact-icon-email"
                        />
                        <span>{email}</span>
                      </div>
                    </div>
                  </a>
                </li>
              )}
              {city && state && (
                <li>
                  <a
                    href={`https://www.google.com/maps/place/${city},+${state}`}
                  >
                    <div className="">
                      <div className="contact-item">
                        <img
                          src={`/images/location.png`}
                          alt="location icon"
                          className="contact-icon"
                        />
                        <span>
                          {city}, {state}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              )}
              {socials.length > 0 && socials[0]?.linkedIn && (
                <li>
                  <a
                    href={`https://linkedin.com/${socials[0]?.linkedIn}`}
                    className="contact-link"
                  >
                    <div className="">
                      <div className="contact-item">
                        <img
                          src={`/images/linkedIn.png`}
                          alt="linkedIn icon"
                          className="contact-icon"
                        />
                        <span>{socials[0]?.linkedIn}</span>
                      </div>
                    </div>
                  </a>
                </li>
              )}
              {socials.length > 0 && socials[1]?.instagram && (
                <li>
                  <a
                    href={`https://instagram.com/${socials[1]?.instagram}`}
                    className="contact-link"
                  >
                    <div className="">
                      <div className="contact-item">
                        <img
                          src={`/images/Instagram_Glyph_White.png`}
                          alt="instagram icon"
                          className="contact-icon"
                        />
                        <span>{socials[1]?.instagram}</span>
                      </div>
                    </div>
                  </a>
                </li>
              )}
              {socials.length > 0 && socials[2]?.facebook && (
                <li>
                  <a
                    href={`https://facebook.com/${socials[2]?.facebook}`}
                    className="contact-link"
                  >
                    <div className="">
                      <div className="contact-item">
                        <img
                          src={`/images/f_logo_RGB-White_72.png`}
                          alt="facebook icon"
                          className="contact-icon"
                        />
                        <span>{socials[2]?.facebook}</span>
                      </div>
                    </div>
                  </a>
                </li>
              )}
              {socials.length > 0 && socials[3]?.github && (
                <li>
                  <a
                    href={`https://facebook.com/${socials[3]?.github}`}
                    className="contact-link"
                  >
                    <div className="">
                      <div className="contact-item">
                        <img
                          src={`/images/github-mark-white.png`}
                          alt="github icon"
                          className="contact-icon"
                        />
                        <span>{socials[3]?.github}</span>
                      </div>
                    </div>
                  </a>
                </li>
              )}
            </ul>
          </aside>
        </>
      )}

      {canEditContact && !editMode && (
        <>
          <button
            className="edit-contact-button button"
            id="editcontact"
            onClick={handleEditClick}
          >
            <img
              src={"/images/pencil.png"}
              alt="location pin"
              className="edit-icon"
            />{" "}
            Edit Contact
          </button>
        </>
      )}
    </div>
  );
};

export default Contact;
