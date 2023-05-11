import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import './About.css';
import { GET_USER_ID } from '../../utils/queries';
import { UPDATE_ABOUT } from '../../utils/mutations'

const About = ({ userId, loggedInUserId }) => {
  const [about, setAbout] = useState('');
  const { loading, error, data } = useQuery(GET_USER_ID, {
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
  if (error) return <p>Error: {error.message}</p>;

  const { firstName, lastName } = data.user;
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
