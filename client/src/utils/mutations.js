import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ABOUT = gql`
  mutation addAbout($about: String!) {
    addAbout(about: $about) {
      user {
        about
      }
    }
  }
`;

export const UPDATE_ABOUT = gql`
  mutation updateAbout($about: String!) {
    updateAbout(about: $about) {
        _id
        about
      }
    }
`;

export const ADD_GIG = gql`
  mutation addGig(
    $title: String!
    $description: String
    $image: String
    $compensation: String
    $yearsExperience: Int
  ) {
    addGig(
      title: $title
      description: $description
      image: $image
      compensation: $compensation
      yearsExperience: $yearsExperience
    ) {
      user {
        gigs {
          _id
          title
          description
          image
          compensation
          yearsExperience
        }
      }
    }
  }
`;

export const REMOVE_GIG = gql`
  mutation removeGig($id: ID!) {
    removeGig(id: $id) {
      user {
        gigs {
          _id
        }
      }
    }
  }
`;

export const ADD_SOCIAL = gql`
  mutation addSocial(
    $linkedIn: String
    $instagram: String
    $github: String
    $facebook: String
    $stackOverflow: String
    $twitter: String
  ) {
    addSocial(
      linkedIn: $linkedIn
      instagram: $instagram
      github: $github
      facebook: $facebook
      stackOverflow: $stackOverflow
      twitter: $twitter
    ) {
      user {
        socials {
          _id
          linkedIn
          instagram
          github
          facebook
          stackOverflow
          twitter
        }
      }
    }
  }
`;

export const UPDATE_SOCIAL = gql`
  mutation updateSocial($id: ID!) {
    updateSocial(id: $id) {
      user {
        socials {
          _id
        }
      }
    }
  }
`;
