import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "animate.css";

import articles from "../data/article-content";

import axios from "axios";

import NotFoundPage from "./NotFoundPage";

import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

//hooks
import useUser from "../hooks/useUser";

const apiUrl = import.meta.env.VITE_API_URL

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      console.log("Sending headers:", headers);
      try {
        const response = await axios.get(
          `${apiUrl}/api/articles/${articleId}`,
          { headers }
        );
        const newArticleInfo = response.data;
        console.log("API response:", newArticleInfo);
        setArticleInfo(newArticleInfo);
      } catch (error) {
        console.error("Error fetching article info:", error);
      }
    };
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user, articleId]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    try {
      const token = user && (await user.getIdToken());
      if (!token) {
        console.error("No authentication token available");
        return;
      }
      
      const headers = { authtoken: token };
      console.log("Sending upvote request with headers:", headers);
      
      const response = await axios.put(
        `${apiUrl}/api/articles/${articleId}/upvote`,
        null,
        { headers }
      );
      
      const updatedArticle = response.data;
      console.log("Upvote successful:", updatedArticle);
      setArticleInfo(updatedArticle);
    } catch (error) {
      console.error("Error upvoting article:", error.response?.data || error.message);
      alert("Failed to upvote: " + (error.response?.data || "Please try again later"));
    }
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1 className=" animate__animated animate__bounceIn">{article.title}</h1>

      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvotes.</p>
      </div>

      {article.content.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
      {user ? (
        <AddCommentForm
          setArticleInfo={setArticleInfo}
          articleName={articleId}
        />
      ) : (
        <button>Log in to add comment</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
