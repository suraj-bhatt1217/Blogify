// npm modules
import { Route, Routes } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticlePage from "./pages/ArticlePage";

// css
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Blogify</h1>
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesListPage />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
// creating your blog pages
