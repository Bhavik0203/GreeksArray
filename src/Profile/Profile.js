import React, { useState, useEffect } from "react";
import "./Profile.css";
import {Helmet} from "react-helmet";
import Header from "../Header/Header";
import doublecheck from "../assets/Images/Blogimg/double-check.gif";
import axios from "axios";
import blog from "../assets/noblog.gif";
import User_1 from "../assets/Images/Avatar/user_1.jpg";
import User_2 from "../assets/Images/Avatar/user_2.jpg";
import User_3 from "../assets/Images/Avatar/user_3.jpg";
import User_4 from "../assets/Images/Avatar/user_4.jpg";
import User_5 from "../assets/Images/Avatar/user_5.jpg";
import User_6 from "../assets/Images/Avatar/user_6.jpg";
import User_7 from "../assets/Images/Avatar/user_7.jpg";
import User_8 from "../assets/Images/Avatar/user_8.jpg";
import User_9 from "../assets/Images/Avatar/user_9.jpg";
import User_10 from "../assets/Images/Avatar/user_10.jpg";
import defaultImage from '../assets/Images/Blogimg/blog-post-content-writing-service-500x500.webp';
import Footer from "../Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false); // State for success popup
  const [blogs, setBlogs] = useState([]);
  // State for profile fields
  const [firstName, setFirstName] = useState(""); // Uncommented
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null); // File input for image
  // const [avatarId, setAvatarId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // Uncommented
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isDraftEmpty, setIsDraftEmpty] = useState(false);

  const [userData, setUserData] = useState({});
  const avatars = [User_1, User_10, User_2, User_3, User_4, User_5, User_6, User_7, User_8, User_9];
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { userName, email } = userData;
  const [activeTab, setActiveTab] = useState('Your Publish');

  // Check if the required fields are filled
  const isFormValid = firstName.trim() !== "" && lastName.trim() !== "";

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
    setIsSuccessPopupVisible(false); // Reset success popup when editing
  };

  const handleCloseModal = () => {
    setProfileImage(null)
    setSelectedAvatar(null)
    setIsModalOpen(false);
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]); // Get the selected file
  };

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.get(
          "http://geeksarray-001-site5.atempurl.com/api/User",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the fetched user data in state
        setUserData(response.data);
        setFirstName(response.data.firstName); // Set fetched firstName
        setLastName(response.data.lastName); // Set fetched firstName
        setAvatarUrl(response.data.profileImage);
        
        
        // Set fetched avatar URL
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!activeTab) return;

    const authToken = localStorage.getItem("authToken");

    axios
      .get(activeTab === 'Default Saved' ? "http://geeksarray-001-site5.atempurl.com/api/Blog?draftblogs=true" : "http://geeksarray-001-site5.atempurl.com/api/Blog?myblogs=true", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        if(activeTab === 'Default Saved' && response.data.length === 0){
          setIsDraftEmpty(true);
        }
        else{
          setIsDraftEmpty(false);
          setBlogs(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [activeTab]);

  const handleSaveProfile = async () => {
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    if (profileImage){
      formData.append("ProfileImage", profileImage); // File input
    }
    if (selectedAvatar != null){
      formData.append("AvatarId", selectedAvatar + 1);
    }
  
    // Your authorization token
    const token = localStorage.getItem("authToken");
    
  
    try {
      setIsLoading(true); // Set loading state
  
      const response = await fetch(
        "http://geeksarray-001-site5.atempurl.com/api/User",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, 
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to save profile data");
      }
  
      // Show success popup after saving
      setIsSuccessPopupVisible(true);
      setIsModalOpen(false); // Close the modal
  
      // Automatically close the success popup after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setIsSuccessPopupVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving profile data:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleEditClick = (blog) => {
    navigate("/EditBlog", { state: { blog } });  // Pass the entire blog object in the state
  };

  const handleDeleteBlog = async (blogId) => { 
    if (!blogId) {
        return; // Exit the function early if blogId is not defined
    }

    // Add confirmation alert
    const confirmDeletion = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDeletion) {
        return; // Exit if the user cancels the deletion
    }

    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert('Authentication token not found. Please log in.');
            return;
        }

        // Create FormData and append blog ID
        const formData = new FormData();
        formData.append("id", blogId);
        formData.append("tags", []);

        // Make the DELETE API call
        const response = await fetch("http://geeksarray-001-site5.atempurl.com/api/Blog?isActive=false", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            // Success action
            alert('Blog deleted successfully!');
            window.location.reload();
        } else {
            // Error action
            console.error("Failed to delete the blog. Status code:", response.status);
            alert('Failed to delete the blog. Please try again.');
        }
    } catch (error) {
        console.error("Error deleting blog:", error);
        alert('An error occurred. Please try again.');
    }
};

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  return (
    <>



<Helmet>
        <title> Your Profile - GeeksArray</title>
        <meta name="description" content="Welcome to My Awesome Website. Discover our services and explore more through our latest notices and updates." />
        <meta name="keywords" content="Awesome Website, React, SEO, Notices, Services" />
        <meta property="og:title" content="Your Publish - My Awesome Website" />
 
     
      </Helmet>
      <Header />
      
      <div className="profile-container">
        <div className="profile-content">
       

          <div className="reading-list">
            <div className="reading-list-header"> 
              <div style={{ background: "white" , borderRadius: "7px", width:" 100%"}}>
              <h2
                style={{ fontSize: "40px", color: "green", fontWeight: "600", margin: "20px" }}
              >
                Welcome To The Profile {firstName} {lastName}.
              </h2>
              </div>
             

            </div>
            <aside className="profile-sidebar bg-white shadow-lg rounded-lg p-6 mx-auto my-8 max-w-sm md:max-w-md lg:max-w-lg md:block md:sticky md:top-4 lg:hidden">

  <div className="profile-info text-center">
    {/* Show the uploaded avatar image or fallback to the first letter of the first name */}
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt="Avatar"
        className="profile-avatar-image rounded-full mx-auto mb-4 h-20 w-20 sm:h-24 sm:w-24 object-cover border-4 border-blue-500"
      />
    ) : (
      <div className="profile-avatar bg-blue-500 text-white h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center rounded-full mx-auto mb-4 text-xl sm:text-2xl font-bold">
        {firstName?.charAt(0) || "User"}
      </div>
    )}

    <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
      {firstName || "User"} {lastName}
    </h3>
    <p className="text-gray-500 mb-2 sm:mb-4 text-sm sm:text-base">{userName}</p>
    <p className="text-gray-400 mb-4 text-xs sm:text-sm">{email}</p>

    <Link
      to="#edit"
      onClick={handleEditProfileClick}
      className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-1 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-300 ease-in-out"
    >
      Edit Profile
    </Link>
  </div>
