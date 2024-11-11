import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import blogimg from "../assets/Images/banners/blogimg2.png";
import BlogFilter from "./BlogFilter";
import PacmanLoader from 'react-spinners/PacmanLoader';

const Allblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); // State to hold filtered blogs
  const [searchValue, setSearchValue] = useState(""); // State for search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3000 milliseconds = 3 seconds
    return () => clearTimeout(timer); // Cleanup timer when component unmounts
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://geeksarray-001-site5.atempurl.com/api/Blog?isActive=true",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs: " + response.statusText);
        }

        const data = await response.json();

        // Sort blogs by creation date
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );

        setBlogs(sortedBlogs);
        setFilteredBlogs(sortedBlogs); // Initialize filtered blogs with the full list
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    // Show the back-to-top button when scrolling down
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Filter blogs based on the search value (title, description, or category)
    const filtered = blogs.filter(
      (blog) =>
        blog.blogDescription.toLowerCase().includes(value.toLowerCase()) ||
        blog.category.toLowerCase().includes(value.toLowerCase()) ||
        blog.title?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  // Function to update search value when a category is clicked in BlogFilter component
  const handleCategoryClick = (category) => {
    setSearchValue(category);

    // Filter blogs based on the selected category
    const filtered = blogs.filter((blog) =>
      blog.category.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  // Scroll to the top of the page when the arrow is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      // <div className="flex justify-center items-center min-h-screen bg-gray-100">
      //   <p className="text-xl font-semibold text-green-500 animate-pulse">
      //     Loading...
      //   </p>
      // </div>
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
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section>
        <Header />
        <br></br>
        <div className="flex justify-center lg:hidden"> {/* Hide on large screens and above */}
            <form className="w-full px-4">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  value={searchValue} // Bind input value to state
                  onChange={handleSearchChange} // Handle input changes
                  className="w-full border h-10 shadow p-4 rounded-full dark:text-gray-900 dark:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Search"
                />
                <button type="button" className="absolute top-2.5 right-3">
                  <svg
                    className="text-teal-400 h-5 w-5 fill-current dark:text-teal-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 56.966 56.966"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

        <h1 className="text-4xl text-black p-3"><b>Latest Blogs by Geeks</b></h1>
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 p-8">
          {/* Left Section: Latest Blogs */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <h2 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Posts</h2>
            <ul className="space-y-4">
  {filteredBlogs
    .sort((a, b) => b.id - a.id) // Sort blogs by id in descending order
    .map((blog) => (
      <li key={blog.id}>
        <Link
          to={`/blogs/${blog.id}`}
          className="flex items-center space-x-2"
        >
          <img
            src={`${blog.blogImage}`}
            alt="Recent Post Icon"
            className="w-11 h-11 rounded-full"
          />
          <span><b>{blog.blogTitle}</b></span>
        </Link>
        <span>
          {blog.blogDescription.length > 90
            ? `${blog.blogDescription.substring(0, 90)}...`
            : blog.blogDescription}
        </span>
        <p className="text-sm text-gray-500">
          By <span className="text-orange-500">{blog.writer}</span> in {blog.category}
        </p>
      </li>
    ))}
</ul>

          </div>
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <h2 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '16px' }}>Popular Blogs</h2>

            <ul className="space-y-4">
  {filteredBlogs
    .sort((a, b) => b.likes.length - a.likes.length) // Sort blogs by likes in descending order
    .map((blog) => (
      <li key={blog.id}>
        {" "}
        {/* Assuming each blog has a unique 'id' */}
        <Link
          to={`/blogs/${blog.id}`}
          className="flex items-center space-x-2"
        >
           <img
            src={`${blog.blogImage}`}
            alt="Recent Post Icon"
            className="w-11 h-11 rounded-full"
          />
          <span><b>{blog.blogTitle}</b></span>
        </Link>
        <span>
          {blog.blogDescription.length > 90
            ? `${blog.blogDescription.substring(0, 90)}...`
            : blog.blogDescription}
        </span>
        <p className="text-sm text-gray-500">
          By <span className="text-orange-500">{blog.writer}</span> in {blog.category}
        </p>{" "}
        {/* Using writer and category from the API */}
      </li>
    ))}
</ul>

          </div>
          {/* Right Section: Search and Recommended Blogs */}
          <div className="w-full lg:w-2/6 py-4 space-y-6 bg-gray-100 sticky" style={{ borderRadius: "20px" }}>
            {/* Search Bar */}
            <div className="flex justify-center">
              <form className="w-full px-4">
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    value={searchValue} // Bind input value to state
                    onChange={handleSearchChange} // Handle input changes
                    className="w-full border h-10 shadow p-4 rounded-full dark:text-gray-900 dark:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Search"
                  />
                  <button type="button" className="absolute top-2.5 right-3">
                    <svg
                      className="text-teal-400 h-5 w-5 fill-current dark:text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 56.966 56.966"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Recommended Blogs */}
            <BlogFilter onCategoryClick={handleCategoryClick} />
          </div>
        </div>

        {/* Back to Top Arrow */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 w-8 right-8 bg-blue-900 text-white p-2 shadow-lg hover:bg-gray-800 transition"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}

       
      </section>
      <Footer />
    </>
  );
};

export default Allblogs;
