import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-content">
      <h1>Welcome to Blogify</h1>
      <p>
        Your ultimate destination for in-depth technology articles and tutorials. Blogify is a modern blogging platform where developers and tech enthusiasts can explore comprehensive guides on the latest web development technologies, best practices, and industry trends.
      </p>
      <p>
        Whether you're a beginner looking to learn the fundamentals or an experienced developer seeking to deepen your knowledge, our articles cover everything from frontend frameworks like React to backend technologies like Node.js and database management with MongoDB.
      </p>
      <p>
        Our platform features interactive articles where you can upvote your favorite content and engage with the community through comments. Join our growing community of developers sharing knowledge and learning together. <Link to="/articles">Explore our articles</Link> to get started on your learning journey!
      </p>
      <div style={{ marginTop: "2rem" }}>
        <h2>What You'll Learn</h2>
        <ul>
          <li><strong>React:</strong> Master modern frontend development with React hooks, components, and performance optimization techniques.</li>
          <li><strong>Node.js:</strong> Build scalable server-side applications with Node.js, Express, and learn about asynchronous programming.</li>
          <li><strong>MongoDB:</strong> Understand NoSQL database design, queries, indexing, and data modeling for modern applications.</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
