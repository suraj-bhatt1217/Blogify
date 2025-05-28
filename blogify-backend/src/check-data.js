import "../config/database.js";
import { Blog } from "../models/Blog.js";
import "dotenv/config.js";

// Function to check the database content
const checkDatabase = async () => {
  try {
    // Find all blogs in the database
    const blogs = await Blog.find({});
    
    if (blogs.length === 0) {
      console.log("No blogs found in the database!");
      return;
    }
    
    console.log(`Found ${blogs.length} blogs in the database:`);
    
    // Display each blog with its name, upvotes, and comment count
    blogs.forEach((blog, index) => {
      console.log(`\nBlog #${index + 1}:`);
      console.log(`- Name: ${blog.name}`);
      console.log(`- Upvotes: ${blog.upvotes || 0}`);
      console.log(`- Upvote IDs: ${(blog.upvoteIds || []).join(', ') || 'None'}`);
      console.log(`- Comments: ${(blog.comments || []).length || 0}`);
    });
    
  } catch (error) {
    console.error("Error checking database:", error);
  } finally {
    // Disconnect from MongoDB after checking
    process.exit();
  }
};

// Run the check function
checkDatabase();
