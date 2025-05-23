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
  const [profileImage, serProfileImage] = useState(null);
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",

  });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Handle email input change
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Handle OTP input
  const handleOtpInputChange = (element, index) => {
    if (!isNaN(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }
    }
  };

  // Handle OTP send action
  const handleOtpSend = async () => {
    if (!email) {
      showToast("Please enter a valid email.", "danger");
      return;
    }

    try {
      const response = await fetch(
        `http://geeksarray-001-site5.atempurl.com/api/Auth/verifyEmail?email=${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        showToast("OTP sent successfully!", "success");
      } else {
        const data = await response.json();
        showToast(`Failed to send OTP: ${data.Message}`, "danger");
      }
    } catch (error) {
      showToast("Error sending OTP. Please try again.", "danger");
    }
  };

  // Handle OTP submission
  const handleOtpVerify1 = async () => {
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
  // const [selectedAvatar, setSelectedAvatar] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
  }
};

// Payload for form submission



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.size > 5 * 1024 * 1024) { // 5 MB limit
  //     showToast("File size exceeds 5 MB limit.");
  //     event.target.value = null; // Clear the file input
  //   }
  // };
  const showToast = (message, type = "danger") => {
    // Ensure a toast container exists
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
  
    // Create the toast element
    const toast = document.createElement("div");
    toast.className = `toast show`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.style.minWidth = "300px";
    toast.style.padding = "30px";
    toast.style.margin = "10px";
    toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545"; // Success or danger color
    toast.style.color = "#fff";
  
    // Toast content
    toast.innerHTML = `
      <div class="toast-header" style="background-color: ${type === "success" ? "#28a745" : "#dc3545"}; color: #fff;">
        <strong class="me-auto">${type === "success" ? "Success" : "Error"}</strong>
        <button type="button" class="btn-close" aria-label="Close" style="color: #fff;"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;
  
    // Append and auto-remove the toast
    toastContainer.appendChild(toast);
  
    // Close button functionality
    toast.querySelector(".btn-close").addEventListener("click", () => {
      toast.remove();
    });
  
    // Remove the toast after a delay
    setTimeout(() => {
      toast.remove();
    }, 10000); // Remove after 10 seconds
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formdata.password !== formdata.confirmPassword) {
      showToast("Passwords do not match.", "danger");
      return;
    }
  
    // Prepare payload based on selection
    const payload = new FormData();
    payload.append("FirstName", formdata.firstName);
    payload.append("LastName", formdata.lastName);
    payload.append("UserName", formdata.userName);
    payload.append("Email", formdata.email);
    payload.append("Password", formdata.password);
    if(selectedAvatar){
      payload.append("AvatarId", selectedAvatar + 1);
    }
    if(selectedFile){
      payload.append("ProfileImage", selectedFile || null);
    }

    try {
      const response = await axios.post(
        "http://geeksarray-001-site5.atempurl.com/api/Auth/signup",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
  
      // Show a success toast
      showToast("OTP Sent Successfully!", "success");
      setEmail(formdata.email);
      setShowOtpModal(true); // Open the OTP modal
  
    } catch (error) {
      // Extract the first error message from the response
      const errorMessage = error.response?.data?.errors?.userRequestModel?.[0] || 
                           error.response?.data?.Message.errors || 
                           "Registration failed. Please try again.";
  
      // Ensure a toast container exists
      let toastContainer = document.getElementById('toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.setAttribute('aria-live', 'polite');
        toastContainer.setAttribute('aria-atomic', 'true');
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '150px';
        toastContainer.style.right = '30px';
        document.body.appendChild(toastContainer);
      }
  
      // Create the toast element
      const toast = document.createElement('div');
      toast.className = 'toast show';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      toast.style.minWidth = '300px';
      toast.style.padding = '30px';
      toast.style.margin = '10px';
      toast.style.backgroundColor = '#dc3545'; // Bootstrap "danger" background color
      toast.style.color = '#fff';
  
      // Toast content
      toast.innerHTML = `
        <div class="toast-header" style="background-color: #dc3545; color: #fff;">
          <strong class="me-auto">Error</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" style="color: #fff;"></button>
        </div>
        <div class="toast-body">
          ${errorMessage}
        </div>
      `;
  
      // Append and auto-remove the toast after a delay
      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 10000); // Remove toast after 10 seconds
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
        <br></br>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md min-h-[1320px] lg:min-h-[1000px] h-screen"
        >
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
  <div className={`grid grid-cols-5 gap-4 mt-4 ${selectedFile ? "opacity-50 pointer-events-none" : ""}`}>
    {avatars.map((avatar, index) => (
      <label key={index} className="cursor-pointer">
        <input
          type="radio"
          name="avatar"
          className="hidden"
          onChange={() => {
            setSelectedAvatar(index);
            setSelectedFile(null); // Reset file if avatar is selected
          }}
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
  className={`border-gray border bg-gray-100 focus:bg-transparent px-4 py-3 text-gray-800 rounded-md text-sm outline-blue-500 transition-all w-full ${selectedAvatar !== null ? "opacity-50 pointer-events-none" : ""}`}
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
        handleFileChange(e); 
        setSelectedAvatar(null); // Reset avatar if file is uploaded
      }
    }
  }}
/>
  <p style={{ fontSize: '12px' }}>
    Please use JPG, PNG, or JPEG format & max size 200MB.
  </p>
</div>



            {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}

            <div className="flex justify-between items-center mt-4">
  <button
    type="submit"
    className="bg-[#f3c035] hover:bg-[#f9d76b] text-black font-bold py-2 px-4 rounded mb-3"
  >
    Sign Up
  </button>
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
</div>

<button
  type="button"
  className="font-bold py-2 px-4 rounded transition-all duration-300"
  style={{
    backgroundColor: "#000",
    color: "#fff",
    border: "2px solid #000",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#fff";
    e.currentTarget.style.color = "#000";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#000";
    e.currentTarget.style.color = "#fff";
  }}
  onClick={() => setShowOtpModal(true)}
>
  Verify Email
</button>


      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Email Verification</h2>

            {/* Email Input */}
            <label className="block mb-2 text-sm">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Enter your email"
            />

            {/* Send OTP Button */}
            <button
              type="button"
              onClick={handleOtpSend}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Send OTP
            </button>

            {/* OTP Input */}
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 border rounded text-center text-xl"
                  value={digit}
                  onChange={(e) => handleOtpInputChange(e.target, index)}
                />
              ))}
            </div>

            {/* Verify OTP Button */}
            <button
              type="button"
              onClick={handleOtpVerify}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Verify OTP
            </button>

            {/* Resend OTP Button */}
            <button
              type="button"
              onClick={handleResendOtp}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Resend OTP
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

{/* </div> */}

            <div className="text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/Sign-In" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </div>
          </form>
      </div>

      
      <Footer />
    </>
  );
};

export default Register;
