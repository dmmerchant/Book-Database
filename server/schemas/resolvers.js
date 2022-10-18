const { AuthenticationError } = require('apollo-server-express');
const { bookSchema, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent,{id,username, user = null}) => {
      return User.findOne({
      $or: [{ _id: user ? user._id : id }, { username: username }]})
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
    saveBook: async (parent, { userId, bookId }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: bookId } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    deleteBook: async (parent, { userId, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
