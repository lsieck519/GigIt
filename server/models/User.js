const mongoose = require("mongoose");

const { Schema } = mongoose;

const bcrypt = require("bcrypt");

const Gig = require("./Gig");
const Social = require("./Social");

// users will sign in using email + password combo 
// display name on user profile can be their first name and last initial?

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  gigs: [Gig.schema],
  socials: [Social.schema],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
