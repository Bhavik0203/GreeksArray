import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Latestblogs from "../Latestblogs/Latestblogs";
import blogimg from '../assets/Images/banners/blogimg.png';
import { Link } from "react-router-dom";

const Blogs = ({ readOnly = false }) => {
  const { blogId } = useParams(); // Extract blogId from the URL parameters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null); // Initialize 'blog' and 'setBlog'
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]); // Initialize comments as an empty array
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const moreOptionsRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch blog details when blogId changes
  useEffect(() => {
    const fetchBlogDetails = async () => {
      console.log(`Fetching details for blog ID: ${slug}`); // Log blog ID
      try {
        const response = await fetch(`http://geeksarray-001-site5.atempurl.com/api/Blog?slug=${slug}`);
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

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Handle like functionality
  useEffect(() => {
    // Fetch the blog data from the API
    axios
      .get(`http://geeksarray-001-site5.atempurl.com/api/Blog?blogId=${blogId}&myBlogs=false`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          setBlog(response.data[0]); // Assuming you want to display the first blog
          setLikes(response.data[0].likes.length); // Set initial likes count
          setComments(response.data[0].comments || []); // Ensure it's an array
        }
      })
      .catch(error => console.error('Error fetching the blog data:', error));
  }, [blogId]);

  const handleLikeClick = () => {
    if (!blog) return;

    // Prepare the data to be sent in the POST request
    const likeData = {
      blogId: blog.blogId,
      IsLiked: "true", // Replace with the actual user ID
    };

    // Send a POST request to the like API
    axios
      .post('http://geeksarray-001-site5.atempurl.com/api/Blog/likes', likeData)
      .then(response => {
        console.log('Like successful:', response.data);
        setLikes(prevLikes => prevLikes + 1); // Increment the like count
      })
      .catch(error => console.error('Error liking the blog:', error));
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

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh',
  //         backgroundColor: 'white',
  //       }}
  //     >
  //       {loading && <PacmanLoader size={50} color="#000" />}
  //     </div>
  //   );
  // }

  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>No blog details found.</p>;

  // Split the blog content into paragraphs based on new lines or other separators
  const paragraphs = blog.blogContent
    .split("\n") // Split content using single newlines as the separator
    .map((para, index) => (
      <p key={index} className="paragraph-style">
        {para}
      </p>
    ));

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: userComments.length + 1,
        commentDescription: newComment,
        user: { username: "User" }, // Use a placeholder username for now
      };
      
      console.log("Adding new comment:", newComment);
      setUserComments([...userComments, newCommentData]); // Add the new comment object
      setNewComment(""); // Clear the input
    } else {
      console.warn("Comment is empty and will not be added.");
    }
  };

  return (
    <>
    <Helmet>
        <title> {blog.blogTitle} - GeeksArray</title>
        <meta name="description" content={blog.blogDescription} />
        <meta name="keywords" content="Awesome Website, React, SEO, Notices, Services" />
        <meta property="og:title" content="Home - My Awesome Website" />
 
     
      </Helmet>
      <section>
        <Header />
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
          <h1 className="text-4xl font-bold text-center mb-6 mt-10">{blog.blogTitle}</h1>
          <p className="text-gray-600 mb-6 text-center">Introduction:</p>
          <div className="blog-content">
            <p className="text-gray-500 text-xl leading-relaxed mb-6">{blog.blogDescription}</p>
            <div className="flex items-center justify-between text-gray-500 mt-6 mb-6 border-t border-b border-gray-300 py-4">
              <div className="flex items-center space-x-4">
                <button onClick={handleLikeClick} className="flex items-center space-x-1 transition hover:text-blue-500">
                  <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                  <span className="likes-count">{likes}</span> {/* Like count */}
                </button>
                <button onClick={() => {}} className="flex items-center space-x-1 transition hover:text-blue-500">
                  <FontAwesomeIcon icon={faComment} className="text-xl" />
                  <span className="comment-count">{comments.length}</span> {/* Updated to show correct comments length */}
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
                  </div>
                )}
              </div>
            </div>
            {blog.blogImage && (
              <div className="mt-6 mb-6">
                <img src={blogimg} alt="blog" className="w-full h-auto" />
              </div>
            )}

            {/* Render paragraphs from blog content */}
            <div className="paragraph-container">{paragraphs}</div>

            {/* Render comments section */}
            <div className="user-comments">
              <h3 className="text-2xl font-semibold mt-8 mb-4">Comments ({comments})</h3>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p className="font-semibold">{comment.user.firstName} {comment.user.lastName}: </p>
                    <p>{comment.commentDescription}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}

              {/* Add a new comment */}
              <div className="mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-blue-500 text-white rounded-lg px-4 py-2"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
       
        <Latestblogs />
        <Footer />
      </section>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
              <div className="flex flex-col md:flex-row items-center md:items-start">
              <img
                      src={blogimg}
                      alt="Recent Post Icon"
                      className="w-14 h-14 rounded-full"
                    />
                <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-2/3">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Written by <b className="text-indigo-600">{blog.writer}</b>!
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Category: <b className="text-indigo-600">{blog.category}</b>
                  </p>
                  <p className="text-gray-600 mt-4">
                    {blog.excerpt || " Click to read more to See more Blogs..."}
                  </p>
                  <Link to = '/Allblogs '
                    
                    className="inline-block mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
                  >
                    Read More blogs
                  </Link>
                </div>
              </div>
            </div>
    </>
  );
};

export default Blogs;
