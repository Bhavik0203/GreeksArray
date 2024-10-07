import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Latestblogs = () => {
  // State to store blog data
  const [blogs, setBlogs] = useState([]);
  
  // State to track if data is loading
  const [loading, setLoading] = useState(true);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          'http://geeksarray-001-site5.atempurl.com/api/Blog?blogId=0&myBlogs=false'
        );
        setBlogs(response.data); // Update state with the fetched blog data
        setLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Display loading indicator or the latest three blog posts
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="max-w-6xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
        <div className="max-w-md ">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-12 text-left leading-10">
            Stay updated with the latest blog posts.
          </h2>
        </div>
        {loading ? (
         <div
         style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height: '100vh',
           backgroundColor: 'white', // Optional background color
         }}
       >
         {loading && <PacmanLoader size={50} color="#000" />}
       </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8">
            {blogs.slice(0, 3).map((blog) => ( // Display only the first three blog posts
              <div key={blog.id} className="bg-white rounded overflow-hidden">
                <img
                  src={blog.imageUrl || 'https://via.placeholder.com/300'} // Fallback image if `imageUrl` is missing
                  alt={blog.title || 'Blog Image'}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {blog.blogTitle || 'Untitled Blog'}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {blog.blogDescription ? blog.blogDescription.substring(0, 100) : 'No description available'}... {/* Shortened description */}
                  </p>
                  {/* <p className="text-gray-800 text-[13px] font-semibold mt-4">
                    {blog.updatedat ? new Date(blog.updatedat).toLocaleDateString() : 'Unknown Date'} 
                  </p> */}
                  <Link 
                    to={`/blogs/${blog.id}`} // Link to the detailed blog page
                    className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-purple-600 hover:bg-purple-700 text-white text-[13px]"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Latestblogs
