const { AuthenticationError } = require("apollo-server-express");
const { User, Gig, Social } = require("../models");
const { signToken } = require("../utils/auth");

// TODO: add resolvers!
const resolvers = {
  Query: {
    // finding one gig, changing it to find one gig with an id
    gig: async (_parent, args, context) => {
      //   // finding one gigs
      //   return await Gig.find();
      // },
      const { id } = args;
      return {
        _id: "asffhjasdf",
        title: "Awesome title",
        description: "Some description",
        image: "http://somelocation.com/image.png",
        compensation: "1000",
        yearsExperience: 2,
      };
    },
    // TODO: finding all gigs for a user

    // TODO: Complete the below
    // this finds one user and all of their gigs
    me: async (parent, args, context) => {
      // if (context.user) {
      //   const user = await User.findById(context.user._id).populate({
      //     path: "orders.products",
      //     populate: "category",
      //   });
      //   //   return user;
      // }

      // throw new AuthenticationError("Not logged in");

      return {
        _id: "123ABC",
        firstName: "Someone",
        lastName: "Generic",
        username: "some1generic",
        email: "someone@example.com",
        gigs: [
          {
            _id: "asffhjasdf",
            title: "Awesome title",
            description: "Some description",
            image: "http://somelocation.com/image.png",
            compensation: "1000",
            yearsExperience: 2,
          },
          {
            _id: "23fasdf",
            title: "Awesome Gig",
            description: "Some description",
            image: "http://somelocation.com/image.png",
            compensation: "1000",
            yearsExperience: 4,
          },
          {
            _id: "56gsaf",
            title: "Crappy Gig",
            description: "Some description",
            image: "http://somelocation.com/image.png",
            compensation: "1000",
            yearsExperience: 6,
          },
        ],
        socials: [],
      };
    },
  },

  Mutation: {
    // TODO: create addUser mutation
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // TODO: create updateUser mutation
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    // TODO: update login mutation
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

    // TODO: addAbout mutation

    // TODO: updateAbout mutation

    // TODO: addGig mutation

    // TODO: updateGig mutation
  },
};
module.exports = resolvers;
