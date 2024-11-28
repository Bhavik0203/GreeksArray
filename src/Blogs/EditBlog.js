import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditBlog.css";
import camera from "../assets/Images/Blogimg/digital-camera.png";
const predefinedTags = [
  '.NET','.net','reactjs', '.NET Core', '.NET MAUI', '.NET Standard', 'Active Directory', 'ADO.NET', 'Agile Development', 'AI','AJAX', 'AlbertAGPT', 'Alexa Skills', 'Algorand', 'Algorithms in C#', 'Android', 'Angular', 'ArcObject', 'ASP.NET', 'ASP.NET Core',"Augmented Reality", "Avalanche", "AWS", "Azure", "Backbonejs", "Big Data", "BizTalk Server", "Blazor", "Blockchain", "Bootstrap","Bot Framework", "Business", "Business Intelligence(BI)", "C#", "C# Corner", "C# Strings", "C, C++, MFC", "Career Advice", "Careers and Jobs", "Chapters","ChatGPT", "Cloud", "Coding Best Practices", "Cognitive Services", "COM Interop", "Compact Framework", "Copilot Studio", "Cortana Development", "Cosmos DB", "Cryptocurrency", 
    'Cryptography', 'Crystal Reports', 'CSS', 'Current Affairs', 'Custom Controls', 'Cyber Security', 'Data Mining', 'Data Science','Databases & DBA', 'Design Patterns & Practices', 'DevExpress', 'DevOps', 'DirectX', 'Dynamics CRM', 'Enterprise Development', 'Entity Framework', 'Error Zone', 'Exception Handling',"F#", "Files, Directory, IO", "Flutter", "Games Programming", "GDI+", "Generative AI", "GO", "Google Cloud", "Google Development", "Graphics Design","Graphite Studio", "Hardware", "Hiring and Recruitment", "HoloLens", "How do I", "HTML 5", "Internet & Web", "Internet of Things", "Ionic", "Java","Java and .NET", "JavaScript", "JQuery", "JSON", "JSP", "Knockout", "Kotlin","Kubernetes", "Langchain", "Leadership", "Learn .NET",
    'Learn iOS Programming', 'LINQ', 'Machine Learning', 'Metaverse', 'Microsoft 365', 'Microsoft Fabric', 'Microsoft Office', 'Microsoft Phone','Microsoft Teams', 'Mobile Development', 'MongoDB', 'MuleSoft', 'MySQL', 'NEAR', 'NetBeans', 'Networking', 'NFT', 'NoCode LowCode',"Node.js", "Office Development", "OOP/OOD", "Open Source", "Operating Systems", "Oracle", "Outsourcing", "Philosophy", "PHP", "Polygon","PostgreSQL", "Power Apps", "Power Automate", "Power BI", "Power Pages", "Printing in C#", "Products", "Progress", "Progressive Web Apps", "Project Management","Public Speaking", "Python", "Q#", "QlikView", "Quantum Computing", "R", "React","React.js","Reactjs", "React Native", "Reports using C#",
    'Robotics & Hardware', 'RPA', 'Ruby on Rails', 'RUST', 'Salesforce', 'Security', 'Servers', 'ServiceNow','SharePoint', 'SignalR', 'Smart Devices', 'Software Architecture/Engineering', 'Software Testing', 'Solana', 'Solidity', 'SQL', 'SQL Server', 'Startups',"Stratis Blockchain", "Swift", "SyncFusion", "Threading", "Tools", "TypeScript", "Unity", "UWP", "Visual Basic .NET", "Visual Studio","Vue.js", "WCF", "Wearables", "Web API", "Web Design", "Web Development", "Web3", "Windows", "Windows Controls", "Windows Forms", "Windows PowerShell","Windows Services", "Workflow Foundation", "WPF", "Xamarin", "XAML", "XML", "XNA", "XSharp"
 
];

const EditBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState(""); // For tag input
  const [suggestions, setSuggestions] = useState([]); // Suggestions for tags
  const [imageFiles, setImageFiles] = useState([]);

  // Fetch Blog Data
  const fetchBlogData = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.post(
          "http://geeksarray-001-site5.atempurl.com/api/Blog?isActive=true",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedData = response.data;

        setBlogData(fetchedData);
        setBlogTitle(fetchedData.BlogTitle || "");
        setBlogDescription(fetchedData.BlogDescription || "");
        setBlogContent(fetchedData.BlogContent || "");
        setTags(fetchedData.Tags ? fetchedData.Tags.split(",") : []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }
  };

  // Save Blog Data
  const saveBlogData = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const formData = new FormData();
        formData.append("Id", blogData?.Id || 0);
        formData.append("BlogTitle", blogTitle);
        formData.append("BlogDescription", blogDescription);
        formData.append("BlogContent", blogContent);
        formData.append("Tags", tags.join(",")); // Join tags into a comma-separated string

        imageFiles.forEach((file, index) => {
          formData.append(`BlogImage${index}`, file);
        });

        const response = await axios.post(
          "http://geeksarray-001-site5.atempurl.com/api/Blog?isActive=false",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert("Blog saved successfully!");
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
    const dummySuggestions = ["React", "JavaScript", "CSS", "HTML", "Node.js"];
    setSuggestions(
      dummySuggestions.filter(
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
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
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
            <textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              placeholder="Enter blog content"
            />
          </label>
          <div className="image-upload-section">
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
              <img
                src={camera}
                alt="Upload"
                style={{
                  width: "32px",
                  height: "32px",
                  objectFit: "cover",
                }}
              />
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
  );
};

export default EditBlog;
