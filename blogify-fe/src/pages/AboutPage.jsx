const AboutPage = () => {
  return (
    <div className="about-content">
      <h1>About Blogify</h1>
      <p>
        Blogify is a modern, interactive blogging platform built with cutting-edge web technologies. Our mission is to provide developers and tech enthusiasts with high-quality, in-depth articles on the latest web development technologies and best practices.
      </p>
      <p>
        This platform is built using React for the frontend, providing a fast and responsive user experience. The backend is powered by Node.js and Express, ensuring scalable and efficient server-side operations. MongoDB serves as our database, offering flexibility and performance for our content management needs.
      </p>
      <p>
        We believe in learning through practical examples and community engagement. That's why Blogify features interactive elements like upvoting articles and commenting, allowing readers to engage with content and share their knowledge with the community.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>Frontend:</strong> React, React Router, Vite, CSS3</li>
          <li><strong>Backend:</strong> Node.js, Express.js, MongoDB, Mongoose</li>
          <li><strong>Authentication:</strong> Firebase Authentication</li>
          <li><strong>Deployment:</strong> Vercel</li>
        </ul>
      </div>
      <p style={{ marginTop: "2rem" }}>
        Join our community of developers and start learning today! Whether you're building your first web application or looking to expand your skills, Blogify has something for everyone.
      </p>
    </div>
  );
};

export default AboutPage;
