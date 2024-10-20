import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import articles from "../data/article-content";

import axios from "axios";

import NotFoundPage from "./NotFoundPage";

import CommentsList from "../components/CommentsList";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
  });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      console.log(`Fetching article with ID: ${articleId}`);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/articles/${articleId}`
        );
        const newArticleInfo = response.data;
        console.log("API response:", newArticleInfo);
        setArticleInfo(newArticleInfo);
      } catch (error) {
        console.error("Error fetching article info:", error);
      }
    };
    loadArticleInfo();
  }, []);

  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvotes.</p>
      {article.content.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
