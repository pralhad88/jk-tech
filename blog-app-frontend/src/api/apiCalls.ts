import axios from "axios";
import { IBlogCreate, LoginResponse, IBlogDetails, IBlogDetailsWithUser } from '../interface/appInterface'

export const getBlogsForUser = async(authToken: string, logout: any): Promise<IBlogDetails[]> => {
  try {
    const config = {
      method: 'get',
      url: 'http://localhost:5000/blog/blogdetails',
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
      data: ''
    };
    const response = await axios(config);
    return response.data; // Assuming the response is an array of blogs
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    if (error['status'] === 401) {
      logout()
    }
    return [];
  }
}

export const deleteBlog = async (authToken: string, id: number, logout: any): Promise<boolean> => {
  try {
    const config = {
      method: 'delete',
      url: `http://localhost:5000/blog/${id}`,
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
      data: ''
    };
    await axios(config);
    return true
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    if (error['status'] === 401) {
      logout()
    } else {
      alert(`Access Denied!`)
    }
    return false
  }
}

export const getBlogsWithUserDetails = async (authToken: string, logout: any): Promise<IBlogDetailsWithUser[]> => {
  try {
    const config = {
      method: 'get',
      url: 'http://localhost:5000/blog/',
      headers: { 
        'Authorization': `Bearer ${authToken}`
      },
      data: ''
    };
    const response = await axios(config);
    return response.data; // Assuming the response is an array of blogs
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    if (error['status'] === 401) {
      logout()
    }
    return [];
  }
};

export const createBlog = async (
  token: string,
  blogData: IBlogCreate
): Promise<any> => {
  const response = await fetch("http://localhost:5000/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
};


export const userLogIn = async (
  accessToken: any,
  provider: string 
): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token: accessToken, provider}),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
};

export const getListOfBlogs = async (): Promise<IBlogDetails[]> => {

  const response = await fetch("http://localhost:5000/blog/blogdetails");

  if (!response.ok) {
    throw new Error("Failed to get blog details");
  }

  return await response.json();
}


export const getBlogById = async (id: number): Promise<IBlogDetailsWithUser | null> => {
  const response = await fetch(`http://localhost:5000/blog/blogdetails/${id}`);

  if (!response.ok) {
    throw new Error("Failed to get blog details");
  }

  return await response.json();
}
