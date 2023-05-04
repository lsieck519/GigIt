const mongoose = require("mongoose");

const { Schema } = mongoose;

const gigSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  compensation: {
    type: String,
  },
  yearsExperience: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const Gig = mongoose.model("Gig", gigSchema);

module.exports = Gig;
