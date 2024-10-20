import articles from "../data/article-content";

import "animate.css";

import ArticlesList from "../components/ArticlesList";

const ArticlesListPage = () => {
  return (
    <>
      <h1 className=" animate__animated animate__bounceInUp">Articles</h1>
      <ArticlesList articles={articles} />
    </>
  );
};

export default ArticlesListPage;
