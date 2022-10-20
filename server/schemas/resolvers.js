const { AuthenticationError } = require('apollo-server-express');
const { bookSchema, User } = require('../models');
const { signToken } = require('../utils/auth');


function objToString(object) {
  var str = '';
  for (var k in object) {
    if (object.hasOwnProperty(k)) {
      str += k + '::' + object[k] + '\n';
    }
  }
  console.log(str);
  return str;
}

const resolvers = {
  Query: {
    getSingleUser: async (parent,{id,username, user = null}) => {
      return User.findOne({
      $or: [{ _id: user ? user._id : id }, { username: username }]})
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { savedBook }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: savedBook } },
          { new: true, runValidators: true }
        );
        
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteBook: async (parent, { bookId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
