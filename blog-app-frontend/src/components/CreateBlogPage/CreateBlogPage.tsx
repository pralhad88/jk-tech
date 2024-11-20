import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';
import { useAuth } from "../../context/AuthContext";
import { createBlog } from "../../api/apiCalls";

const CreateBlog: React.FC = () => {
  const { authToken } = useAuth();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }

    await createBlog(authToken, {title, content})
    navigate('/dashboard');
  };

  return (
    <div className="create-blog-container">
      <form onSubmit={handleSubmit} className="create-blog-form">
        <div className="form-group">
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Blog Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
            required
          />
        </div>
        <div className='button'>
        <button type="submit" className="submit-btn">
          Create Blog
        </button>

        <button className="cancel-btn" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>        
        </div>
        
      </form>
    </div>
  );
};

export default CreateBlog;
