import axios from "axios";

import useUser from "../hooks/useUser";

import { useState } from "react";

// Get API URL from environment variable or use fallback
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log('[AddCommentForm] Using API URL:', apiUrl);

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    try {
      // Validate comment text
      if (!commentText || commentText.trim() === '') {
        alert("Comment text cannot be empty");
        return;
      }

      // Check authentication
      const token = user && (await user.getIdToken());
      if (!token) {
        alert("You must be logged in to comment");
        return;
      }

      console.log("User object:", user); // Log user object
      const headers = { authtoken: token };
      
      console.log("Sending comment request with token", {
        url: `${apiUrl}/api/articles/${articleName}/comments`,
        headers: headers,
        text: commentText
      });

      const response = await axios.post(
        `${apiUrl}/api/articles/${articleName}/comments`,
        {
          text: commentText,
        },
        {
          headers,
        }
      );
      
      const updatedArticle = response.data;
      console.log("Comment added successfully:", updatedArticle);
      setArticleInfo(updatedArticle);
      setName("");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error.response?.data || error.message);
      alert("Failed to add comment: " + (error.response?.data || "Please try again later"));
    }
  };

  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      {user && <p>You are posting as {user.email}</p>}
      <label>
        Comment:
        <textarea
          rows="4"
          cols="50"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          name=""
          id=""
        ></textarea>
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
