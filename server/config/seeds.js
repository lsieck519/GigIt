const db = require("./connection");
const { User } = require('../models');

db.once("open", async () => {

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    username: 'pwash',
    email: 'pamela@testmail.com',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    password: 'password12345',
    gigs: [
      {
        title: 'Babysitting by Pamela',
        description: 'First description',
        image: 'http://somelocation.com/image.png',
        compensation: '1000',
        yearsExperience: 1,
      },
      {
        title: 'Pam\'s Food Delivery',
        description: 'Second description',
        image: 'http://somelocation.com/image.png',
        compensation: '2000',
        yearsExperience: 2,
      },
      {
        title: 'Pam Wash Washes Cars',
        description: 'Third description',
        image: 'http://somelocation.com/image.png',
        compensation: '3000',
        yearsExperience: 3,
      },
      {
        title: 'House Cleaning by Pamela',
        description: 'fourth description',
        image: 'http://somelocation.com/image.png',
        compensation: '10',
        yearsExperience: 4,
      },
      {
        title: 'Pam\'s Plant Care Services',
        description: 'fifth description',
        image: 'http://somelocation.com/image.png',
        compensation: '1000',
        yearsExperience: 5,
      },
    ],
    socials: [
      {
        linkedIn: 'linkedin.com/pamwash',
      },
      {
        instagram: 'instagram.com/pamwash1',
      },
      {
        facebook: 'facebook.com/pamwashington',
      },
      {
        stackOverflow: 'stackoverflow.com/pamcodes',
      },
    ],
  });


  console.log('user created with gigs and socials')


  process.exit();
});











