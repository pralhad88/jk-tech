import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/HomePage.css'
import { IBlogDetailsWithUser } from "../../interface/appInterface";
import { getBlogsWithUserDetails } from "../../api/apiCalls";
import { useAuth } from "../../context/AuthContext";

const DashboardPage: React.FC = () => {
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<IBlogDetailsWithUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Replace this with an API call to fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await getBlogsWithUserDetails(authToken, logout);
        const data = response;
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage">
    <ul className="blog-list">
      {blogs.map((blog) => (
        <li key={blog.id} className="blog-item">
          <div className="blog-header">
            <h2 className="blog-title">{blog.title}</h2>
            <div className="blog-author">
                <img src={blog.user.profilePicture} alt={blog.user.name} className="profile-picture" />
            </div>
          </div>
          <p className="blog-content">{blog.content}</p>

          <div className="blog-footer">
              <span className="author">Author: {blog.user.name}</span>
            </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default DashboardPage;
