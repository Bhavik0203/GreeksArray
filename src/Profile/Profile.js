import React, { useState, useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import doublecheck from "../assets/Images/Blogimg/double-check.gif";
import { Link } from "react-router-dom";
import blogbanner from "../assets/Images/banners/Banner 2.jpg";
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

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false); // State for success popup
  const [blogs, setBlogs] = useState([]);
  // State for profile fields
  const [firstName, setFirstName] = useState(""); // Uncommented
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null); // File input for image
  const [avatarId, setAvatarId] = useState("");
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
        setAvatarUrl(response.data.profileImage); // Set fetched avatar URL
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

    try {
      setIsLoading(true); // Set loading state

      const response = await fetch(
        "http://geeksarray-001-site5.atempurl.com/api/User?isActive=true",
        {
          method: "POST",
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

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-content">
          <div className="reading-list">
            <div className="reading-list-header">
              <h2
                style={{ fontSize: "30px", color: "green", fontWeight: "600" }}
              >
                Welcome To The Profile {firstName}
              </h2>
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
                    It looks like you haven't written any blogs yet. Create your
                    first blog now!
                  </p>
                  <Link to="/Newstory"
                  
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                    Add Your Blog Right Now
                  </Link>
                </div>
              ) : (
                blogs.map((blog) => (
                  <article
                    key={blog.blogId} // Assuming blogId is a unique key
                    className="flex bg-white transition hover:shadow-xl mb-6"
                    style={{ width: "600px" }}
                  >
                    <div className="hidden sm:block sm:basis-56">
                      <img
                        alt="Blog cover"
                        src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" // Add your blog image field if available
                        className="aspect-square h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                        <a href="#">
                          <h3 className="font-bold uppercase text-gray-900">
                            {blog.blogTitle}
                          </h3>
                        </a>

                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                          {blog.blogContent}
                        </p>
                      </div>

                      <div className="p-4 sm:p-6">
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold">Written by:</span>{" "}
                          {blog.writer}
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold">Category:</span>{" "}
                          {blog.category}
                        </p>
                      </div>

                      <div className="sm:flex sm:items-end sm:justify-end">
                        <Link
                           to={`/blogs/${blog.id}`}
                          className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                        >
                          Read Blog
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center">
              {/* <div>
                <p>{firstName}</p>
                <h1 className="text-gray-600">Saved Blogs</h1>
              </div> */}

              {/* See All Blog button aligned to the right */}
              {/* <Link
                to=""
                className="inline-block blog bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
              >
                See All Blog
              </Link> */}
            </div>
          </div>

          {/* Profile Sidebar */}
          <aside className="profile-sidebar sticky top-4 bg-white shadow-lg rounded-lg p-6 mx-auto my-8 max-w-sm">
            <div className="profile-info text-center">
              {/* Show the uploaded avatar image or fallback to the first letter of the first name */}
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Avatar"
                  className="profile-avatar-image rounded-full mx-auto mb-4 h-24 w-24 object-cover border-4 border-blue-500"
                />
              ) : (
                <div className="profile-avatar bg-blue-500 text-white h-24 w-24 flex items-center justify-center rounded-full mx-auto mb-4 text-2xl font-bold">
                  {firstName?.charAt(0) || "U"}
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {firstName || "User"}
              </h3>
              <p className="text-gray-500 mb-4">{userName}</p>
              <p className="text-gray-400 mb-4 text-sm">{email}</p>

              <Link
                to="#edit"
                onClick={handleEditProfileClick}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out"
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
            <h3 className="text-center text-blue-900 font-bold">
              Profile Information
            </h3>

            {/* Profile Form Section */}
            <div className="profile-form">
              <label className="text-gray-500">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mb-4"
              />

              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mb-4"
              />

              <label>Avatar ID</label>
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

              <label>Profile Image</label>
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
    </>
  );
};

export default Profile;
