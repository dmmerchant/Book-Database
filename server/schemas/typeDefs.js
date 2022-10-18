const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser(id: ID, username: String): User
    me: User
  }

  input book {
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  input savedBook {
    _id: ID!
    book: book  
  }


  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(savedBook: book): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
