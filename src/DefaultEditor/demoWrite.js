import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import SuccessModal from "./SuccessModal";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import camera from "../assets/Images/Blogimg/digital-camera.png";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["bold", "italic", "underline"],
    ["link"],
    ["image"],
    ["code-block"],
  ],
};

const Newstory = () => {
  const editor = useRef(null);
  const [content, setContent] = useState(""); // Editor content
  const [blogTitle, setBlogTitle] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Handle content change in ReactQuill editor
  const handleContentChange = (value) => {
    setContent(value); // Store content
  };

  // Handle image uploads
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setImageFiles((prevFiles) => [...prevFiles, ...files]); // Append new files
  };

  // Handle blog submission
  const handleSubmitBlog = async () => {
    if (!blogTitle || !content) {
      alert("Please complete all fields.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("blogTitle", blogTitle);
    formData.append("blogContent", content);

    // Append image files
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("blogImage", imageFiles[i]);
    }

    try {
      const response = await fetch("http://geeksarray-001-site5.atempurl.com/api/Blog", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to post blog: ${errorData.message || "Server error"}`);
      } else {
        setShowModal(true); // Show success modal
      }
    } catch (error) {
      alert("An error occurred while posting the blog.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.draftEditor}>
        <header style={styles.editorHeader}></header>

        <div style={styles.editorBodyContainer}>
          <h1
            id="editorTitle"
            contentEditable={true}
            style={styles.editorTitle}
            onInput={(e) => setBlogTitle(e.target.innerText)}
          >
            {blogTitle || "Title"}
          </h1>

          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={modules}
            placeholder="Write your content here..."
            style={styles.editorContent}
          />

          <button
            style={{
              ...styles.publishButton,
              backgroundColor: content ? "#04870f" : "#d3d3d3",
            }}
            disabled={!content}
            onClick={handleSubmitBlog}
          >
            Publish
          </button>

          {/* Image upload */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <label
            htmlFor="imageUpload"
            style={{
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            <img src={camera} alt="Upload" style={styles.iconImage} />
          </label>
          {imageFiles.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
              {imageFiles.map((imageFile, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(imageFile)}
                  alt={`Uploaded ${index + 1}`}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />}
      <Footer />
    </>
  );
};

const styles = {
  draftEditor: {
    padding: "20px",
  },
  editorHeader: {
    marginBottom: "20px",
  },
  editorBodyContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  editorTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  editorContent: {
    height: "300px",
    border: "1px solid #ccc",
    padding: "10px",
  },
  publishButton: {
    backgroundColor: "#04870f",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  iconImage: {
    width: "30px",
    height: "30px",
  },
};

export default Newstory;
