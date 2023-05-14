const db = require("./connection");
const { User } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    username: "pwash",
    email: "pamela@testmail.com",
    about:
      "Hey there! I'm Pamela Washington, and lending a helping hand is my ultimate passion. Whether it's tending to children, delivering food, washing cars, caring for plants, or cleaning houses, I've gained experience in a range of areas. I'm always on the go, embracing an active lifestyle that keeps me energized. Learning is a constant pursuit for me, and I take pleasure in acquiring new skills and knowledge. Helping people brings me immense joy and fulfillment, and I strive to make a positive impact wherever I go. Let's work together to make the world a better place, one act of kindness at a time!",
    profilepic: "../images/pamela.jpeg",
    city: "Miami",
    state: "Florida",
    password: "password12345",
    gigs: [
      {
        title: "Child Care by Pamela",
        description:
          "As a child care provider, I bring compassion, patience, and creativity to my work. With a genuine love for children, I prioritize their safety, well-being, and growth. I establish nurturing relationships, encourage their curiosity, and create engaging activities. Through my dedication and reliability, I strive to create a positive and enriching environment for each child in my care.",
        image:
          "https://images.unsplash.com/photo-1444681179373-730055ddc7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        compensation:
          "$15/hr for 1 child + $10/hr for each additional child. Maximum of 5 children.",
        yearsExperience: 10,
      },
      {
        title: "Pam's Food Delivery",
        description:
          "I excel in efficiency, reliability, and customer service. With a strong sense of responsibility, I ensure timely and accurate deliveries. I am courteous, friendly, and go the extra mile to meet customer expectations. I navigate routes effectively and handle orders with care, guaranteeing a seamless and satisfying experience for every recipient.",
        image:
          "https://images.unsplash.com/photo-1594392175511-30eca83d51c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        compensation: "$15",
        yearsExperience: 4,
      },
      {
        title: "Pam Wash Washes Cars",
        description:
          "As a car washer, I take pride in my attention to detail and commitment to excellence. I have a keen eye for cleanliness and deliver impeccable results. With a strong work ethic, I am efficient, thorough, and ensure every vehicle shines. I prioritize customer satisfaction and strive to exceed expectations with my meticulous car washing skills.",
        image:
          "https://images.unsplash.com/photo-1593535526761-d83043a86688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        compensation: "$50",
        yearsExperience: 3,
      },
      {
        title: "House Cleaning by Pamela",
        description:
          "As a house cleaner, I bring a meticulous approach and a strong work ethic to every task. I have a keen eye for cleanliness, organization, and attention to detail. I am efficient, reliable, and respectful of personal spaces. With my dedication and professionalism, I strive to create a pristine and comfortable environment for every client.",
        image:
          "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        compensation: "Let's discuss!",
        yearsExperience: 20,
      },
      {
        title: "Pam's Plant Care Services",
        description:
          "As a plant caretaker, I possess a deep appreciation for nature and a green thumb. I am knowledgeable about various plant species and their specific care needs. With patience and nurturing, I ensure proper watering, pruning, and pest control. I am attentive to their growth, providing a thriving environment for plants to flourish under my watchful care.",
        image:
          "https://images.unsplash.com/photo-1566836610593-62a64888a216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1077&q=80",
        compensation: "Let's discuss!",
        yearsExperience: 5,
      },
    ],
    socials: [
      {
        linkedIn: "pamwash",
      },
      {
        instagram: "pamwash1",
      },
      {
        facebook: "pamwashington",
      },
      {
        stackOverflow: "pamcodes",
      },
      {
        github: "pamcodes",
      },
    ],
  });

  console.log("user created with gigs and socials");

  process.exit();
});
