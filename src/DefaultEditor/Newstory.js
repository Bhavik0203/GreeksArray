import React, { useState, useEffect } from "react";
import SuccessModal from './SuccessModal';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RichTextEditorComponent from "./RichTextEditor";
import  { useRef } from 'react';
import "./Newstory.css";
import camera from "../assets/Images/Blogimg/digital-camera.png";
const predefinedTags = [
  '.NET','.net','reactjs', '.NET Core', '.NET MAUI', '.NET Standard', 'Active Directory', 'ADO.NET', 'Agile Development', 'AI','AJAX', 'AlbertAGPT', 'Alexa Skills', 'Algorand', 'Algorithms in C#', 'Android', 'Angular', 'ArcObject', 'ASP.NET', 'ASP.NET Core',"Augmented Reality", "Avalanche", "AWS", "Azure", "Backbonejs", "Big Data", "BizTalk Server", "Blazor", "Blockchain", "Bootstrap","Bot Framework", "Business", "Business Intelligence(BI)", "C#", "C# Corner", "C# Strings", "C, C++, MFC", "Career Advice", "Careers and Jobs", "Chapters","ChatGPT", "Cloud", "Coding Best Practices", "Cognitive Services", "COM Interop", "Compact Framework", "Copilot Studio", "Cortana Development", "Cosmos DB", "Cryptocurrency", 
    'Cryptography', 'Crystal Reports', 'CSS', 'Current Affairs', 'Custom Controls', 'Cyber Security', 'Data Mining', 'Data Science','Databases & DBA', 'Design Patterns & Practices', 'DevExpress', 'DevOps', 'DirectX', 'Dynamics CRM', 'Enterprise Development', 'Entity Framework', 'Error Zone', 'Exception Handling',"F#", "Files, Directory, IO", "Flutter", "Games Programming", "GDI+", "Generative AI", "GO", "Google Cloud", "Google Development", "Graphics Design","Graphite Studio", "Hardware", "Hiring and Recruitment", "HoloLens", "How do I", "HTML 5", "Internet & Web", "Internet of Things", "Ionic", "Java","Java and .NET", "JavaScript", "JQuery", "JSON", "JSP", "Knockout", "Kotlin","Kubernetes", "Langchain", "Leadership", "Learn .NET",
    'Learn iOS Programming', 'LINQ', 'Machine Learning', 'Metaverse', 'Microsoft 365', 'Microsoft Fabric', 'Microsoft Office', 'Microsoft Phone','Microsoft Teams', 'Mobile Development', 'MongoDB', 'MuleSoft', 'MySQL', 'NEAR', 'NetBeans', 'Networking', 'NFT', 'NoCode LowCode',"Node.js", "Office Development", "OOP/OOD", "Open Source", "Operating Systems", "Oracle", "Outsourcing", "Philosophy", "PHP", "Polygon","PostgreSQL", "Power Apps", "Power Automate", "Power BI", "Power Pages", "Printing in C#", "Products", "Progress", "Progressive Web Apps", "Project Management","Public Speaking", "Python", "Q#", "QlikView", "Quantum Computing", "R", "React","React.js","Reactjs", "React Native", "Reports using C#",
    'Robotics & Hardware', 'RPA', 'Ruby on Rails', 'RUST', 'Salesforce', 'Security', 'Servers', 'ServiceNow','SharePoint', 'SignalR', 'Smart Devices', 'Software Architecture/Engineering', 'Software Testing', 'Solana', 'Solidity', 'SQL', 'SQL Server', 'Startups',"Stratis Blockchain", "Swift", "SyncFusion", "Threading", "Tools", "TypeScript", "Unity", "UWP", "Visual Basic .NET", "Visual Studio","Vue.js", "WCF", "Wearables", "Web API", "Web Design", "Web Development", "Web3", "Windows", "Windows Controls", "Windows Forms", "Windows PowerShell","Windows Services", "Workflow Foundation", "WPF", "Xamarin", "XAML", "XML", "XNA", "XSharp"
 
];


const Newstory = () => {
  const editor = useRef(null);
	const [content, setContent] = useState('');
  const { state } = useLocation();

  const [isTyping, setIsTyping] = useState(false);
  const [isCodeWriting, setIsCodeWriting] = useState(false);
  
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  // const [categoryName, setCategoryName] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState(''); 
  // const [imageFile, setImageFile] = useState (null);

  const handleInput = () => {
    const titleText = document.getElementById("editorTitle").innerText.trim();
    const bodyText = document.getElementById("editorBody").innerText.trim();
    const bodyContent = document.getElementById("editorContent").innerText.trim();

    setBlogTitle(titleText !== "Title" ? titleText : "");
    setBlogDescription(bodyText !== "Add Description" ? bodyText : "");
    setBlogContent(bodyContent !== "Your Content..." ? bodyContent : "");
    setIsTyping(!!(titleText || bodyText ));
  };

  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      setSuggestions(predefinedTags.filter(tag => tag.toLowerCase().includes(value.toLowerCase())));
    } else {
      setSuggestions([]);
    }
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

 

  // Fetch categories from the API on component mount
 
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


    
    const [imageFiles, setImageFiles] = useState([]);

    
    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files); // Convert FileList to an array
      setImageFiles((prevFiles) => [...prevFiles, ...files]); // Append new files
    };
  const applyBold = () => {
    document.execCommand("bold");
  };

 
  const applyItalic = () => {
    document.execCommand("italic");
  };

 
  const config = (
		{
			// readonly: false, 
			placeholder:  "Start typings..."
		}
	);


  const handleSubmitBlog = async () => {
    if (!blogTitle || !blogDescription || !blogContent) {
      alert("Please complete all fields including image upload.");
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
    
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("blogImage", imageFiles[i]);  // Append each file
    }
  
    // Add tags as a JSON string
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
      <Header/>
    <div style={styles.draftEditor}>
      
      <header style={styles.editorHeader}>
        
        <div style={styles.editorActions}>
        <button
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
</button>

         
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
        <br></br>
           
           <div><button style={styles.iconButton} onClick={applyBold}>
                  <strong>B</strong>
                </button>
                <button style={styles.iconButton} onClick={applyItalic}>
                  <em>I</em>
                </button>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload} // Handle multiple images
                    style={{
                      display: "none", // Hide the default file input
                    }}
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
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {imageFiles.map((imageFile, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(imageFile)}
                          alt={`Uploaded ${index + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {/* <div>

</div>                                                                                                                                                          x  */}
                {/* <button style={styles.iconButton} onClick={handleCodeWriting}>
                  <i className="fas fa-code" style={styles.icon}>code</i>
                </button> */}
          
          {/* <RichTextEditorComponent/> */}
          <br></br>
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

          
         
{/* <br></br>
<br></br> */}
                



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
    marginTop:'5px',
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
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  errorText: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Newstory;
