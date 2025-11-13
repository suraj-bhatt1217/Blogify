import "../config/database.js";
import { Blog } from "../models/Blog.js";
import "dotenv/config.js";
import mongoose from "mongoose";

// Test connection and collection name
const testConnection = async () => {
  try {
    // Wait for connection
    await new Promise((resolve) => {
      if (mongoose.connection.readyState === 1) {
        resolve();
      } else {
        mongoose.connection.once('connected', resolve);
        setTimeout(resolve, 5000); // Timeout after 5 seconds
      }
    });

    console.log("✓ Connected to MongoDB");
    console.log("Database:", mongoose.connection.name);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\nAvailable collections:");
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    // Try to find blogs with current collection name
    try {
      const blogs = await Blog.find({});
      console.log(`\n✓ Found ${blogs.length} blogs in collection "Blogs"`);
      blogs.forEach(blog => {
        console.log(`  - ${blog.name} (upvotes: ${blog.upvotes || 0}, comments: ${blog.comments?.length || 0})`);
      });
    } catch (error) {
      console.error("\n✗ Error finding blogs:", error.message);
      console.log("\nTry changing the collection name in models/Blog.js:");
      console.log("  - If collection is 'Blogs' (capitalized), use: mongoose.model('Blog', blogSchema, 'Blogs')");
      console.log("  - If collection is 'blogs' (lowercase), use: mongoose.model('Blog', blogSchema, 'blogs')");
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    process.exit();
  }
};

testConnection();

