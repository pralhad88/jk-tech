import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { IBlogDetails } from "../../interface/appInterface";
import { getListOfBlogs } from "../../api/apiCalls";

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<IBlogDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getListOfBlogs();
        setBlogs(data);
      } catch (error) {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="homepage">
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-item">
            <div className="blog-header">
              <h2 className="blog-title">{blog.title}</h2>
              <span className="blog-author">Author: {blog.userName}</span>
            </div>
            <p className="blog-content">{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
