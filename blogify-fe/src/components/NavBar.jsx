// npm modules
import { Link, useNavigate } from "react-router-dom";

import useUser from "../hooks/useUser";

import { getAuth, signOut } from "firebase/auth";

import "animate.css";

const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="animate__animated animate__bounceIn">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="animate__animated animate__bounceIn">
            About
          </Link>
        </li>
        <li>
          <Link to="/articles" className="animate__animated animate__bounceIn">
            Articles
          </Link>
        </li>
      </ul>
      <div className="nav-right">
        {user ? (
          <button
            onClick={() => {
              signOut(getAuth());
            }}
            className="animate__animated animate__pulse"
          >
            Log out
          </button>
        ) : (
          <button
            className="animate__animated animate__pulse"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
