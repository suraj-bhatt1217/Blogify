import axios from "axios";

import { useState } from "react";
const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const response = await axios.post(
      `http://localhost:3000/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: commentText,
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
      <label>
        Name:
        <input
          type="text"
          name=""
          id=""
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
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
