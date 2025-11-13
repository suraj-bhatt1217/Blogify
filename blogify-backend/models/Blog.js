import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    name: String,
    upvotes: Number,
    upvoteIds: { type: [String], default: [] },
    comments: [Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

// Explicitly set the collection name to match what's in your database
// If your collection is "Blogs" (capitalized), use "Blogs", otherwise use "blogs"
const Blog = mongoose.model("Blog", blogSchema, "Blogs");

export { Blog };
