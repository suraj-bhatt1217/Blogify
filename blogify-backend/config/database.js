import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL environment variable is not set!");
  console.error("Please create a .env file in blogify-backend/ with DATABASE_URL=your_connection_string");
  process.exit(1);
}

// Connect to MongoDB with better error handling
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    console.error("\nTroubleshooting tips:");
    console.error("1. Check if your DATABASE_URL is correct in .env file");
    console.error("2. Make sure username and password are URL-encoded (use %40 for @, %3A for :, etc.)");
    console.error("3. Verify your IP address is whitelisted in MongoDB Atlas");
    console.error("4. Check if your database user exists and has proper permissions");
    console.error("5. Verify the connection string format: mongodb+srv://username:password@cluster.mongodb.net/database");
    // Don't exit - let the server continue running, but database operations will fail
  });

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});

db.on("disconnected", () => {
  console.warn("MongoDB disconnected. Attempting to reconnect...");
});
