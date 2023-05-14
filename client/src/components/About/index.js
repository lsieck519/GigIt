import React, { useEffect, useState } from 'react';
import AuthService from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import './About.css';
import { GET_USER_PROFILE } from '../../utils/queries';
import { UPDATE_ABOUT } from '../../utils/mutations';

const About = ({ userId, loggedInUserId }) => {
  const [about, setAbout] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedAbout, setEditedAbout] = useState('');
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
    setAbout(e.target.value);
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

      //since i know an error will occur due to bug, 
      //im including reload so the page goes back to pre - editing
      window.location.reload();

      console.error('Unable to update about');
    }
  };


  const { firstName, lastName } = data.user;

  const isCurrentUser = userId === loggedInUserId;
  const canEditAbout = isCurrentUser && loggedInUserId !== '';

  return (
    <div className="about-content">
      {canEditAbout && !editMode && (
        <>
          <button
            className="button"
            id="editabout"
            onClick={() => setEditMode(true)}
          >
            <img
              src={'/images/pencil.png'}
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
                <button
                  type="submit"
                  // if we want to make it look like it saved for demo purposes, uncomment onClick
                  // the issue is that the db isnt actually updated and refreshing page reverts any "changes"
                  // onClick={() => setEditMode(false)}
                  className="edit-button button is-small"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="edit-button button is-small"
                >
                  Cancel
                </button>
              </div>
              <textarea
                className="edit-about-input input"
                id="editaboutfield"
                value={about}
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
