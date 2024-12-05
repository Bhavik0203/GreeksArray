import React, { useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SuccessModal from './SuccessModal';
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Newstory.css";

const predefinedTags = [
  '.NET', 'reactjs', 'AI', 'AWS', 'Azure', 'Blockchain', 'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Web Development', 'Cyber Security',
  // Add more tags as needed...
];

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'code-block'],
  ],
};

const styles = {
  editorBodyContainer: { display: "flex", flexDirection: "column", padding: "20px" },
  editorBody: { marginTop: "20px", width: "80%" },
  publishButton: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" },
};

const Newstory = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setSuggestions(value ? predefinedTags.filter(tag => tag.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const addTag = (tag) => {
    if (!tags.includes(tag) && tags.length < 6) {
      setTags([...tags, tag]);
    }
    setInput('');
    setSuggestions([]);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleContentChange = (value) => {
    setContent(value);
    setBlogContent(value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setBlogImage(file);
  };

  const handleSubmitBlog = async () => {
    if (!blogTitle || !blogContent || !blogDescription || !blogImage) {
      alert("Please complete all fields.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("id", 0);
    formData.append("blogTitle", blogTitle);
    formData.append("blogDescription", blogDescription);
    formData.append("blogContent", blogContent);
    formData.append("blogImage", blogImage);
    if (tags.length > 0) {
      formData.append("tags", JSON.stringify(tags));
    }

    try {
      const response = await fetch(
        "http://geeksarray-001-site5.atempurl.com/api/Blog",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to post blog: ${errorData.message || "Server error"}`);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      alert("An error occurred while posting the blog.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.editorBodyContainer}>
        <div style={styles.editorBody}>
          <h1
            contentEditable
            style={{ fontSize: "24px", fontWeight: "bold" }}
            onInput={(e) => setBlogTitle(e.target.innerText)}
          >
            Title
          </h1>
          <textarea
            placeholder="Write a brief description..."
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
            style={{ width: "100%", height: "80px", margin: "10px 0", padding: "10px" }}
          />
          <ReactQuill
            value={blogContent}
            onChange={handleContentChange}
            modules={modules}
            placeholder="Write your content here..."
          />
          <br />
          <div>
            <label>Tags:</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                border: "1px solid black",
                padding: "5px",
                borderRadius: "5px",
                width: "600px",
                margin: "10px 0",
              }}
            >
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: "#e1ecf4",
                    color: "black",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    margin: "5px",
                  }}
                >
                  {tag}
                  <span
                    style={{
                      marginLeft: "5px",
                      cursor: "pointer",
                      color: "#888",
                    }}
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </span>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add up to 6 tags. Start typing to see suggestions."
                value={input}
                onChange={handleInputChange}
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  minWidth: "100px",
                  padding: "5px",
                }}
              />
            </div>
            {suggestions.length > 0 && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  marginTop: "5px",
                  maxHeight: "150px",
                  overflowY: "auto",
                  width: "600px",
                  backgroundColor: "white",
                  zIndex: 1,
                  position: "relative",
                }}
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => addTag(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <label>Upload Blog Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ margin: "10px 0" }}
          />
          <button
            style={{ ...styles.publishButton, backgroundColor: "#04870f", color: "white" }}
            onClick={handleSubmitBlog}
          >
            Publish
          </button>
        </div>
      </div>
      {showModal && <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Newstory;
