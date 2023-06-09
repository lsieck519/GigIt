const mongoose = require("mongoose");

const { Schema } = mongoose;

const gigSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 60,
  },
  description: {
    type: String,
    max: 200,
  },
  image: {
    type: String,
  },
  compensation: {
    type: String,
  },
  yearsExperience: {
    type: String,
  },
});


module.exports = gigSchema;
