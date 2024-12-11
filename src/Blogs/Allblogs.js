import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import blogimg from "../assets/Images/banners/blogimg2.png";
import BlogFilter from "./BlogFilter";
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Helmet } from "react-helmet";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'; 
import { faThumbsUp, faComment, faBookmark, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import TabNavigation from "./TabNavigation";

const Allblogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]); // State to hold filtered blogs
  const [searchValue, setSearchValue] = useState(""); // State for search input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLiked, setIsLiked] = useState(false); 
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null); // Initialize 'blog' and 'setBlog'
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [activeTab, setActiveTab] = useState("forYou");
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 blogs per page
  const [currentPage, setCurrentPage] = useState(1);
  
  // Adjust items per page based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(5); // Show 5 blogs on mobile
      } else {
        setItemsPerPage(10); // Show 10 blogs on larger screens
      }
    };
  
    // Call handleResize on component mount and window resize
    handleResize();
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Calculate pagination variables
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(startIdx, startIdx + itemsPerPage);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleSearchChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchValue(value);

    const filtered = blogs.filter((blog) => {
      const matchesDescription = blog.blogDescription.toLowerCase().includes(value);
      const matchesTitle = blog.title?.toLowerCase().includes(value);
      const matchesTags = blog.tags.some((tag) => tag.toLowerCase().includes(value));

      return matchesDescription || matchesTitle || matchesTags;
    });

    setFilteredBlogs(filtered);
  };

  const handleCategoryClick = (selectedTag) => {
    const value = selectedTag.trim().toLowerCase(); // Use the clicked tag as the value
    setSearchValue(value); // Update the search bar value
  
    // Filter blogs based on title, description, or matching any tag
    const filtered = blogs.filter((blog) => {
      const matchesDescription = blog.blogDescription.toLowerCase().includes(value);
      const matchesTitle = blog.title?.toLowerCase().includes(value);
      const matchesTags = blog.tags.some((tag) => tag.toLowerCase().includes(value));
  
      return matchesDescription || matchesTitle || matchesTags;
    });
  
    setFilteredBlogs(filtered); // Update the filtered blogs
  };
  
