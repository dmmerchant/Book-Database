import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
    }
  }
}
`;

export const SAVE_BOOKS = gql`
mutation saveBooks($userId: ID!, $bookId: ID!) {
  saveBook(userId: $userId, bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      _id
    }
  }
}
`;

export const DELETE_BOOKS = gql`
mutation deleteBooks($userId: ID!, $bookId: ID!) {
  deleteBook(userId: $userId, bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      _id
    }
  }
}
`;

