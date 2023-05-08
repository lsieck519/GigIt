const { AuthenticationError } = require("apollo-server-express");
const { User, Gig, Social } = require("../models");
const { signToken } = require("../utils/auth");

// TODO: add resolvers!
const resolvers = {
    Query: {
    // change to gigs to find all submitted gigs 
      gigs: async () => {
        // find all gigs
        return await Gig.find();
      },
    // inserint gig into {} ?
      products: async (parent, {  }) => {
        const params = {};
        // inserting gig
        if ( gig ) {
          params.gig = gig;
        }
  
        // dont know if we need this 
        // if (name) {
        //   params.name = {
        //     $regex: name
        //   };
        // }
  
        return await Gig.find(params).populate('gig');
      },
    // the whole above section is used to find and populate all gigs

    // this whole below seciton is used to find the product id, which in our case would be the gig id? 
      product: async (parent, { _id }) => {
        // and then populating that specific gig in the gigs grouping
        return await Product.findById(_id).populate('category');
      },
    //   this is where we are implementing the users 
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
        //   i believe these next 2 lines are for stripe 
        //   user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
        //   return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      
    },
    // this is for the mutations we created 
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
    //   need to create a new one to adding a gig when editing the page 
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      }
    }
;
  
  module.exports = resolvers;