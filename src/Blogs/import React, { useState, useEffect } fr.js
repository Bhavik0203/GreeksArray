import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './Blog.css'; // Add your CSS styling here

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    // Fetch the blog data from the API
    axiosz
      .get('http://geeksarray-001-site5.atempurl.com/api/Blog?blogId=0&myBlogs=false')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setBlog(response.data[0]); // Assuming you want to display the first blog
          setLikes(response.data[0].likes.length); // Set initial likes count
          setComments(response.data[0].comments.length);
        }
      })
      .catch(error => console.error('Error fetching the blog data:', error));
  }, []);

  // Function to handle like button click
  const handleLikeClick = () => {
    if (!blog) return;

    // Prepare the data to be sent in the POST request
    const likeData = {
      blogId: blog.blogId,
      // userId: 1, 
      IsLiked:"true",// Replace with the actual user ID
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

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-container">
      {/* Blog Image */}
      <div className="blog-image">
        <img src={blog.blogImage.replace("h:\\root\\home\\geeksarray-001\\www\\", "https://")} alt={blog.blogTitle} />
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <h1>{blog.blogTitle}</h1>
        <p>{blog.blogDescription}</p>
        <p>{blog.blogContent}</p>
      </div>

      {/* Blog Author */}
      <div className="blog-author">
      {/* <img src={comment.user.profileImage.replace("h:\\root\\home\\geeksarray-001\\www\\", "https://")} alt={`${comment.user.firstName} ${comment.user.lastName}`} className="comment-profile-image" /> */}
        <div >
            <h3>Author: {blog.writer}</h3>
            <p>Category: {blog.category}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="blog-comments">
        <h3>Comments</h3>
        {blog.comments.map(comment => (
          <div key={comment.id} className="comment">
            <img src={comment.user.profileImage.replace("h:\\root\\home\\geeksarray-001\\www\\", "https://")} alt={`${comment.user.firstName} ${comment.user.lastName}`} className="comment-profile-image" />
            <span className="comment-count">{comments}</span> 
            <div className="comment-details">
              <h4>{comment.user.firstName} {comment.user.lastName}</h4>
              <p>{comment.commentDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Likes Section */}
      <div className="likes-section">
        <FontAwesomeIcon
          icon={faThumbsUp}
          className="like-icon"
          onClick={handleLikeClick} // Add onClick event handler
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        />
        <span className="likes-count">{likes}</span> {/* Like count */}
        <div className="likes-by">
          <strong>Likes by:</strong>
          <ul>
            {blog.likes.map((like, index) => (
              <li key={index}>
                {like.user.firstName} {like.user.lastName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