useEffect(() => {

    const timer = setTimeout(() => setLoading(false), 3000); // 3000 milliseconds = 3 seconds
    return () => clearTimeout(timer); // Cleanup timer when component unmounts
  }, []);

  useEffect(() => {
    
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://geeksarray-001-site5.atempurl.com/api/Blog",
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
  
  
  // Function to filter blogs by matching exact tags from a selected array
  
  
  

  // Scroll to the top of the page when the arrow is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleLikeClick = () => {
    if (!blog) return;

    var formData = new FormData();
    formData.append("slug", slug);
    formData.append("isLiked", !isLiked); // Toggle the like status

   
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`;

    
    axios
      .post('http://geeksarray-001-site5.atempurl.com/api/Blog/likes', formData)
      .then(response => {
        console.log('Like successful:', response.data);
        setIsLiked(!isLiked); 
        setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1); 
      })
      .catch(error => console.error('Error liking the blog:', error));
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
    <Helmet>
        <title> Allblogs - GeeksArray</title>
        <meta name="description" content="Welcome to My Awesome Website. Discover our services and explore more through our latest notices and updates." />
        <meta name="keywords" content="Awesome Website, React, SEO, Notices, Services" />
        <meta property="og:title" content="Home - My Awesome Website" />
 
     
      </Helmet>
      <section>
        <Header />
        {/* <br></br> */}
        <div className="flex justify-center lg:hidden mt-12"> {/* Hide on large screens and above */}
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


          {/* <h1 className="text-4xl text-black" style={{ padding: "20px 0 0 70px" }}>
  <b>Latest Blogs by Geeks</b>
</h1> */}
    
    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 p-4">
          {/* Left Section: Latest Blogs */}
          <div
  className="w-full lg:w-1/3 mb-8 lg:mb-0 lg:min-w-[800px] lg:px-5 lg:ml-5 lg:mr-0 lg:mb-10"
  style={{
    // These styles will be applied only on desktop (lg) and larger screens
    display: 'block', // Ensures it's visible on desktop
  }}
>

<br></br>
          
          <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>Recent Posts</h2>
          <div className="max-w-6xl mx-auto p-4">
          <ul className="space-y-8">
  {currentBlogs
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sort by updatedAt descending
    .map((blog) => (
      <li
        key={blog.id}
        className="flex flex-col md:flex-row items-start border rounded-lg shadow-md p-4 bg-white"
      >
        {/* Blog Image */}
        <img
          src={
            blog.blogImage && blog.blogImage.length > 1
              ? blog.blogImage[0]
              : blog.blogImage
          }
          alt="Blog thumbnail"
          className="w-full md:w-40 h-32 object-cover rounded-md m-2"
        />

        {/* Blog Content */}
        <div className="flex-1 md:ml-6 mt-4 md:mt-0">
          <Link
            to={`/blogs/${blog.slug}`}
            className="block text-xl font-bold text-black hover:underline"
          >
            {blog.blogTitle}
          </Link>

          <p className="mt-2 text-gray-700">
            {blog.blogDescription.length > 180
              ? `${blog.blogDescription.substring(0, 180)}...`
              : blog.blogDescription}
          </p>

          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">by</span>
              <span className="text-orange-500">{blog.writer}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold">in</span>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-red-400 text-white text-xs py-1 px-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-gray-500 text-sm mt-4">
            <span>{new Date(blog.updatedAt).toDateString()}</span>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
              <span className="likes-count">{blog.likes.length}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <FontAwesomeIcon icon={faComment} className="text-xl" />
              <span className="comment-count">{blog.comments.length}</span>
            </button>
          </div>
        </div>
      </li>
    ))}
</ul>



  {/* Pagination */}
  <div className="flex justify-center mt-6 space-x-2">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      className={`px-4 py-2 rounded-md ${
        currentPage === 1
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index + 1)}
        className={`px-4 py-2 rounded-md ${
          currentPage === index + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-blue-100'
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className={`px-4 py-2 rounded-md ${
        currentPage === totalPages
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>



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

{/* Filtered Blogs */}

            <div style={{ 
    padding: "25px",
    backgroundColor: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px"  // Optional, for rounded corners
}}>
          <h2 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '16px' }}>Popular Blogs</h2>

          <ul className="space-y-8">
  {filteredBlogs
    .sort((a, b) => b.likes.length - a.likes.length) // Sort blogs by likes in descending order
    .slice(0, 5) // Limit to 5 blogs
    .map((blog) => (
      <li key={blog.id}>
        {/* Assuming each blog has a unique 'id' */}
        <Link
          to={`/blogs/${blog.slug}`}
          className="flex items-center space-x-2"
        >
          <img
            src={`${
              blog.blogImage !== null && blog.blogImage.length > 1
                ? blog.blogImage[0]
                : blog.blogImage
            }`}
            alt="Recent Post Icon"
            className="w-11 h-11 rounded-full"
          />
          <span  className="block mt-1 text-1xl font-bold text-black hover:underline"> 
            <b>{blog.blogTitle}</b>
          </span>
        </Link>
        <span>
          {blog.blogDescription.length > 90
            ? `${blog.blogDescription.substring(0, 90)}...`
            : blog.blogDescription}
        </span>
        <div
          className="text-sm text-gray-500"
          style={{ padding: "10px 0 0 10px" }}
        >
          {/* Writer Section */}
          <div className="flex items-center space-x-1">
            <span>By</span>
            <span className="text-orange-500">{blog.writer}</span>
          </div>

          {/* Tags Section */}
          <div className="flex items-center space-x-1">
            <span>in</span>
            <span className="flex flex-wrap space-x-1">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-400 text-white text-xs py-1 px-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </div>
        <br />
        <hr />
      </li>
    ))}
</ul>


          </div>
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
