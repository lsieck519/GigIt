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

// idk if we will need this but i am trying to figure out how to get user id for the about component 
export const GET_USER_ID = gql`
  query getUserID($userId: ID!) {
    _id
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
    user {
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
        Instagram
        GitHub
        Facebook
        StackOverflow
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
