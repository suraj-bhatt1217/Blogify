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
        <HomePage />
        <AboutPage />
        <ArticlesListPage />
        <ArticlePage />
      </div>
    </div>
  );
}

export default App;
// creating your blog pages
