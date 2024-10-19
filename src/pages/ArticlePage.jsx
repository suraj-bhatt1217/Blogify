import { useParams } from "react-router-dom";

import articles from "../data/article-content";

import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </>
  );
};

export default ArticlePage;
