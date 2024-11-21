import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Home/HomePage.css'
import { IBlogDetails } from "../../interface/appInterface";
import { getBlogsForUser, deleteBlog } from "../../api/apiCalls";
import { useAuth } from "../../context/AuthContext";

const DashboardPage: React.FC = () => {
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<IBlogDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Extract fetchBlogs function
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await getBlogsForUser(authToken, logout);
      setBlogs(response);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    const isDeleted: boolean = await deleteBlog(authToken, id, logout)
    if (isDeleted) {
      fetchBlogs();
    }
  }

  useEffect(() => {
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
                <img src={blog.profilePicture} alt={blog.userName} className="profile-picture" />
            </div>
          </div>
          <div className="blog-content">
            <p>{blog.content}</p>
          </div>
          <div className="blog-footer">
              <div className='button-container'>
                <button className='cancel-button' onClick={() => handleDeleteBlog(blog.id) }>Delete Blog</button>
              </div>
            </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default DashboardPage;
