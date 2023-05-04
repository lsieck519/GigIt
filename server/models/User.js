const mongoose = require("mongoose");

const { Schema } = mongoose;
// bcrypt = random string of letters and numbers to protect the website
const bcrypt = require("bcrypt");
const Gig = require("./Gig");
const Social = require("./Social");

const userSchema = new Schema({
  // schema here!
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  gigs: [Gig.schema],
  socials: [Social.schema]
});

// set up pre-save middleware to create password
// look into later for saving passwords
// userSchema.pre('save', async function(next) {
//     if (this.isNew || this.isModified('password')) {
//       const saltRounds = 10;
//       this.password = await bcrypt.hash(this.password, saltRounds);
//     }
//       next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
