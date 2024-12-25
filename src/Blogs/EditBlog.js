import React, { useState } from "react";
import axios from "axios";
import "./EditBlog.css";
import camera from "../assets/Images/Blogimg/digital-camera.png";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const predefinedTags = [
  '.NET','.net','reactjs', '.NET Core', '.NET MAUI', '.NET Standard', 'Active Directory', 'ADO.NET', 'Agile Development', 'AI','AJAX', 'AlbertAGPT', 'Alexa Skills', 'Algorand', 'Algorithms in C#', 'Android', 'Angular', 'ArcObject', 'ASP.NET', 'ASP.NET Core',"Augmented Reality", "Avalanche", "AWS", "Azure", "Backbonejs", "Big Data", "BizTalk Server", "Blazor", "Blockchain", "Bootstrap","Bot Framework", "Business", "Business Intelligence(BI)", "C#", "C# Corner", "C# Strings", "C, C++, MFC", "Career Advice", "Careers and Jobs", "Chapters","ChatGPT", "Cloud", "Coding Best Practices", "Cognitive Services", "COM Interop", "Compact Framework", "Copilot Studio", "Cortana Development", "Cosmos DB", "Cryptocurrency", 
    'Cryptography', 'Crystal Reports', 'CSS', 'Current Affairs', 'Custom Controls', 'Cyber Security', 'Data Mining', 'Data Science','Databases & DBA', 'Design Patterns & Practices', 'DevExpress', 'DevOps', 'DirectX', 'Dynamics CRM', 'Enterprise Development', 'Entity Framework', 'Error Zone', 'Exception Handling',"F#", "Files, Directory, IO", "Flutter", "Games Programming", "GDI+", "Generative AI", "GO", "Google Cloud", "Google Development", "Graphics Design","Graphite Studio", "Hardware", "Hiring and Recruitment", "HoloLens", "How do I", "HTML 5", "Internet & Web", "Internet of Things", "Ionic", "Java","Java and .NET", "JavaScript", "JQuery", "JSON", "JSP", "Knockout", "Kotlin","Kubernetes", "Langchain", "Leadership", "Learn .NET",
    'Learn iOS Programming', 'LINQ', 'Machine Learning', 'Metaverse', 'Microsoft 365', 'Microsoft Fabric', 'Microsoft Office', 'Microsoft Phone','Microsoft Teams', 'Mobile Development', 'MongoDB', 'MuleSoft', 'MySQL', 'NEAR', 'NetBeans', 'Networking', 'NFT', 'NoCode LowCode',"Node.js", "Office Development", "OOP/OOD", "Open Source", "Operating Systems", "Oracle", "Outsourcing", "Philosophy", "PHP", "Polygon","PostgreSQL", "Power Apps", "Power Automate", "Power BI", "Power Pages", "Printing in C#", "Products", "Progress", "Progressive Web Apps", "Project Management","Public Speaking", "Python", "Q#", "QlikView", "Quantum Computing", "R", "React","React.js","Reactjs", "React Native", "Reports using C#",
    'Robotics & Hardware', 'RPA', 'Ruby on Rails', 'RUST', 'Salesforce', 'Security', 'Servers', 'ServiceNow','SharePoint', 'SignalR', 'Smart Devices', 'Software Architecture/Engineering', 'Software Testing', 'Solana', 'Solidity', 'SQL', 'SQL Server', 'Startups',"Stratis Blockchain", "Swift", "SyncFusion", "Threading", "Tools", "TypeScript", "Unity", "UWP", "Visual Basic .NET", "Visual Studio","Vue.js", "WCF", "Wearables", "Web API", "Web Design", "Web Development", "Web3", "Windows", "Windows Controls", "Windows Forms", "Windows PowerShell","Windows Services", "Workflow Foundation", "WPF", "Xamarin", "XAML", "XML", "XNA", "XSharp"
 
];
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'code-block'],
  ],
};


  

const EditBlog = () => {
  const { state } = useLocation();  // Access the state passed from navigate()
  const { blog } = state || {};  // Get the blog object
  const [blogData, setBlogData] = useState(blog);
  const [blogTitle, setBlogTitle] = useState(blog.blogTitle);
  const [blogDescription, setBlogDescription] = useState(blog.blogDescription);
  const [blogContent, setBlogContent] = useState(blog.blogContent);
  const [tags, setTags] = useState(blog.tags);
  const [input, setInput] = useState(""); // For tag input
  const [suggestions, setSuggestions] = useState([]); // Suggestions for tags
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();
  // const [blogContent, setBlogContent] = useState('');
  
  console.log(blogData);
  
  // Save Blog Data
  const saveBlogData = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const formData = new FormData();
        formData.append("id", blogData?.id);
        formData.append("blogTitle", blogTitle);
        formData.append("blogDescription", blogDescription);
        formData.append("blogContent", blogContent);
        formData.append("tags", JSON.stringify(tags));

        const response = await axios.post(
          "http://geeksarray-001-site5.atempurl.com/api/Blog",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        alert("Blog updated successfully!");
        navigate('/blogs')
      } catch (error) {
        console.error("Error saving blog data:", error);
        alert("Failed to save blog.");
      }
    }
  };

  // Handle Input for Tags
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Add logic to fetch or filter tag suggestions
    setSuggestions(
      predefinedTags.filter(
        (suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase()) &&
          !tags.includes(suggestion)
      )
    );
  };

  // Add Tag
  const addTag = (tag) => {
    if (tags.length < 6 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInput(""); // Clear the input field
    setSuggestions([]);
  };

  // Remove Tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle Image Upload
 
  // const [imageFiles, setImageFiles] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImageFiles([...imageFiles, ...newImages]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
  };
  return (
    <>
      <Header/>
      <div className="edit-blog-container">
        <h2>Edit Blog</h2>
        {blogData ? (
          <form className="edit-blog-form">
            <label>
              <strong>Title:</strong>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Enter blog title"
              />
            </label>
            <label>
              <strong>Description:</strong>
              <textarea
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
                placeholder="Enter blog description"
              />
            </label>
            <label>
      <strong>Content:</strong>
      <ReactQuill
        value={blogContent}
        modules={modules}
        onChange={(content) => setBlogContent(content)} // Correctly handle content
        placeholder="Enter blog content"
        style={{
          marginTop: '10px',
          width: '100%',
          height: '250px',
        }}
      />
    </label>
    <div className="image-upload-section">
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <label htmlFor="imageUpload" style={{ display: 'inline-block', cursor: 'pointer' }}>
        <img
          src={camera}
          alt="Upload"
          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
        />
      </label>

      {imageFiles.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          {imageFiles.map((imageFile, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={imageFile}
                alt={`Uploaded ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
              <button
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
            <div>
              <label>Tags:</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  border: "1px solid #dadada",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
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
            <button
              type="button"
              className="save-button"
              onClick={saveBlogData}
            >
              Save Changes
            </button>
          </form>
        ) : (
          <p>Loading blog data...</p>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default EditBlog;