</aside>
            <div className="divider"></div>
            <div className="blog-list">
            {blogs.length === 0 ? (
  <div className="flex flex-col items-center">
    <img
      src={blog}
      alt="No blogs found GIF"
      className="mt-4"
      style={{
        height: "300px",
        width: "300px",
      }}
    />
    <p>
      It looks like you haven't written any blogs yet. Create your first blog now!
    </p>
    <Link
      to="/Write"
      className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
    >
      Add Your Blog Right Now
    </Link>
  </div>
) : (
  <div className="font-sans p-4 bg-white">
    <div>
      {/* Tab Headers */}
      <ul className="flex">
        <li
          onClick={() => handleTabClick('Your Publish')}
          className={`tab text-[15px] py-2.5 px-5 border-b-2 cursor-pointer ${
            activeTab === 'Your Publish'
              ? 'text-blue-600 font-bold border-blue-600'
              : 'text-gray-600 font-semibold border-transparent'
          }`}
        >
          Your Publish
        </li>
        <li
          onClick={() => handleTabClick('Default Saved')}
          className={`tab text-[15px] py-2.5 px-5 border-b-2 cursor-pointer ${
            activeTab === 'Default Saved'
              ? 'text-blue-600 font-bold border-blue-600'
              : 'text-gray-600 font-semibold border-transparent'
          }`}
        >
          Default Saved
        </li>
      </ul>
    </div>
    { !isDraftEmpty ? 
      [...blogs].reverse().map((blog) => (
        <div key={blog.slug}>
          {/* Tab Content */}
          <div className="tab-content max-w-2xl mt-8">
            <p className="text-sm text-gray-600 mt-4">
              <article
                key={blog.slug}
                className="relative flex flex-col sm:flex-row bg-white transition hover:shadow-xl mb-6"
                style={{
                  padding: "10px",
                  border: "1px solid #e5e7eb", // Light gray border
                  borderRadius: "8px", // Rounded corners
                }}
              >
                {/* Edit Button */}
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition"
                  title="Edit Blog"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEditClick(blog)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
    
                {/* Image */}
                <div
                  className="w-full sm:w-auto sm:basis-56 mb-4 sm:mb-0"
                  style={{
                    overflow: "hidden",
                    borderRadius: "8px",
                    maxWidth: "150px",
                    maxHeight: "250px",
                  }}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <img
                      alt="Blog cover"
                      src={
                        blog.blogImage && blog.blogImage.length > 0
                          ? blog.blogImage.length > 1
                            ? blog.blogImage[0]
                            : blog.blogImage
                          : defaultImage
                      }
                      className="w-full h-auto sm:h-[150px] object-cover mx-auto sm:my-4"
                      style={{
                        aspectRatio: "1 / 1",
                        borderRadius: "8px",
                      }}
                    />
                  </Link>
                </div>
    
                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <div
                    className="border-t sm:border-t-0 sm:border-l border-gray-300 p-4 sm:p-6"
                    style={{
                      borderTop: "1px solid #e5e7eb",
                      borderLeft: "1px solid #e5e7eb",
                    }}
                  >
                    <Link to={`/blogs/${blog.slug}`}>
                      <h3
                        className="font-bold uppercase text-gray-900"
                        style={{
                          fontSize: "1.125rem", // Slightly larger font size
                          marginBottom: "0.5rem",
                        }}
                      >
                        {blog.blogTitle}
                      </h3>
                    </Link>
    
                    <p
                      className=" line-clamp-3 text-sm text-gray-700"
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                        color: "#374151",
                      }}
                      dangerouslySetInnerHTML={{ __html: blog.blogDescription }}
                    ></p>
                  </div>
    
                  <div
                    className="pl-4 pr-4 pb-4 pt-0 sm:p-3"
                    style={{
                      fontSize: "0.75rem",
                      lineHeight: "1.25",
                      color: "#6b7280",
                    }}
                  >
                    <p className="text-xs text-black-500">
                      <span className="font-semibold">
                        <b>Written by :</b>
                      </span>{" "}
                      <b style={{ color: "#4f46e5" }}>{blog.writer}</b>
                    </p>
    
                    <p className="text-xs text-black-100" style={{ margin: "10px" }}>
                      <span className="flex flex-wrap space-x-1">
                        {Array.isArray(blog.tags) &&
                          blog.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-400 text-white px-2 rounded-full"
                              style={{ fontSize: "16px", margin: "7px" }}
                            >
                              {tag.trim()}
                            </span>
                          ))}
                      </span>
                    </p>
                  </div>
    
                  {/* Buttons */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2"
                    style={{ padding: "0.5rem 0" }}
                  >
                    <button
                      className="block bg-red-500 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-red-600"
                      onClick={() => handleDeleteBlog(blog.id)}
                      style={{
                        borderRadius: "4px",
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                    >
                      Delete Blog
                    </button>
    
                    <button
                      
                      className="block bg-green-500 px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-green-700"
                      onClick={() => handleEditClick(blog)}
                      style={{
                        borderRadius: "4px",
                        padding: "10px 20px",
                        textDecoration: "none",
                      }}
                    >
                      Read Blog
                    </button>
                  </div>
                </div>
              </article>
            </p>
          </div>
        </div>
      ))
    : (
      <div className="flex flex-col items-center">
    <img
      src={blog}
      alt="No blogs found GIF"
      className="mt-4"
      style={{
        height: "300px",
        width: "300px",
      }}
    />
    <p>
      It looks like you haven't save any draft blogs yet.
    </p>
  </div>
    )}
</div>  
)}

            </div>
            
          </div>

          {/* Profile Sidebar */}
          <aside className="profile-sidebar bg-white shadow-lg rounded-lg p-6 mx-auto my-8 max-w-sm md:max-w-md lg:max-w-lg hidden md:block md:sticky md:top-4">
  <div className="profile-info text-center">
    {/* Show the uploaded avatar image or fallback to the first letter of the first name */}
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt="Avatar"
        className="profile-avatar-image rounded-full mx-auto mb-4 h-20 w-20 sm:h-24 sm:w-24 object-cover border-4 border-blue-500"
      />
    ) : (
      <div className="profile-avatar bg-blue-500 text-white h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center rounded-full mx-auto mb-4 text-xl sm:text-2xl font-bold">
        {firstName?.charAt(0) || "User"}
      </div>
    )}

    <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">
      {firstName || "User"} {lastName}
    </h3>
    <p className="text-gray-500 mb-2 sm:mb-4 text-sm sm:text-base">{userName}</p>
    <p className="text-gray-400 mb-4 text-xs sm:text-sm">{email}</p>

    <Link
      to="#edit"
      onClick={handleEditProfileClick}
      className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-1 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-300 ease-in-out"
    >
      Edit Profile
    </Link>
  </div>
