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
      social {
        linkedIn
        instagram
        facebook
        twitter
        github
        stackOverflow
      }
    }
  }
`;

export const GET_USER_GIGS = gql`
  query getUserGigs {
    me {
      gigs {
        _id
        title
        description
        image
        compensation
        yearsExperience
      }
    }
  }`;

// get specific gig
// export const GET_GIG = gql`
//   query getGig($gigId: ID!) {
//     gig(id: $gigId) {
//       _id
//       title
//       description
//       image
//       compensation
//       yearsExperience
//     }
//   }
// `;
