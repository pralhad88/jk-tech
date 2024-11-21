import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("");
    return initials.toUpperCase();
  };

  return (
    <header className="header">
      <div className="brand">JK Tech Blog</div>
      <div className="auth-container">
        {isAuthenticated && user ? (
          <div >
            <button
              onClick={() => navigate("/dashboard/create-blog")}
              className="create-blog-btn"
              >
              Create Blog</button>
            <div className="profile-container" onMouseEnter={openDropdown}>
              <div
                className="profile-icon"
                title={user.name}
              >
                {getInitials(user.name)}
              </div>
            {isDropdownOpen && (
              <div className="dropdown">
                <span onClick={() => setIsDropdownOpen(false)} style={{display:"flex", justifyContent:"flex-end", cursor:"pointer"}}>X</span>
                <p className="dropdown-text">{user.name}</p>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
          </div>
        ) : (
          <div className="button-container">
            <button
              className="login-button"
              onClick={() => navigate("/login")} // Redirect to login route
            >
              Login
          </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