</aside>



        </div>
      </div>

      {/* Modal for editing profile */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
            <h2 className="text-center text-blue-900 font-bold" style={{fontSize:"20px"}} >
              Profile Information
            </h2>

            {/* Profile Form Section */}
            <div className="profile-form">
              {/* <label className="text-gray-500">First Name</label> */}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mb-4"
                placeholder="First Name"
              />
              
              {/* <label>Last Name</label> */}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mb-4"
                placeholder="Last Name"
              />

              <label>Avatar OR Profile Image</label>
              <div className={`grid grid-cols-5 gap-4 mt-4 ${profileImage ? "opacity-50 pointer-events-none" : ""}`}>
                {avatars.map((avatar, index) => (
                  <label key={index} className="cursor-pointer">
                    <input
                      type="radio"
                      name="avatar"
                      className="hidden"
                      onChange={() => setSelectedAvatar(index)}
                      checked={selectedAvatar === index}
                    />
                    <img
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className={`w-20 h-20 rounded-full border-2 transition-all ${selectedAvatar === index ? "border-blue-900" : "border-transparent"}`}
                    />
                  </label>
                ))}
              </div>

        
              <input
                type="file"
                onChange={handleProfileImageChange}
                className={`b-4 ${selectedAvatar !== null ? "opacity-50 pointer-events-none" : ""}`}
              />
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex modal-buttons mt-2 justify-content-between">
              <button
                className="save-button text-white"
                disabled={!isFormValid || isLoading} // Disable button if form is invalid or loading
                onClick={handleSaveProfile}
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </button>
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessPopupVisible && (
        <div className="success-popup">
          <img src={doublecheck} alt="Success" className="success-gif" />
          <p className="success-message">Profile updated successfully!</p>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Profile;
