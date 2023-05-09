import { gql } from "@apollo/client";

// get all gigs to display in tiles on user's profile page
export const GET_USER = gql`
  query getUser {
    me {
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
  query getGig($gigId: ID!) {
    gig(id: $gigId) {
      _id
      title
      description
      image
      compensation
      yearsExperience
    }
  }
`;
