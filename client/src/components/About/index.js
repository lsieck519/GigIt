import React, { useEffect, useState } from "react";
import AuthService from "../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import "./About.css";
import { GET_USER_PROFILE } from "../../utils/queries";
import { UPDATE_ABOUT } from "../../utils/mutations";

const About = ({ userId, loggedInUserId }) => {
  const [about, setAbout] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedAbout, setEditedAbout] = useState("");
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      id: userId,
      loggedInUserId: AuthService.getProfile()?.data?._id,
    },
  });

  useEffect(() => {
    if (data && data.user) {
      setAbout(data.user.about);
    }
  }, [data]);

  const [updateAbout] = useMutation(UPDATE_ABOUT);

  const handleAboutChange = (e) => {
    setEditedAbout(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateAbout({
        variables: { about: editedAbout },
      });
      setAbout(editedAbout);
      setEditMode(false);
    } catch (err) {
      console.error("Unable to update about");
    }
  };

  const handleEditClick = () => {
    setEditedAbout(about);
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditedAbout(about);
    setEditMode(false);
  };

  const { firstName, lastName } = data.user;

  const isCurrentUser = userId === loggedInUserId;
  const canEditAbout = isCurrentUser && loggedInUserId !== "";

  return (
    <div className="about-content">
      {canEditAbout && !editMode && (
        <>
          <button
            className="button edit-button"
            id="editabout"
            onClick={handleEditClick}
          >
            <img
              src={"/images/pencil.png"}
              alt="edit-icon"
              className="edit-icon"
            />
            Edit About
          </button>
        </>
      )}

      {editMode && (
        <>
          <div className="about-container">
            <h2 className="fullname">
              About {firstName} {lastName}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="edit-section" id="editsection">
                <button type="submit" className="edit-button button is-small">
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="edit-button button is-small"
                >
                  Cancel
                </button>
              </div>
              <textarea
                className="edit-about-input input"
                id="editaboutfield"
                value={editedAbout}
                onChange={handleAboutChange}
              />
            </form>
          </div>
        </>
      )}

      {!editMode && (
        <div className="about-container">
          <h2 className="fullname">
            About {firstName} {lastName}
          </h2>
          <p className="about-user">{about}</p>
        </div>
      )}
    </div>
  );
};

export default About;
