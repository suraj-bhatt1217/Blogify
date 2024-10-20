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

const Blog = mongoose.model("Blog", blogSchema);

export { Blog };
