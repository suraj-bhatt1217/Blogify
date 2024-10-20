import axios from "axios";

import useUser from "../hooks/useUser";

import { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    console.log("User object:", user); // Log user object
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `http://localhost:3000/api/articles/${articleName}/comments`,
      {
        text: commentText,
      },
      {
        headers,
      }
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
    setName("");
    setCommentText("");
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
