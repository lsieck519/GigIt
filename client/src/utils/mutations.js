import { gql } from "@apollo/client";


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


export const UPDATE_ABOUT = gql`
  mutation UpdateAbout($userId: ID!, $about: String!) {
    updateAbout(id: $userId, about: $about) {
      about
    }
  }
`;


export const ADD_GIG = gql`
  mutation addGig($input: GigInput!) {
    addGig(input: $input) {
      _id
      title
      description
      image
      compensation
      yearsExperience
    }
  }
`;


export const REMOVE_GIG = gql`
  mutation removeGig($gigId: ID!) {
    removeGig(gigId: $id) {
      _id
      title
      description
      image
      compensation
      yearsExperience
    }
  }
`;



export const ADD_SOCIAL  = gql`
  mutation addSocial($social: String!) {
    addSocial(social: $social) {
      _id
    }
  }
`;

export const REMOVE_SOCIAL = gql`
  mutation removeSocial($social: String!) {
    removeSocial(social: $social) {
      _id
    }
  }
`;