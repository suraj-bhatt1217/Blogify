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
const Blog = mongoose.model("Blog", blogSchema, "blogs");

export { Blog };
