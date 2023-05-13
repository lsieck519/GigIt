const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Social {
    _id: ID
    linkedIn: String
    instagram: String
    github: String
    facebook: String
    stackOverflow: String
    twitter: String
  }

  type Gig {
    _id: ID
    title: String
    description: String
    image: String
    compensation: String
    yearsExperience: Int
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    about: String
    gigs: [Gig]
    socials: [Social]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
  }

  # // mutations for later use of adding and updating a user
  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addAbout(about: String!): User
    updateAbout(about: String!): User
    addSocial(
      linkedIn: String
      instagram: String
      github: String
      facebook: String
      stackOverflow: String
      twitter: String
    ): Social
    addGig(
      title: String
      description: String
      image: String
      compensation: String
      yearsExperience: Int
    ): Gig
  }
`;

module.exports = typeDefs;

// updateSocial(
//  _id: ID!
//   ): Social

//   removeGig(
//    _id: ID!
//    ): Gig
