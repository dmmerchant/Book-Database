import { gql } from '@apollo/client';

export const QUERY_USERSEARCH = gql`
query getSingleUser($id: ID, $username: String){
  getSingleUser(id: $id,username: $username) {
    _id
    username
    email
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;