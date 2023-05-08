const { gql } = require('apollo-server-express');

const typeDefs = gql`


  type Social {
    _id: ID

  }

  type Gig {
    _id: ID

  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    gigs: [Gig]
    socials: [Social]
  }


  type Auth {
    token: ID
    user: User
  }

  type Query {

  }
  // mutations for later use of adding and updating a user 
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
