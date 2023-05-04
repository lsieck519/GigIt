const { AuthenticationError } = require("apollo-server-express");
const { User, Gig, Social } = require("../models");
const { signToken } = require("../utils/auth");

// TODO: add resolvers!
