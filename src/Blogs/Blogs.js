import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Latestblogs from "../Latestblogs/Latestblogs";
import CTA from "../CTA/CTA";
import blogimg from '../assets/Images/banners/blogimg.png';
import LikeButton from "./LikeButton";

const Blog = ({ readOnly = false }) => {
  const { blogId } = useParams(); // Extract blogId from the URL parameters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null); // Initialize 'blog' and 'setBlog'
  const [likes, setLikes] = useState(604);
  const [comments, setComments] = useState(5);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const commentSectionRef = useRef(null);
  const speechInstanceRef = useRef(null);
  const moreOptionsRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Fetch blog details when blogId changes
  useEffect(() => {
    const fetchBlogDetails = async () => {
      console.log(`Fetching details for blog ID: ${blogId}`); // Log blog ID
      try {
        const response = await fetch(`http://geeksarray-001-site5.atempurl.com/api/Blog?blogId=${blogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const data = await response.json();
        console.log("Fetched blog data:", data); // Log fetched blog data
        setBlog(data[0]); // Assuming `data` is an array, get the first element for display
      } catch (error) {
        console.error("Error fetching blog details:", error.message); // Log error message
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlogDetails(); // Only fetch if blogId is defined
  }, [blogId]);

  // Handle like functionality
  const handleLike = () => {
    console.log(`Like button clicked for blog ID: ${blogId}`); // Log when like button is clicked
    if (blog) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: [...(prevBlog.likes || []), "userId"], // Placeholder to add a like
      }));
    }
  };

  // Toggle more options dropdown
  const handleMoreOptions = () => {
    setShowMoreOptions((prevState) => !prevState);
    console.log("More options toggled."); // Log when more options are toggled
  };

  // Handle share functionality
  const handleShare = (platform) => {
    console.log(`Share button clicked for platform: ${platform}`); // Log platform when sharing
    alert(`Share via ${platform} functionality to be implemented.`);
  };

  // Close more options dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Ensure `blog` is not null before rendering its properties
  if (!blog) return <p>No blog details found.</p>;

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: userComments.length + 1, // or generate a unique ID
        commentDescription: newComment,
        user: { username: "User" }, // Use a placeholder username for now
      };
      
      console.log("Adding new comment:", newComment); // Log the new comment
      setUserComments([...userComments, newCommentData]); // Add the new comment object
      setNewComment(""); // Clear the input
    } else {
      console.warn("Comment is empty and will not be added."); // Log warning if comment is empty
    }
  };

  return (
    <>
      <section>
        <Header />
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
          <h1 className="text-4xl font-bold text-center mb-6 mt-10">{blog.blogTitle}</h1>
          <p className="text-gray-600 mb-6 text-center">Introduction:</p>
          <div className="blog-content">
            <p className="text-gray-500 text-xl leading-relaxed mb-6">{blog.blogDescription}</p>
            <div className="flex items-center justify-between text-gray-500 mt-6 mb-6 border-t border-b border-gray-300 py-4">
              <div className="flex items-center space-x-4">
                <LikeButton onClick={handleLike} />
                <button onClick={() => {}} className="flex items-center space-x-1 transition hover:text-blue-500">
                  <FontAwesomeIcon icon={faComment} className="text-xl" />
                  <span className="text-sm">{userComments.length}</span>
                </button>
              </div>
              <div className="flex items-center space-x-4 relative">
                <button onClick={() => handleShare("save")} className="transition hover:text-blue-500">
                  <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                </button>
                <button onClick={handleMoreOptions} className="transition hover:text-blue-500">
                  <FontAwesomeIcon icon={faEllipsisH} className="text-xl" />
                </button>
                {/* More Options Dropdown */}
                {showMoreOptions && (
                  <div ref={moreOptionsRef} className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                    >
                      Share on WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare("gmail")}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                    >
                      Share via Gmail
                    </button>
                    <button
                      onClick={() => {}}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                    >
                      Read Blog
                    </button>
                  </div>
                )}
              </div>
            </div>
            {blog.blogImage && (
              <div className="mt-6 mb-6">
                <img src={blogimg} alt="blog" className="w-full h-auto" />
              </div>
            )}

            {/* Blog Content */}
            <p className="text-gray-500 text-xl text-justify leading-relaxed mb-6">{blog.blogContent}</p>

            {/* Comments Section */}
            
          </div>
        </div>

        <Latestblogs />
        <CTA />
        <Footer />
      </section>
    </>
  );
};

export default Blog;
