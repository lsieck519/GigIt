const db = require("./connection");
const { User, Social, Gig } = require('../models');

db.once("open", async () => {

  await Social.deleteMany();

  const social = await Social.insertMany([
    {
      linkedIn: 'linkedinlink1'
    },
    {
      instagram: 'instagramlink'
    },
    {
      facebook: 'facebooklink'
    },
    {
      stackOverflow: 'sflink'
    }
  ])

 console.log('social seeded');

  await Gig.deleteMany();

  const gig = await Gig.insertMany([
    { 
      title: "First Awesome title",
      description: "First description",
      image: "http://somelocation.com/image.png",
      compensation: "1000",
      yearsExperience: 1,
    },
    { 
      title: "Second Awesome title",
      description: "Second description",
      image: "http://somelocation.com/image.png",
      compensation: "2000",
      yearsExperience: 2,
    },
    { 
      title: "Third Awesome title",
      description: "Third description",
      image: "http://somelocation.com/image.png",
      compensation: "3000",
      yearsExperience: 3,
    },
    { 
      title: "Title four",
      description: "fourth description",
      image: "http://somelocation.com/image.png",
      compensation: "10",
      yearsExperience: 4,
    },
    { 
      title: "Fifth gig",
      description: "fifth description",
      image: "http://somelocation.com/image.png",
      compensation: "1000",
      yearsExperience: 1,
    },
  ]);

  console.log('gigs seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    username: 'pwash',
    email: 'pamela@testmail.com',
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    password: 'password12345',
    gig: [gig[0]._id, gig[1]._id, gig[2]._id, gig[3]._id, gig[4]._id],
    social: [social[0]._id, social[1]._id, social[2]._id, social[3]._id],
  });

  // await User.create({
  //   firstName: 'Elijah',
  //   lastName: 'Holt',
  //   username: 'eHolt',
  //   email: 'eholt@testmail.com',
  //   password: 'password12345'
  // });

  console.log('users seeded');

  process.exit();
});











