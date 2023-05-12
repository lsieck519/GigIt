import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import './About.css';
import { GET_USER } from '../../utils/queries';
import { UPDATE_ABOUT } from '../../utils/mutations'

const About = ({ userId, loggedInUserId }) => {
  const [about, setAbout] = useState('');
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId },
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
      variables: { userId, about },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <p className="error">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. {error.message}
    </p>
  );

  const { firstName, lastName } = data.me;
  const isCurrentUser = userId === loggedInUserId;
  const canEditAbout = isCurrentUser && loggedInUserId !== '';

  return (
    <div className='about-content'>
      <h2 className='fullname'>
        About {firstName} {lastName}
      </h2>
      <p className='about-user'>{about}</p>
      {canEditAbout && (
        <>
          <textarea value={about} onChange={handleAboutChange} />
          <button onClick={handleSaveAbout}>Save</button>
        </>
      )}
    </div>
  );
};

export default About;
