import React, { useState, useEffect } from "react";
import "./Profile.css";
import {Helmet} from "react-helmet";
import Header from "../Header/Header";
import doublecheck from "../assets/Images/Blogimg/double-check.gif";
import { Link } from "react-router-dom";
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

import Footer from "../Footer/Footer";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


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

  const [userData, setUserData] = useState({});
  const avatars = [User_1, User_10, User_2, User_3, User_4, User_5, User_6, User_7, User_8, User_9];
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { userName, email } = userData;

  // Check if the required fields are filled
  const isFormValid = firstName.trim() !== "" && lastName.trim() !== "";

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
    setIsSuccessPopupVisible(false); // Reset success popup when editing
  };

  const handleCloseModal = () => {
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
          "http://geeksarray-001-site5.atempurl.com/api/User?isActive=true",
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
    const authToken = localStorage.getItem("authToken");

    axios
      .get("http://geeksarray-001-site5.atempurl.com/api/Blog?myBlogs=true", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleSaveProfile = async () => {
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("ProfileImage", profileImage); // File input
  
    // Your authorization token
    const token = localStorage.getItem("authToken");
    
  
    try {
      setIsLoading(true); // Set loading state
  
      const response = await fetch(
        "http://geeksarray-001-site5.atempurl.com/api/User?isActive=true",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // Add the token here
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


  

  return (
    <>



<Helmet>
        <title> Your Profile - GeeksArray</title>
        <meta name="description" content="Welcome to My Awesome Website. Discover our services and explore more through our latest notices and updates." />
        <meta name="keywords" content="Awesome Website, React, SEO, Notices, Services" />
        <meta property="og:title" content="Home - My Awesome Website" />
 
     
      </Helmet>
      <Header />
      
      <div className="profile-container">
        <div className="profile-content">
        {/* <aside
  className="profile-sidebar sticky top-4 bg-white shadow-lg rounded-lg p-6 mx-auto my-8 max-w-sm block lg:hidden"
  style={{ display: 'none !important' }}
>
  <div className="profile-info text-center">
    {
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt="Avatar"
        className="profile-avatar-image rounded-full mx-auto mb-4 h-24 w-24 object-cover border-4 border-blue-500"
      />
    ) : (
      <div className="profile-avatar bg-blue-500 text-white h-24 w-24 flex items-center justify-center rounded-full mx-auto mb-4 text-2xl font-bold">
        {firstName?.charAt(0) || "User"}
      </div>
    )}

    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      {firstName || "User"} {lastName}
    </h3>
    <p className="text-gray-500 mb-4">{userName}</p>
    <p className="text-gray-400 mb-4 text-sm">{email}</p>

    <Link
      to="#edit"
      onClick={handleEditProfileClick}
      className="inline-block bg-teal-600 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out"
    >
      Edit Profile
    </Link>
  </div>
</aside> */}

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
  [...blogs].reverse().map((blog) => (
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
  >
    <FontAwesomeIcon icon={faPenToSquare} />
  </button>

  {/* Image */}
  <div
    className="w-full sm:w-auto sm:basis-56 mb-4 sm:mb-0"
    style={{
      overflow: "hidden",
      borderRadius: "8px",
    }}
  >
    <img
      alt="Blog cover"
      src={`${blog.blogImage !== null && blog.blogImage.length > 1 ? blog.blogImage[0] : blog.blogImage}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
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
      <a href="#">
        <h3
          className="font-bold uppercase text-gray-900"
          style={{
            fontSize: "1.125rem", // Slightly larger font size
            marginBottom: "0.5rem",
          }}
        >
          {blog.blogTitle}
        </h3>
      </a>

      <p
        className="mt-2 line-clamp-3 text-sm text-gray-700"
        style={{
          fontSize: "0.875rem",
          lineHeight: "1.5",
          color: "#374151",
        }}
      >
        {blog.blogContent}
      </p>
    </div>

    <div
      className="p-4 sm:p-6"
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
      <p className="text-xs text-black-100">
  <span className="font-semibold">
    <b>Tags :</b>
  </span>
  {Array.isArray(blog.tags) &&
    blog.tags.map((tag, index) => (
      <b key={index} style={{ color: "#4f46e5" }}>
        {tag.trim()}
        {index < blog.tags.length - 1 && ", "}
      </b>
    ))}
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


      <Link
        to={`/blogs/${blog.slug}`}
        className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
        style={{
          borderRadius: "4px",
          padding: "10px 20px",
          textDecoration: "none",
        }}
      >
        Read Blog
      </Link>
    </div>
  </div>
</article>

  ))
)}

            </div>
            
          </div>

          {/* Profile Sidebar */}
          <aside className="profile-sidebar sticky top-4 bg-white shadow-lg rounded-lg p-6 mx-auto my-8 max-w-sm hidden md:block">
  <div className="profile-info text-center">
    {/* Show the uploaded avatar image or fallback to the first letter of the first name */}
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt="Avatar"
        className="profile-avatar-image rounded-full mx-auto mb-4 h-24 w-24 object-cover border-4 border-blue-500"
      />
    ) : (
      <div className="profile-avatar bg-blue-500 text-white h-24 w-24 flex items-center justify-center rounded-full mx-auto mb-4 text-2xl font-bold">
        {firstName?.charAt(0) || "User"}
      </div>
    )}

    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      {firstName || "User"} {lastName}
    </h3>
    <p className="text-gray-500 mb-4">{userName}</p>
    <p className="text-gray-400 mb-4 text-sm">{email}</p>

    <Link
      to="#edit"
      onClick={handleEditProfileClick}
      className="inline-block bg-teal-600 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out"
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
              <div className="grid grid-cols-5 gap-4 mt-4">
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
                className="mb-4"
              />
            </div>

            {/* Save and Cancel Buttons */}
            <div className="modal-buttons">
              <button
                className="save-button bg-blue-500 text-white"
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
