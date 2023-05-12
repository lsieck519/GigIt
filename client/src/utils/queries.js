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
      socials {
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

  // new query for Gig Profiles
  //TODO: Fix this
  export const GET_USER_PROFILE = gql`
  query getUserProfile {
    me {
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
  `

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
