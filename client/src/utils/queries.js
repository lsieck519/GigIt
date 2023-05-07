import { gql } from "@apollo/client";

// get all gigs to display in tiles on user's profile page
export const GET_GIGS = gql`
  query getGigs($userId: ID!) {
    user(id: $userId) {
      gigs {
        _id
        title
        description
      }
    }
  }
`;

// get specific gig 
export const GET_GIG = gql`
  query getGig($userId: ID!, $gigId: ID!) {
    gig(id: $gigId, user_id: $userId) {
      _id
      title
      description
      image
      compensation
      yearsExperience
    }
  }
`;