import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditBlog.css";
import camera from "../assets/Images/Blogimg/digital-camera.png";
// Replace with your camera icon path

const EditBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [tags, setTags] = useState("");

  const fetchBlogData = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.get(
          "http://geeksarray-001-site5.atempurl.com/api/Blog?isActive=true",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedData = response.data;

        setBlogData(fetchedData);
        setBlogTitle(fetchedData.firstName); // Replace with blog title key
        setBlogDescription(fetchedData.lastName); // Replace with blog description key
        setTags(fetchedData.Tags); // Replace with tags key
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setImageFiles([...imageFiles, ...uploadedFiles]); // Add new files to existing files
  };

  const handleSave = () => {
    console.log("Updated Data:", { blogTitle, blogDescription, imageFiles, tags });
    // Logic for saving updates goes here
  };

  return (
    <div className="edit-blog-container">
      <form className="edit-blog-form">
        <input
          type="text"
          className="blog-title-input"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="blog-description-input"
          value={blogDescription}
          onChange={(e) => setBlogDescription(e.target.value)}
          placeholder="Add Description"
        ></textarea>

        <textarea
          className="blog-content-input"
          placeholder="Your Content..."
        ></textarea>

        <div className="tags-section">
          <input
            type="text"
            className="tags-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Add up to 6 tags. Start typing to see suggestions."
          />
        </div>

        <div className="image-upload-section">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            hidden
          />
          <label htmlFor="imageUpload" className="upload-label">
            <img src={camera} alt="Upload" className="camera-icon" />
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="publish-button"
          disabled={!blogTitle || !blogDescription}
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
