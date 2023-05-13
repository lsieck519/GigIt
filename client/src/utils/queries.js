import { gql } from '@apollo/client';

// get all gigs to display in tiles on user's profile page

export const GET_USER_PROFILE = gql`
  query getUserProfile($id: ID!, $loggedInUserId: ID!) {
    user(id: $id, loggedInUserId: $loggedInUserId) {
      _id
      firstName
      lastName
      username
      email
      about
      gigs {
        _id
        title
        description
        image
        compensation
        yearsExperience
      }
      socials {
        linkedIn
        instagram
        github
        facebook
        stackOverflow
        twitter
      }
    }
  }
`;
