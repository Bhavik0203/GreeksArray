import React, { useState, useEffect } from "react";
import camera from "../assets/Images/Blogimg/digital-camera.png";
import avatar from '../assets/Images/Avatar/user_1.jpg';
import SuccessModal from './SuccessModal';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const Newstory = () => {
  
  const { state } = useLocation();

  const [isTyping, setIsTyping] = useState(false);
  const [isCodeWriting, setIsCodeWriting] = useState(false);
  
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  // const [categoryName, setCategoryName] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState(''); 
  const [imageFile, setImageFile] = useState (null);

  const handleInput = () => {
    const titleText = document.getElementById("editorTitle").innerText.trim();
    const bodyText = document.getElementById("editorBody").innerText.trim();
    const bodyContent = document.getElementById("editorContent").innerText.trim();

    setBlogTitle(titleText !== "Title" ? titleText : "");
    setBlogDescription(bodyText !== "Add Description" ? bodyText : "");
    setBlogContent(bodyContent !== "Your Content..." ? bodyContent : "");
    setIsTyping(!!(titleText || bodyText || bodyContent));
  };

  // Fetch categories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://geeksarray-001-site5.atempurl.com/api/Admin/categories'
        );
        setCategories(response.data); // Set fetched categories in state
      } catch (error) {
        setError('Error fetching categories. Please try again later.');
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  // Set up initial placeholder text in the contentEditable fields
  useEffect(() => {
    const titleElem = document.getElementById("editorTitle");
    const bodyElem = document.getElementById("editorBody");
    const contentElem = document.getElementById("editorContent");
 
    if (!titleElem.innerText.trim()) titleElem.innerText = "Title";
    if (!bodyElem.innerText.trim()) bodyElem.innerText = "Add Description";
    if (!contentElem.innerText.trim()) contentElem.innerText = "Your Content...";

    const handleFocus = (elem, defaultText) => {
      if (elem.innerText === defaultText) elem.innerText = "";
    };

    const handleBlur = (elem, defaultText) => {
      if (!elem.innerText.trim()) elem.innerText = defaultText;
    };

    titleElem.addEventListener("focus", () => handleFocus(titleElem, "Title"));
    titleElem.addEventListener("blur", () => handleBlur(titleElem, "Title"));
    bodyElem.addEventListener("focus", () => handleFocus(bodyElem, "Add Description"));
    bodyElem.addEventListener("blur", () => handleBlur(bodyElem, "Add Description"));
    contentElem.addEventListener("focus", () => handleFocus(contentElem, "Your Content..."));
    contentElem.addEventListener("blur", () => handleBlur(contentElem, "Your Content..."));

    // Cleanup event listeners on component unmount
    return () => {
      titleElem.removeEventListener("focus", () => {});
      titleElem.removeEventListener("blur", () => {});
      bodyElem.removeEventListener("focus", () => {});
      bodyElem.removeEventListener("blur", () => {});
      contentElem.removeEventListener("focus", () => {});
      contentElem.removeEventListener("blur", () => {});
    };
  }, []);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) setImageFile(file);
    setImageFile(file);
  };
 
 
  const applyBold = () => {
    document.execCommand("bold");
  };

 
  const applyItalic = () => {
    document.execCommand("italic");
  };

 
  const handleCodeWriting = () => {
    setIsCodeWriting(!isCodeWriting);
  };


  const handlePlusClick = () => {
    setIsPlusClicked((prev) => !prev);
  };


  const handleSubmitBlog = async () => {
    if (!blogTitle || !blogDescription || !blogContent ) {
      alert("Please complete all fields including image upload.");
      return;
    }
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert('Authentication token not found. Please log in.');
      return;
    }
  
    const formData = new FormData();
    formData.append("id", 0);
    formData.append("blogTitle", blogTitle);
    formData.append("blogDescription", blogDescription);
    formData.append("blogContent", blogContent);
    formData.append("blogImage", imageFile);
    formData.append("categoryId", categoryId);

    try {
      const response = await fetch("http://geeksarray-001-site5.atempurl.com/api/Blog?isActive=true", {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to post blog: ${errorData.message || "Server error"}`);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      alert("An error occurred while posting the blog.");
    }
  };

  return (
    <>
      <Header/>
    <div style={styles.draftEditor}>
      
      <header style={styles.editorHeader}>
        
        <div style={styles.editorActions}>
        {/* <button
  style={{
    ...styles.publishButton,
    backgroundColor: isTyping ? "#04870f" : "#d3d3d3",
    disabled: !isTyping,
    position: 'absolute',  
    top: '90px',           
    right: '40px',         
    margin: '10px',       
  }}
  onClick={handleSubmitBlog}
>
  Publish
</button> */}

         
        </div>
      </header>

      <div style={styles.editorBodyContainer}>
        <div style={styles.verticalDivider}></div>

        <div style={styles.editorBody}>
          <h1
            id="editorTitle"
            contentEditable={true}
            style={styles.editorTitle}
            onInput={handleInput}
          ></h1>
  <br></br>
          <p
            id="editorBody"
            contentEditable={true}
            style={styles.editorPlaceholder}
            onInput={handleInput}
          ></p>
          <br></br>
          <p
            id="editorContent"
            contentEditable={true}
            style={styles.editorPlaceholder}
            onInput={handleInput}
          ></p>
          <br />
          <div style={styles.categoryDropdownWrapper}>
          <select
            id="categorySelect"
            style={styles.selectElement}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName} {/* Display the categoryName property */}
              </option>
            ))}
          </select>
</div>
<br></br>
<br></br>
                
<div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imageFile && (
              <div style={styles.imagePreview}>
                <img src={URL.createObjectURL(imageFile)} alt="Uploaded" style={styles.uploadedImage} />
              </div>
            )}
          </div>

          <br /><br /><br />
          <button
            style={{ ...styles.publishButton, backgroundColor: isTyping ? "#04870f" : "#d3d3d3" }}
            disabled={!isTyping}
            onClick={handleSubmitBlog}
          >
            Publish
          </button>
          
        </div>
         
      </div>
      
            <br></br>
      {showModal && <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />}
      
    </div>
    {/* <Footer />  */}
    </>
  );
};


const styles = {
  draftEditor: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '20px',
  },
  editorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  editorActions: {
    display: 'flex',
    alignItems: 'center',
  },
  publishButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
  },
  userIcon: {
    marginLeft: '20px',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  editorBodyContainer: {
    display: 'flex',
    flex: 1,
    marginTop: '20px',
  },
  verticalDivider: {
    width: '1px',
    backgroundColor: '#ccc',
    margin: '0 10px',
  },
  editorBody: {
    flex: 1,
    padding: '10px',
  },
  editorTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  editorPlaceholder: {
    minHeight: '50px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    color: '#888',
  },
  categoryDropdownWrapper: {
    marginTop: '20px',
  },
  selectElement: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '40%',
    color: 'black'
  },
  iconBar: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  plusIcon: {
    fontSize: '24px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
  iconImage: {
    width: '20px',
    height: '20px',
  },
  fileInput: {
    display: 'none',
  },
  imagePreview: {
    marginTop: '10px',
  },
  uploadedImage: {
    maxWidth: "100%", // Ensure it scales with the container
    height: "auto", // Maintain aspect ratio
    border: "1px solid #ccc", // Optional: add a border for visibility
    borderRadius: "5px",
  },
  errorText: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Newstory;
