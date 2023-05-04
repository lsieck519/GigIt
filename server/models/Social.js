const mongoose = require("mongoose");

const { Schema } = mongoose;

const socialSchema = new Schema({
  // add social schema here - linkedIn, IG, facebook? any other apps?
  linkedIn: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
  },
  stackOverflow: {
    type: String,
  },
});

const Social = mongoose.model("Social", socialSchema);

module.exports = Social;
