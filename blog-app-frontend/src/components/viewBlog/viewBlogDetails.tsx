import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IBlogDetailsWithUser } from "../../interface/appInterface";
import { getBlogById } from "../../api/apiCalls";
import './viewBlogDetails.css'

const ViewBlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<IBlogDetailsWithUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogDetails = await getBlogById(Number(id)); // Fetch details by ID
        setBlog(blogDetails);
      } catch (error) {
        console.error('Failed to fetch blog details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div>Loading blog details...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="blog-details">
    <div className="blog-header">
      <div className="title">{blog.title}</div>
      <img src={blog.user.profilePicture} alt={blog.user.name} className="profile-picture" />
    </div>
    <div className="blog-content">
      <p>{blog.content}</p>
    </div>
    <div className="blog-footer">
      <p>Author: {blog.user.name}</p>
      <div className='button-container'>
      <button className='cancel-button back-btn' onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  </div>
  );
};  

export default ViewBlogDetails;
