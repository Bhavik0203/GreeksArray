import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Latestblogs from "../Latestblogs/Latestblogs";
import CTA from "../CTA/CTA";
import blogimg from '../assets/Images/banners/blogimg.png';
import PacmanLoader from 'react-spinners/PacmanLoader';
import facebookLogo from "../assets/Images/Socialmediaimg/fb.jpeg";
import GitLogo from "../assets/Images/Socialmediaimg/github.jpeg";
import twitterLogo from "../assets/Images/Socialmediaimg/twitter.jpeg";
import { Link } from "react-router-dom";
import './Blog.css';
import { Helmet } from "react-helmet";

const Blog = ({ readOnly = false }) => {
  const { blogId } = useParams(); // Extract blogId from the URL parameters
  const { slug } = useParams(); // Extract blogId from the URL parameters
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
  const [isLiked, setIsLiked] = useState(false); 
  const commentInputRef = useRef(null);
  const [newloading, setNewloading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  // const firstName = user?.firstName || 'Unknown'; // Use optional chaining

  // Fetch blog details when blogId changes
  useEffect(() => {
    const fetchBlogDetails = async () => {
      console.log(`Fetching details for blog ID: ${blogId}`); // Log blog ID
      try {
        const response = await fetch(`http://geeksarray-001-site5.atempurl.com/api/Blog?slug=${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }

        const data = await response.json();
        console.log("Fetched blog data:", data); // Log fetched blog data
        setBlog(data[0]); // Assuming `data` is an array, get the first element for display
        setComments(data[0].comments || []);
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
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const visibleComments = showAll ? comments : comments.slice(-3);
  // Handle like functionality
  useEffect(() => {
    // Fetch the blog data from the API
    axios
      .get(`http://geeksarray-001-site5.atempurl.com/api/Blog?blogId=${blogId}&myBlogs=false`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          const blogData = response.data[0];
          setBlog(blogData);
          setLikes(blogData.likes.length); // Set initial likes count
          setComments(blogData.comments || []); // Ensure it's an array

          // Check if the user has already liked the blog (you can customize this logic)
          const userId = localStorage.getItem('userId'); // Assume you're storing the userId
          const userHasLiked = blogData.likes.some(like => like.userId === userId);
          setIsLiked(userHasLiked); // Set the liked status based on response data
        }
      })
      .catch(error => console.error('Error fetching the blog data:', error));
  }, [blogId]);

  const handleLikeClick = () => {
    if (!blog) return;

    var formData = new FormData();
    formData.append("blogId", blogId);
    formData.append("isLiked", !isLiked); // Toggle the like status

    // Set the authorization header
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`;

    // Send a POST request to the like API
    axios
      .post('http://geeksarray-001-site5.atempurl.com/api/Blog/likes', formData)
      .then(response => {
        console.log('Like successful:', response.data);
        setIsLiked(!isLiked); // Toggle the liked status in the state
        setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1); // Adjust the like count
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
    let shareUrl = "";
    const message = "Check out this content!";
    const contentUrl = "https://yourcontenturl.com"; // Replace with your actual content URL

    if (platform === "whatsapp") {
        // WhatsApp URL with pre-filled message
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + contentUrl)}`;
    } else if (platform === "gmail") {
        // Gmail URL for sharing content
        shareUrl = `mailto:?subject=Check this out&body=${encodeURIComponent(message + ' ' + contentUrl)}`;
    } else if (platform === "x") {
        // X (Twitter) URL for sharing content
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message + ' ' + contentUrl)}`;
    } else if (platform === "facebook") {
        // Facebook URL for sharing content
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(contentUrl)}`;
    } else if (platform === "linkedin") {
        // LinkedIn URL for sharing content
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(contentUrl)}&title=${encodeURIComponent(message)}`;
    }

    if (shareUrl) {
        // Open the URL in a new tab
        window.open(shareUrl, "_blank");
    }
};

// Example usage
// Call handleShare('x') for sharing on X
// Call handleShare('facebook') for sharing on Facebook
// Call handleShare('linkedin') for sharing on LinkedIn
// Call handleShare('whatsapp') for sharing on WhatsApp
// Call handleShare('gmail') for sharing via Gmail

  

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

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white',
        }}
      >
        {loading && <PacmanLoader size={50} color="#000" />}
      </div>
    );
  }

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
      if (!commentInputRef.current.value.trim()) return; // Prevent empty comments
    
      const newCommentDescription = commentInputRef.current.value; // Get the comment text
    
      const formData = new FormData();
      formData.append("blogId", blogId);
      formData.append("CommentDescription", newCommentDescription);
    
      axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`;
    
      setNewloading(true); // Set loading to true when starting the request
    
      axios
        .post('http://geeksarray-001-site5.atempurl.com/api/Blog/comment', formData)
        .then(response => {
          console.log('Comment successful:', response.data);
    
          // Constructing a new comment object based on the response
          const newComment = {
            id: response.data.id, // Assuming the response contains the new comment's ID
            user: { firstName: 'YourFirstName', lastName: 'YourLastName' }, // Replace with actual user data if available
            commentDescription: newCommentDescription
          };
    
          // Update the comments state to include the new comment
          setComments(prevComments => [...prevComments, newComment]);
    
          // Clear the comment input after submission
          commentInputRef.current.value = ''; // Clear the input using ref
    
          // Optionally reload the page after a short delay
          setTimeout(() => {
            window.location.reload(); // Reload the page to reflect the new comment
          }, 1000); // 1-second delay for a better user experience
    
        })
        .catch(error => console.error('Error commenting on the blog:', error))
        .finally(() => {
          setNewloading(false); // Set loading to false after the request is complete
        });
    };
    const handleDeleteComment = async (blogId, id) => {
      if (!blogId || !id) {
        console.error("blogId or id is undefined");
        return; // Exit the function early if any required param is not defined
      }
    
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert('Authentication token not found. Please log in.');
          return;
        }
        console.log(blogId)
        const formData = new FormData();
        formData.append("blogId", blogId); // Include blogId
        formData.append("id", id); // Include comment ID
    
        const response = await fetch(`http://geeksarray-001-site5.atempurl.com/api/Blog/Comment?isActive=false`, {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          // Show a success notification or popup
          alert('Comment deleted successfully!');
    
          // Optionally, refresh the comments list without reloading the page
          window.location.reload(); // Reload the page to reflect the deletion
        } else {
          console.error("Failed to delete the comment. Status code:", response.status);
          alert('Failed to delete the comment. Please try again.');
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert('An error occurred. Please try again.');
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
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-1 transition ${
                  isLiked ? 'text-blue-500' : 'text-gray-500'
                } hover:text-blue-500`} // Conditionally set the button color
              >
                <FontAwesomeIcon icon={faThumbsUp} className="text-xl" />
                <span className="likes-count">{likes}</span> {/* Like count */}
              </button>
                <button onClick={() => {}} className="flex items-center space-x-1 transition hover:text-blue-500">
                  <FontAwesomeIcon icon={faComment} className="text-xl" />
                  <span className="comment-count">{comments.length}</span> {/* Updated to show correct comments length */}
                </button>
              </div>
              <div className="flex items-center space-x-4 relative">
                {/* <button onClick={() => handleShare("save")} className="transition hover:text-blue-500">
                  <FontAwesomeIcon icon={faBookmark} className="text-xl" />
                </button> */}
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
                    onClick={() => handleShare("x")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                  >
                    Share via X
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                  >
                    Share via facebook
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                  >
                    Share via linkedin
                  </button>
                  <button
                    onClick={() => handleShare("email")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                  >
                    Share via Email
                  </button>

                  </div>
                )}
              </div>
            </div>
            {blog.blogImage && (
              <div className="mt-6 mb-6">
              <img
                src={`${blog.blogImage}`}
                alt="blog"
                style={{ width: "100%" , height: "600px" }}
                className="object-cover"
              />
              </div>

              )}
              {/* <div style={styles.contactDetails}>
                        <h4>Email</h4>
                        <div style={styles.email}>
                            <p>info@example.com</p>
                        </div>
                        <br />
                        <h4>Connect Us</h4>
                        <div style={styles.socialIcons}>
                            <a href="https://www.facebook.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={facebookLogo} alt="Facebook" style={{ width: '30px', height: '30px' }} />
                            </a>
                            <a href="https://github.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={GitLogo} alt="GitHub" style={{ width: '30px', height: '30px' }} />
                            </a>
                            <a href="https://x.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={twitterLogo} alt="Twitter" style={{ width: '30px', height: '30px' }} />
                            </a>
                        </div>
                    </div> */}


            {/* Render paragraphs from blog content */}
            <div className="text-gray-500 text-xl leading-relaxed mb-6">{paragraphs}</div>
            <p style={styles.paragraph}>
                  Follow <strong>GeeksArray</strong>
                </p>
                <div style={styles.socialIcons}>
                  <a
                    href="https://www.facebook.com/geeksarray"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={facebookLogo}
                      alt="Facebook"
                      style={styles.socialIcon}
                    />
                  </a>
                  <a
                    href="https://github.com/geeksarray"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={GitLogo} alt="GitHub" style={styles.socialIcon} />
                  </a>
                  <a
                    href="https://x.com/geeksarray"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={twitterLogo}
                      alt="Twitter"
                      style={styles.socialIcon}
                    />
                  </a>
                </div>

                {/* Contact Section */}
                <p style={styles.paragraph}>
                  For any query, concern, or suggestion, please{" "}
                  <Link to="/Contact-us" style={styles.contactLink}>
                    contact us
                  </Link>
                </p>

            {/* Render comments section */}
            <div className="user-comments bg-white rounded-lg shadow-md p-6 my-6 mx-2 border border-gray-200">
  <div>
    <h3 className="text-2xl font-semibold mt-4 mb-4 border-b border-gray-300 pb-2">
      Comments ({comments.length})
    </h3>
    {visibleComments.length > 0 ? (
      visibleComments.map((comment) => (
        <div key={comment.id} className="comment mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
  <p className="font-semibold text-gray-800">
    {comment.user
      ? `${comment.user.firstName} ${comment.user.lastName}`
      : "Anonymous"}:
  </p>
  <p className="text-gray-600 mt-1">{comment.commentDescription}</p>
          <button
          className="mt-2 block bg-red-500 px-5 py-2 text-center text-xs font-bold uppercase text-white transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-red-300"
          onClick={() => {
            handleDeleteComment(blogId, comment.id); // Pass the blogId, commentId
          }}
        >
          Delete
        </button>
</div>

        
      ))
    ) : (
      <p className="text-gray-500">No comments yet.</p>
    )}
    {comments.length > 3 && (
      <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={toggleShowAll}
      >
        {showAll ? "Show Less" : "See All"}
      </button>
    )}
  </div>

  {/* Add a new comment */}
  <div className="mt-4">
    <input
      type="text"
      ref={commentInputRef}
      placeholder="Add your comment here"
      className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={handleAddComment}
      disabled={newloading}
      className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
    >
      {newloading ? 'Adding comment...' : 'Add Comment'}
    </button>
    {newloading && <div className="loader text-blue-500">Loading...</div>}
  </div>
</div>


          </div>
        </div>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
              <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* <img
                      src={blogimg}
                      alt="Recent Post Icon"
                      className="w-14 h-14 rounded-full"
                    /> */}
                    
                <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-2/3">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                   Blog Written By <b className="text-indigo-600">{blog.writer}</b>!
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Category: <b className="text-indigo-600">{blog.category}</b>
                  </p>
                  <p className="text-gray-600 mt-4">
                    {blog.excerpt || " Click to read more to See more Blogs..."}
                  </p>
                  <Link to = '/blogs '
                    
                    className="inline-block mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
                  >
                    Read More blogs
                  </Link>
                </div>
              </div>
            </div>
       
        <Latestblogs />
        <Footer />
      </section>
      
    </>
  );
};
const styles = {
 
 
  
  heading: {
    fontSize: "35px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  socialIcons: {
    marginBottom: "15px",
    display: "flex",
    gap: "10px",
  },
  socialIcon: {
    width: "30px",
    height: "30px",
  },
  contactLink: {
    color: "#0073e6",
    textDecoration: "none",
  },
};



export default Blog;
