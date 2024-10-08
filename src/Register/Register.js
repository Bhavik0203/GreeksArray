import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const avatars = [User_1, User_10, User_2, User_3, User_4, User_5, User_6, User_7, User_8, User_9];
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5 MB limit
      alert("File size exceeds 5 MB limit.");
      event.target.value = null; // Clear the file input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, userName } = formdata;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate userName
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
    if (!usernameRegex.test(userName)) {
      setError("Username must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
    }

    // Add avatarId to formdata
    const payload = {
      firstName: formdata.firstName,
      lastName: formdata.lastName,
      userName: formdata.userName,
      email: formdata.email,
      password: formdata.password,
      avatarId: selectedAvatar !== null ? selectedAvatar + 1 : null // Ensure it is between 1 and 10
    };

    try {
      const response = await axios.post(
        "http://geeksarray-001-site5.atempurl.com/api/Auth/signup",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
      }

      setIsSubmitted(true);
      setError("");

      // Redirect to the profile page after successful registration
      navigate("/new-story"); // Use navigate to redirect

    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit form. Please try again.");
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="text-center bg-gradient-to-r from-[#8dfcfc] to-[#f5d395] min-h-[160px] sm:p-6 p-4">
          <h4 className="sm:text-3xl text-2xl font-bold text-black">
            Create your free account
          </h4>
        </div>

        <div className="mx-4 mb-4 -mt-16">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
            {/* Social Login Buttons */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* ... Social Login Buttons ... */}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md border border-gray outline-blue-500 transition-all"
                  placeholder="Enter First Name"
                  value={formdata.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md border border-gray outline-blue-500 transition-all"
                  placeholder="Enter Last Name"
                  value={formdata.lastName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Username</label>
                <input
                  name="userName"
                  type="text"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md border border-gray outline-blue-500 transition-all"
                  placeholder="Enter Username"
                  value={formdata.userName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <input
                  name="email"
                  type="email"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md border border-gray outline-blue-500 transition-all"
                  placeholder="Enter email"
                  value={formdata.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md border border-gray outline-blue-500 transition-all"
                  placeholder="Enter password"
                  value={formdata.password}
                  onChange={handleChange}
                />
               <p style={{ fontSize: '12px' }}>
    Password must be 8-15 characters long, include uppercase, lowercase, digit, and special character.
</p>
</div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md border border-gray outline-blue-500 transition-all"
                  placeholder="Confirm password"
                  value={formdata.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="mt-4">
              <label className="text-gray-800 text-sm mb-2">Select your Avatar</label>
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
            </div>

            {/* Profile Picture Upload */}
            <div className="mt-8">
              <label className="text-gray-800 text-sm block mb-2">Choose your profile picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-100 border border-gray rounded-md"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="mt-6">
              <button
                type="submit"
                className="bg-[#f3c035] hover:bg-[#f9d76b] text-black font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </div>

            <div className="text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/Sign-In" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Register;
