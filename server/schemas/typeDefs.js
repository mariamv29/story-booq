const {gql} = require("apollo-server-express");

const typeDefs = gql`

type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
}
type Query {
    me: User
    users: [User]
    user(username: String!):User
  }
  
  type Mutation {
      login(email: String!, password: String!): User
      addUser(username: String!, email: String!, password: String!): User
      }
  
  
  `;

module.exports = typeDefs;

