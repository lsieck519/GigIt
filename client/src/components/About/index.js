import React, { useEffect, useState } from 'react';
import AuthService from "../../utils/auth";
import { useQuery, useMutation } from '@apollo/client';
import './About.css';
import { GET_USER_PROFILE } from '../../utils/queries';
import { UPDATE_ABOUT } from '../../utils/mutations';

const About = ({ userId, loggedInUserId }) => {
  const [about, setAbout] = useState('');
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId, loggedInUserId: AuthService.getProfile()?.data?._id },
  });

  const [updateAbout] = useMutation(UPDATE_ABOUT);

  useEffect(() => {
    if (data && data.user) {
      setAbout(data.user.about);
    }
  }, [data]);

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSaveAbout = () => {
    updateAbout({
      variables: { about },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p className="error">Error: {error.message}</p>
    );

  const { firstName, lastName } = data.user;
  const isCurrentUser = userId === loggedInUserId;
  const canEditAbout = isCurrentUser && loggedInUserId !== '';

  return (
    <div className="about-content">
      <div className="about-container">
        <h2 className="fullname">
          About {firstName} {lastName}
        </h2>
        <p className="about-user">{about}</p>
      </div>
      {canEditAbout && (
        <>
          <textarea value= { about } onChange={handleAboutChange} />
          <button className="button is-small" onClick={handleSaveAbout}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default About;
