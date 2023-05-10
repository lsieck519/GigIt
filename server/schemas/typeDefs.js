const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Social {
    _id: ID
    linkedIn: String
    Instagram: String
    GitHub: String
    Facebook: String
    StackOverflow: String
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
    user(id: ID!): User
    gig(id: ID!): Gig
    userGigs: User
  }

  # // mutations for later use of adding and updating a user
  type Mutation {
    updateUser(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String!
    ): User
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): Auth
    updateAbout(
      id: ID!, 
      about: String!): User
  }
`;

module.exports = typeDefs;
