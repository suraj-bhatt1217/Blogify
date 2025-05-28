import "../config/database.js";
import { Blog } from "../models/Blog.js";
import "dotenv/config.js";

// Sample articles data matching the frontend
const articlesData = [
  {
    name: "learn-react",
    upvotes: 0,
    upvoteIds: [],
    comments: []
  },
  {
    name: "learn-node",
    upvotes: 0,
    upvoteIds: [],
    comments: []
  },
  {
    name: "mongodb",
    upvotes: 0,
    upvoteIds: [],
    comments: []
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Blog.deleteMany({});
    console.log("Cleared existing blog data");

    // Insert new articles
    const result = await Blog.insertMany(articlesData);
    console.log(`Successfully seeded ${result.length} articles`);
    
    // Display the seeded articles
    const blogs = await Blog.find({});
    console.log("Current blogs in database:", blogs);
    
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Disconnect from MongoDB after seeding
    process.exit();
  }
};

// Run the seeding function
seedDatabase();
