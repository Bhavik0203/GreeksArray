import React, { useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Toast } from "bootstrap"; // Import Toast from Bootstrap
import SuccessModal from './SuccessModal';
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Newstory.css";

const predefinedTags = [
  '.NET','.net','reactjs', '.NET Core', '.NET MAUI', '.NET Standard', 'Active Directory', 'ADO.NET', 'Agile Development', 'AI','AJAX', 'AlbertAGPT', 'Alexa Skills', 'Algorand', 'Algorithms in C#', 'Android', 'Angular', 'ArcObject', 'ASP.NET', 'ASP.NET Core','Augmented Reality', "Avalanche", "AWS", "Azure", "Backbonejs", "Big Data", "BizTalk Server", "Blazor", "Blockchain", "Bootstrap","Bot Framework", "Business", "Business Intelligence(BI)", "C#", "C# Corner", "C# Strings", "C, C++, MFC", "Career Advice", "Careers and Jobs", "Chapters","ChatGPT", "Cloud", "Coding Best Practices", "Cognitive Services", "COM Interop", "Compact Framework", "Copilot Studio", "Cortana Development", "Cosmos DB", "Cryptocurrency", 
    'Cryptography', 'Crystal Reports', 'CSS', 'Current Affairs', 'Custom Controls', 'Cyber Security', 'Data Mining', 'Data Science','Databases & DBA', 'Design Patterns & Practices', 'DevExpress', 'DevOps', 'DirectX', 'Dynamics CRM', 'Enterprise Development', 'Entity Framework', 'Error Zone', 'Exception Handling','F#', "Files, Directory, IO", "Flutter", "Games Programming", "GDI+", "Generative AI", "GO", "Google Cloud", "Google Development", "Graphics Design","Graphite Studio", "Hardware", "Hiring and Recruitment", "HoloLens", "How do I", "HTML 5", "Internet & Web", "Internet of Things", "Ionic", "Java","Java and .NET", "JavaScript", "JQuery", "JSON", "JSP", "Knockout", "Kotlin","Kubernetes", "Langchain", "Leadership", "Learn .NET",
    'Learn iOS Programming', 'LINQ', 'Machine Learning', 'Metaverse', 'Microsoft 365', 'Microsoft Fabric', 'Microsoft Office', 'Microsoft Phone','Microsoft Teams', 'Mobile Development', 'MongoDB', 'MuleSoft', 'MySQL', 'NEAR', 'NetBeans', 'Networking', 'NFT', 'NoCode LowCode','Node.js', "Office Development", "OOP/OOD", "Open Source", "Operating Systems", "Oracle", "Outsourcing", "Philosophy", "PHP", "Polygon","PostgreSQL", "Power Apps", "Power Automate", "Power BI", "Power Pages", "Printing in C#", "Products", "Progress", "Progressive Web Apps", "Project Management","Public Speaking", "Python", "Q#", "QlikView", "Quantum Computing", "R", "React","React.js","Reactjs", "React Native", "Reports using C#",
    'Robotics & Hardware', 'RPA', 'Ruby on Rails', 'RUST', 'Salesforce', 'Security', 'Servers', 'ServiceNow','SharePoint', 'SignalR', 'Smart Devices', 'Software Architecture/Engineering', 'Software Testing', 'Solana', 'Solidity', 'SQL', 'SQL Server', 'Startups','Stratis Blockchain', "Swift", "SyncFusion", "Threading", "Tools", "TypeScript", "Unity", "UWP", "Visual Basic .NET", "Visual Studio","Vue.js", "WCF", "Wearables", "Web API", "Web Design", "Web Development", "Web3", "Windows", "Windows Controls", "Windows Forms", "Windows PowerShell","Windows Services", "Workflow Foundation", "WPF", "Xamarin", "XAML", "XML", "XNA", "XSharp"
 
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
  editorBody: { marginTop: "20px", width: "90%" },
  publishButton: { padding: "10px 20px", fontSize: "16px", color: "#fff", cursor: "pointer", borderRadius: "7px" },
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
  const [isDraft, setIsDraft] = useState(false);
  const [links, setLinks] = useState("");
  const [error, setError] = useState("");

  // Check if both fields are not empty or null
  const isFormValid = blogTitle.trim() !== '' && blogDescription.trim() !== '' && blogContent.trim() !== '' && blogContent.trim() !== '' && tags.length > 0;

  const handleInputChange1 = (e) => {
    const value = e.target.value;
    setLinks(value);
    const githubRegex = /^https:\/\/github\.com\/.+/;
    if (!githubRegex.test(value) && value !== "") {
      setError("Please enter a valid GitHub URL (https://github.com/...)");
    } else {
      setError("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setSuggestions(value ? predefinedTags.filter(tag => tag.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value.trim();
    setBlogTitle(value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value.trim();
    setBlogDescription(value);
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
    if (!isFormValid) {
      showToast("Please complete all fields.", "danger");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      showToast("Authentication token not found. Please log in.", "danger");
      return;
    }

    const formData = new FormData();
    formData.append("id", 0);
    formData.append("blogTitle", blogTitle);
    formData.append("blogDescription", blogDescription);
    formData.append("links", links);
    formData.append("blogContent", blogContent);
    formData.append("blogImage", blogImage);
    if (tags.length > 0) {
      formData.append("tags", JSON.stringify(tags));
    }

    try {
      const response = await fetch(
        isDraft ? "http://geeksarray-001-site5.atempurl.com/api/Blog?isDraft=true" : "http://geeksarray-001-site5.atempurl.com/api/Blog",
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
        showToast(`Failed to post blog: ${errorData.Message || "Server error"}`, "danger");
      } else {
        setShowModal(true);
      }
    } catch (error) {
      showToast("An error occurred while posting the blog.", "danger");
      console.error(error);
    }

    setIsDraft(false);
  };

  const showToast = (message, type) => {
    const toastEl = document.getElementById("errorToast");
    const toast = new Toast(toastEl);
    document.getElementById("errorToastBody").innerText = message;
    toastEl.classList.remove("bg-success", "bg-danger");
    toastEl.classList.add(`bg-${type}`);
    toast.show();
  };

  const handleDraftBlog = async () => {
    setIsDraft(true);
    await handleSubmitBlog();
  }

  return (
    <>
      <Header />
       {/* Bootstrap Toast Element */}
       <div
  className="toast-container position-fixed"
  style={{ top: "100px", right: "50px", zIndex: 1055 }}
>
  <div
    id="errorToast"
    className="toast align-items-center text-white border-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className="d-flex">
      <div id="errorToastBody" className="toast-body"></div>
      <button
        type="button"
        className="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</div>



      <div style={styles.editorBodyContainer}>
      


        <div style={styles.editorBody}>
        <div
          style={{
            width: "3px",
            height: "100%", // Adjust height as needed
            backgroundColor: "#ccc",
            margin: "0 10px",
          }}
        ></div>
        <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
  <input
    type="text"
    placeholder="Title"
    onChange={handleTitleChange}
    style={{
      padding:"10px",
      width: "100%",
      height: "50px",
      border: "none",
    }}
  />
  <hr
    style={{
      borderBottom: "0",
      margin: "20px 0",
    }}
  />
  <input
    type="text"
    placeholder="Add Description"
    onChange={handleDescriptionChange}
    style={{
      padding: "10px",
      width: "100%",
      height: "50px",
    }}
  />
  <hr
    style={{
      borderBottom: "0",
      margin: "20px 0",
    }}
  />
  <ReactQuill
    value={blogContent}
    onChange={handleContentChange}
    modules={modules}
    placeholder="Write your content here..."
    style={{
      marginTop: "10px",
      width: "100%",
      height: "250px",
    }}
  />
</div>
<br></br><br></br>
{/* <hr
    style={{
      borderBottom: "0",
      margin: "20px 0",
    }}
  /> */}
          <div style={{
                padding: "0px 20px",
                margin: "20px 0px 10px 0px",
              }}>
            <label>Tags:</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                border: "1px solid black",
                padding: " 5px 20px",
                borderRadius: "5px",
                width: "100%",
                margin: "10px 0px",
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
          <label style={{ margin: "10px 20px", }}>Upload Blog Cover Image :</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    const validFormats = ['image/jpeg', 'image/png'];
    const maxSize = 200 * 1024 * 1024; // 200MB in bytes

    if (file) {
      if (!validFormats.includes(file.type)) {
        alert('Please upload a JPG, JPEG, or PNG image.');
        e.target.value = ''; // Reset the file input
      } else if (file.size > maxSize) {
        alert('File size must be less than 200MB.');
        e.target.value = ''; // Reset the file input
      } else {
        handleImageUpload(e); 
      }
    }
  }}
  style={{ margin: "10px 20px", }}
/>

<div>
      <input
        type="url"
        placeholder="Enter Source Code GitHub URL"
        value={links}
        onChange={handleInputChange1}
        style={{
          margin: "10px 20px",
          padding: "5px",
          width: "97%",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      {error && <p style={{ color: "red", marginLeft: "20px" }}>{error}</p>}
    </div>

       <button
            style={{
              ...styles.publishButton,
              backgroundColor: isFormValid ? "#04870f" : "#d3d3d3",
              disabled: !isFormValid,
              position: 'absolute',  
              top: '80px',           
              right: '40px',         
              margin: '10px',       
            }}
            onClick={handleSubmitBlog}
          >
            Publish
          </button>
      
                  </div>
                  <div className="flex">
                  <button
            style={{
              ...styles.publishButton,
              backgroundColor: isFormValid ? "#04870f" : "#d3d3d3",
              disabled: !isFormValid,
              // position: 'absolute',  
              // top: '100px',           
              // right: '40px', 
              width: '100px',         
              margin: '10px 20px',       
            }}
            onClick={handleSubmitBlog}
          >
            Publish
          </button>
                  <button
            style={{
              ...styles.publishButton,
              backgroundColor: isFormValid ? "#000000" : "#d3d3d3",
              disabled: !isFormValid,
              // position: 'absolute',  
              // top: '100px',           
              // right: '40px', 
              width: '150px',         
              margin: '10px 20px',       
            }}
            onClick={handleDraftBlog}
          >
            Save to Draft
          </button>
                  </div>
                </div>
                {showModal && <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />}
              </>
            );
          };

export default Newstory;
