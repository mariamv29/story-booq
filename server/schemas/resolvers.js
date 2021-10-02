const { AuthenticationError } = require("apollo-server-errors");
const { signToken } = require('../utils/auth');
const { User } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select("-__v -password").populate("savedBooks");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("savedBooks");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user};
    },
    login: async (parent, {email, password }) => {
        const user = await User.findOne({ email });
        if(!user) {
            throw new AuthenticationError("Incorrect credentials");
        }
        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
        return { token, user}
    },
  },
};

module.exports = resolvers;
