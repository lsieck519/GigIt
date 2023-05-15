const { AuthenticationError } = require("apollo-server-express");
const { User, Gig, Social } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // this finds one user and all of their gigs
    user: async (parent, args, context) => {
      if (context.user) {
        const { id } = args;
        const { loggedInUserId } = context;

        const user = id
          ? await User.findOne({ _id: id })
          : await User.findById(context.user._id);

        return user;
      } else {
        console.log("Not logged in");
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    updateAbout: async (parent, { about }, context) => {
      if (!context.user) {
        throw new Error("Authentication required.");
      }
      try {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { about: about } },
          { new: true }
        );
        return user;
      } catch (error) {
        throw new Error("Failed to update user about!");
      }
    },
    addGig: async (
      parent,
      { title, description, image, compensation, yearsExperience },
      context
    ) => {
      if (!context.user) {
        throw new Error("Authentication required.");
      }

      try {
        const user = await User.findById(context.user._id);

        const newGig = {
          title,
          description,
          image,
          compensation,
          yearsExperience,
        };

        user.gigs.push(newGig);

        await user.save();

        return newGig;
      } catch (error) {

        console.log(error);

      }
    },

    updateSocial: async (
      parent,
      { linkedIn, instagram, github, facebook, stackOverflow, twitter },
      context
    ) => {
      if (!context.user) {
        throw new Error("Authentication required.");
      }

      try {
        const user = await User.findById(context.user._id);

        user.socials.linkedIn = linkedIn;
        user.socials.instagram = instagram;
        user.socials.github = github;
        user.socials.facebook = facebook;
        user.socials.stackOverflow = stackOverflow;
        user.socials.twitter = twitter;

        await user.save();

        return user.socials;
      } catch (error) {
        throw new Error("Failed to add social.");
      }
    },

    updateContact: async (parent, { email, city, state }, context) => {
      if (!context.user) {
        throw new Error("Authentication required.");
      }

      try {
        const contact = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { email: email, city: city, state: state } },
          { new: true }
        );
        return contact;
      } catch (error) {
        throw new Error("Failed to update user contact!");
      }
    },
  },
};

module.exports = resolvers;
