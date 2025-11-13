import fs from "fs";
import admin from "firebase-admin";
import "dotenv/config.js";
import express from "express";
import "../config/database.js";
import { Blog } from "../models/Blog.js";
import logger from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//connect to firebase project
const credentialsPath = path.join(__dirname, "../credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

// CORS configuration - allows both local development and production URLs
const allowedOrigins = [
  'http://localhost:5173', // Vite default port
  'http://localhost:3000',
  'https://blogify-t7nc.vercel.app',
  process.env.FRONTEND_URL, // From environment variable if set
];

app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc)
      if(!origin) return callback(null, true);
      
      if(allowedOrigins.indexOf(origin) === -1){
        console.log("Origin allowed:", origin);
        // Add the origin to allowed list if it's from vercel
        if(origin.endsWith('.vercel.app')) {
          allowedOrigins.push(origin);
          return callback(null, true);
        }
        return callback(null, true); // For development - allow all origins
      }
      return callback(null, true);
    },
    credentials: true
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../blogify-fe/dist")));

app.use(async (req, res, next) => {
  console.log("Received headers:", req.headers);
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }
  req.user = req.user || {};
  next();
});

app.get("/api/articles/:name", async (req, res) => {
  try {
    const { name } = req.params;
    console.log(`Fetching article: ${name}`);
    
    // Get uid if available, otherwise set to null
    const uid = req.user?.uid || null;
    console.log(`Request user ID: ${uid || 'Not authenticated'}`);
    
    const blog = await Blog.findOne({ name });
    
    if (blog) {
      // Ensure upvoteIds and comments exist
      const upvoteIds = blog.upvoteIds || [];
      const comments = blog.comments || [];
      
      // Sort comments by creation date (newest first)
      comments.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
      
      // Only allow upvote if user is authenticated and hasn't already upvoted
      const canUpvote = uid && !upvoteIds.includes(uid);
      console.log("User can upvote:", canUpvote);
      
      // Return the blog with the canUpvote flag and sorted comments
      res.json({ 
        ...blog._doc, 
        canUpvote,
        comments,
        upvotes: blog.upvotes || 0
      });
    } else {
      console.log(`Article not found: ${name}`);
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Error in article fetch endpoint:", error);
    res.status(500).json({ error: "Server error while fetching article" });
  }
});

// Protected routes middleware - all routes below this will require authentication
const requireAuth = (req, res, next) => {
  if (req.user && req.user.uid) {
    next();
  } else {
    res.status(401).send("Authentication required");
  }
};

app.put("/api/articles/:name/upvote", requireAuth, async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  try {
    const blog = await Blog.findOne({ name });
    if (blog) {
      const upvoteIds = blog.upvoteIds || [];
      console.log("Current upvoteIds:", upvoteIds);
      console.log("User ID:", uid);
      const canUpvote = uid && !upvoteIds.includes(uid);
      if (canUpvote) {
        const updatedblog = await Blog.findOneAndUpdate(
          { name },
          { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } },
          { new: true }
        );
        // After upvoting, user can no longer upvote
        res.json({ ...updatedblog._doc, canUpvote: false });
      } else {
        res.status(403).json({ error: "You have already upvoted this article." });
      }
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Error in upvote endpoint:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/articles/:name/comments", requireAuth, async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email, uid } = req.user;
  
  console.log("User attempting to comment:", req.user);

  try {
    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: "Comment text cannot be empty" });
    }

    const blog = await Blog.findOne({ name });
    if (!blog) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Create comment with timestamp
    const comment = {
      postedBy: email,
      text: text.trim(),
      createdAt: new Date()
    };

    const updatedBlog = await Blog.findOneAndUpdate(
      { name },
      { $push: { comments: comment } },
      { new: true }
    );
    
    // Return updated blog with canUpvote flag
    const upvoteIds = updatedBlog.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);
    
    res.json({ ...updatedBlog._doc, canUpvote });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ error: "Server error while posting comment" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../blogify-fe/dist/index.html"));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log("server listening on port 3000");
  });
}

// Export the Express API for Vercel serverless deployment
export default app;
