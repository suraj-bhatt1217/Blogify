import { useParams, Link } from "react-router-dom";
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
  const [articleInfo, setArticleInfo] = useState(null); // null = loading, {} = loaded
  const [isLoadingArticle, setIsLoadingArticle] = useState(true);
  const { articleId } = useParams();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      setIsLoadingArticle(true);
      try {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        
        const fullUrl = `${normalizedApiUrl}/api/articles/${articleId}`;
        const response = await axios.get(fullUrl, { headers });
        
        const newArticleInfo = response.data;
        // Ensure we set all required fields
        setArticleInfo({
          upvotes: newArticleInfo.upvotes || 0,
          comments: newArticleInfo.comments || [],
          canUpvote: newArticleInfo.canUpvote !== undefined ? newArticleInfo.canUpvote : false
        });
      } catch (error) {
        console.error("Error fetching article info:", error.message);
        // Set default values on error
        setArticleInfo({
          upvotes: 0,
          comments: [],
          canUpvote: false
        });
      } finally {
        setIsLoadingArticle(false);
      }
    };
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user, articleId]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    if (!articleInfo) return;
    
    try {
      const token = user && (await user.getIdToken());
      if (!token) {
        alert("You must be logged in to upvote");
        return;
      }
      
      // Optimistic update - update UI immediately
      setArticleInfo(prev => ({
        ...prev,
        upvotes: prev.upvotes + 1,
        canUpvote: false
      }));
      
      const headers = { authtoken: token };
      const response = await axios.put(
        `${normalizedApiUrl}/api/articles/${articleId}/upvote`,
        null,
        { headers }
      );
      
      const updatedArticle = response.data;
      // Update with server response
      setArticleInfo({
        upvotes: updatedArticle.upvotes || 0,
        comments: updatedArticle.comments || [],
        canUpvote: updatedArticle.canUpvote !== undefined ? updatedArticle.canUpvote : false
      });
    } catch (error) {
      // Revert optimistic update on error
      setArticleInfo(prev => ({
        ...prev,
        upvotes: prev.upvotes - 1,
        canUpvote: true
      }));
      console.error("Error upvoting article:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || error.response?.data || error.message;
      alert("Failed to upvote: " + errorMessage);
    }
  };

  if (!article) {
    return <NotFoundPage />;
  }

  const canUpvote = articleInfo?.canUpvote ?? false;

  return (
    <>
      <h1 className="article-title">{article.title}</h1>

      {isLoadingArticle ? (
        <div className="loading-skeleton">
          <div className="skeleton upvote-skeleton"></div>
          <div className="skeleton content-skeleton"></div>
          <div className="skeleton content-skeleton"></div>
        </div>
      ) : (
        <>
          <div className="upvotes-section">
            {user ? (
              <button 
                onClick={addUpvote}
                disabled={!canUpvote || isLoadingArticle}
                className={`upvote-btn ${canUpvote ? 'upvote-active' : 'upvote-disabled'}`}
              >
                {canUpvote ? "👍 Upvote" : "✓ Already Upvoted"}
              </button>
            ) : (
              <button disabled className="upvote-btn upvote-disabled">
                Log in to upvote
              </button>
            )}
            <p className="upvote-count">
              {articleInfo?.upvotes ?? 0} upvote{(articleInfo?.upvotes ?? 0) !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="article-content">
            {article.content.map((para, idx) => (
              <p key={idx} className="article-paragraph">{para}</p>
            ))}
          </div>
          
          {user ? (
            <AddCommentForm
              setArticleInfo={setArticleInfo}
              articleName={articleId}
            />
          ) : (
            <div className="login-prompt">
              <p>Please <Link to="/login">log in</Link> to add a comment.</p>
            </div>
          )}

          <CommentsList comments={articleInfo?.comments || []} />
        </>
      )}
    </>
  );
};

export default ArticlePage;
