import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/HomePage.css'
import { IBlogDetailsWithUser, IBlogDetails } from "../../interface/appInterface";
import { getBlogsWithUserDetails, getBlogById } from "../../api/apiCalls";
import { useAuth } from "../../context/AuthContext";

const HomePage: React.FC = () => {
  const { authToken, logout } = useAuth();
  const [blogs, setBlogs] = useState<IBlogDetailsWithUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // React Router hook for navigation

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

  const handleMoreDetails = (id: number) => {
    navigate(`/viewblog/${id}`); // Redirect to details page with blog ID
  };

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
          <div className="blog-footer">
              <span className="author">Author: {blog.user.name}</span>
              <div className='button-container'>
                <button className='more-details-btn' onClick={() => handleMoreDetails(blog.id) }> Blog Details</button>
              </div>
            </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default HomePage;
