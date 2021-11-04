import React, { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <nav className="header">
      {user == undefined ? (
        <ul className="header__ulist">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Header;
