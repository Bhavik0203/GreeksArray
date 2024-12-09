import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import toast from 'react-hot-toast';

// Avatar imports
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
// import { toast } from 'react-hot-toast';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
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
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5 MB limit
      showToast("File size exceeds 5 MB limit.");
      event.target.value = null; // Clear the file input
    }
  };
  const showToast = (message, type = "danger") => {
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.setAttribute("aria-live", "polite");
      toastContainer.setAttribute("aria-atomic", "true");
      toastContainer.style.position = "fixed";
      toastContainer.style.top = "150px";
      toastContainer.style.right = "30px";
      document.body.appendChild(toastContainer);
    }
  
    const toast = document.createElement("div");
    toast.className = "toast show";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.style.minWidth = "300px";
    toast.style.padding = "30px";
    toast.style.margin = "10px";
    toast.style.backgroundColor = type === "danger" ? "#dc3545" : "#198754"; // Danger or Success colors
    toast.style.color = "#fff";
  
    toast.innerHTML = `
      <div class="toast-header" style="background-color: ${type === "danger" ? "#dc3545" : "#198754"}; color: #fff;">
        <strong class="me-auto">${type === "danger" ? "Error" : "Success"}</strong>
        <button type="button" class="btn-close" aria-label="Close" style="color: #fff;" onclick="this.closest('.toast').remove()"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;
  
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 10000); // Auto-remove after 10 seconds
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      showToast("Passwords do not match.", "danger");
      return;
    }
  
    const payload = {
      firstName: formdata.firstName,
      lastName: formdata.lastName,
      userName: formdata.userName,
      email: formdata.email,
      password: formdata.password,
      avatarId: selectedAvatar !== null ? selectedAvatar + 1 : null,
    };
  
    try {
      const response = await axios.post(
        "http://geeksarray-001-site5.atempurl.com/api/Auth/signup",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
    
      // Show a success toast
      showToast("OTP Send Successfully!", "success");
      setEmail(formdata.email);
      setShowOtpModal(true); // Open the OTP modal
    } 
     catch (error) {
      // Extract the first error message from the "errors" object
      const errorMessage = error.response?.data?.errors?.userRequestModel?.[0] || 
                           error.response?.data?.Message || 
                           "Registration failed. Please try again.";
      
      // Create a Toast container if it doesn't already exist
      let toastContainer = document.getElementById('toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.setAttribute('aria-live', 'polite');
        toastContainer.setAttribute('aria-atomic', 'true');
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '150px'; // Adjusted top position
        toastContainer.style.right = '30px'; // Adjusted right position
        document.body.appendChild(toastContainer);
      }
    
      // Create a Toast element
      const toast = document.createElement('div');
      toast.className = 'toast show';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      toast.style.minWidth = '300px';
      toast.style.padding = '30px';
      toast.style.margin = '10px';
      toast.style.backgroundColor = '#dc3545'; // Bootstrap "danger" background color
      toast.style.color = '#fff'; // White text color
    
      // Set up Toast content
      toast.innerHTML = `
        <div class="toast-header" style="background-color: #dc3545; color: #fff;">
          <strong class="me-auto">Error</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" style="color: #fff;"></button>
        </div>
        <div class="toast-body">
          ${errorMessage}
        </div>
      `;
    
      // Append and auto-remove the Toast after a delay
      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 10000); // Toast will disappear after 10 seconds
    }
    
    
    
  };
  

  const handleOtpChange = (element, index) => {
    if (!isNaN(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
  
      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }
    }
  };
  
  const handleOtpVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      showToast("Please enter all OTP digits.", "danger");
      return;
    }
  
    try {
      const response = await fetch(
        `http://geeksarray-001-site5.atempurl.com/api/Auth/verifyEmail?email=${email}&otp=${otpCode}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.ok) {
        showToast("Email verified successfully!", "success");
        setShowOtpModal(false);
        navigate("/Sign-In");
      } else {
        const data = await response.json();
        showToast(`Verification failed: ${data.Message}`, "danger");
      }
    } catch (error) {
      showToast("Error verifying OTP. Please try again.", "danger");
    }
  };
  
  
  const handleResendOtp = async () => {
    try {
      const response = await fetch(
        `http://geeksarray-001-site5.atempurl.com/api/Auth/verifyEmail?email=${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.ok) {
        showToast("OTP resent successfully!", "success");
      } else {
        const data = await response.json();
        showToast(`Failed to resend OTP: ${data.Message}`, "danger");
      }
    } catch (error) {
      showToast("Error resending OTP. Please try again.", "danger");
    }
  };
  
  

  return (
    <>
      <Header />
      <div>
        {/* Registration form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
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
                {/* <p style={{ fontSize: '12px' }}>
                  Password must be 8-15 characters long, include uppercase, lowercase, digit, and special character.
                </p> */}
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
                      className={`w-16 h-16 rounded-full border-2 transition-all ${selectedAvatar === index ? "border-blue-900" : "border-transparent"}`}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <label className="text-gray-800 text-sm mb-2 block">Or Choose Your Profile Picture</label>
              <input
                type="file"
                name="upload"
                accept=".jpg, .jpeg, .png"
                className="border-gray border bg-gray-100 focus:bg-transparent px-4 py-3 text-gray-800 rounded-md text-sm outline-blue-500 transition-all w-full"
                onChange={handleFileChange}
              />
            </div>

            {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}

            <div className="mt-6">
            {/* <Link to=""> */}
  <button
    type="submit"
    className="bg-[#f3c035] hover:bg-[#f9d76b] text-black font-bold py-2 px-4 rounded"
  >
    Sign Up
  </button>
{/* </Link> */}
            </div>

            <div className="text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/Sign-In" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </div>
          </form>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white p-6 rounded shadow-lg text-center w-96">
    <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
    <p className="text-gray-600">We have sent an OTP to your email: {email}</p>
    <div className="flex justify-center space-x-2 mt-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChange(e.target, index)}
          className="border rounded text-center w-10 h-10"
        />
      ))}
    </div>
    <div className="flex justify-between mt-6">
      <button
        onClick={handleResendOtp}
        className="text-blue-600 underline"
      >
        Resend OTP
      </button>
      <button
        onClick={handleOtpVerify}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Verify OTP
      </button>
    </div>
  </div>
</div>

     
      )}
      <Footer />
    </>
  );
};

export default Register;
