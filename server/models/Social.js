const mongoose = require("mongoose");

const { Schema } = mongoose;

const socialSchema = new Schema({
  linkedIn: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  github: {
    type: String,
    trim: true,
  },
  stackOverflow: {
    type: String,
    trim: true,
  },
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;
