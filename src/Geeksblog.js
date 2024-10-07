import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Link } from 'react-router-dom';
import bannerblog from './assets/Images/banners/Banner 4.jpg'

const Geeksblog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://geeksarray-001-site5.atempurl.com/api/Blog?myBlogs=true', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs: ' + response.statusText);
        }
        
        const data = await response.json();
        setBlogs(data); // Assuming the response is an array of blog objects
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header/>
      <div className="mb-8">
        <img 
          src={bannerblog} // You can replace this with the actual path if needed
          alt="Banner" 
          className="w-full h-[300px] object-cover"
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Banner Section */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 mb-8">
          {/* Recent Posts Column */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <li key={blog.id}> {/* Assuming each blog has a unique 'id' */}
                  <Link to={`/blogs/${blog.id}`} className="flex items-center space-x-2">
                    <img
                      src={blog.blogImage} // Using blogImage from the API
                      alt="Recent Post Icon"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{blog.blogTitle}</span> {/* Using blogTitle from the API */}
                  </Link>
                  <p className="text-sm text-gray-500">By {blog.writer} in {blog.category}</p> {/* Using writer and category from the API */}
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Columnists Column */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">Featured Columnists</h2>
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <li key={blog.id}> {/* Assuming each blog has a unique 'id' */}
                  <Link to={`/blogs/${blog.id}`} className="flex items-center space-x-2">
                    <img
                      src={blog.blogImage} // Using blogImage from the API
                      alt="Recent Post Icon"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{blog.blogTitle}</span> {/* Using blogTitle from the API */}
                  </Link>
                  <p className="text-sm text-gray-500">By {blog.writer} in {blog.category}</p> {/* Using writer and category from the API */}
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Questions Column */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Latest Blogs</h2>
            <ul className="space-y-4">
              {/* You can list the latest questions here */}
              <li>
                <Link to="" className="text-blue-500 hover:underline">
                  How to add OAuth Authentication in SOAP API's in VB.Net?
                </Link>
              </li>
              {/* More questions */}
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Geeksblog;
