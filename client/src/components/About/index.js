
import React, { useEffect, useState } from 'react';
import AuthService from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import './About.css';
import { GET_USER_PROFILE } from '../../utils/queries';
import { UPDATE_ABOUT } from '../../utils/mutations';

const About = ({ userId, loggedInUserId }) => {
  const [about, setAbout] = useState('');
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      id: userId,
      loggedInUserId: AuthService.getProfile()?.data?._id,
    },
  });

  const [updateAbout] = useMutation(UPDATE_ABOUT);

  useEffect(() => {
    if (data && data.user) {
      setAbout(data.user.about);
    }
  }, [data]);


  // currently getting 400 error when attempting to save about data
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateAbout({
        variables: { about },
      });
      window.location.reload();
    } catch (err) {
      console.error('Unable to update about');
    }
  };

  const { firstName, lastName } = data.user;

  const isCurrentUser = userId === loggedInUserId;
  const canEditAbout = isCurrentUser && loggedInUserId !== "";

  return (
    <div className="about-content">
      {canEditAbout && (
        <>
          <button className="button" id="editabout" onClick={handleFormSubmit}>
            <img
              src={'/images/pencil.png'}
              alt="edit-icon"
              className="edit-icon"
            />{' '}
            Edit About
          </button>
        </>
      )}

      <div className="about-container">
        <h2 className="fullname">
          About {firstName} {lastName}
        </h2>
        <p className="about-user">{about}</p>
      </div>

    </div>
  );
};

export default About;

// when edit button is clicked, i want the about section to change into an editable section
// edit button should only be visible to the logged in user
// const handleEditAbout = () => {

// }

// in the editable about section, i want the changes that the user types to be visible on screen in real time
// const handleAboutChange = (e) => {
//   setAbout(e.target.value);
// };

// when user clicks on save button, the new about data will be set
// the save button replaces the edit button while in editing mode
// after saving, the edit button replaces the save button
// const handleSaveAbout = () => {
//   updateAbout({
//     variables: { about },
//   });
// };
