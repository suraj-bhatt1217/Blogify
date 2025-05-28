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

// Get API URL from environment variable or use fallback
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Normalize API URL to avoid duplication
// If apiUrl is '/api', use empty string to prevent duplication
const normalizedApiUrl = apiUrl === '/api' ? '' : apiUrl;

console.log('Using API URL:', apiUrl);
console.log('Normalized API URL:', normalizedApiUrl);

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
      try {
        console.log(`Attempting to fetch article: ${articleId} from ${normalizedApiUrl}`);
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        console.log("Request headers:", headers);
        
        const fullUrl = `${normalizedApiUrl}/api/articles/${articleId}`;
        console.log("Full request URL:", fullUrl);
        
        const response = await axios.get(fullUrl, { headers });
        
        const newArticleInfo = response.data;
        console.log("API response:", newArticleInfo);
        setArticleInfo(newArticleInfo);
      } catch (error) {
        console.error("Error fetching article info:", error.message);
        console.error("Full error object:", error);
        console.error("Response data (if available):", error.response?.data);
        console.error("Response status (if available):", error.response?.status);
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
        `${normalizedApiUrl}/api/articles/${articleId}/upvote`,
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
