import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import visual from "../assets/Images/banners/visual_identity.png";

const SignIn = () => {
  const [formdata, setFormdata] = useState({
    userNameOrEmail: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://geeksarray-001-site5.atempurl.com/api/Auth/login",
        formdata,
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.value;
      if (token) {
        // Save token and userid to localStorage
        localStorage.setItem("authToken", token);
        setIsSubmitted(true);
        setError("");
        navigate("/blogs"); // Redirect to the home page after login
      } else {
        alert("Login failed, token not received.");
      }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to submit form. Please try again.");
      }
      
  };

  return (
    <>
      <Header />
      {/* <section className="relative flex flex-wrap lg:h-screen lg:items-center" style={{ backgroundColor: "#D2E0FB" }}> */}
      <section className="relative flex flex-wrap lg:h-screen lg:items-center" style={{ backgroundColor: "#D2E0FB" }}>
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Sign In</h1>
            <p className="mt-4 text-gray-500">
              Join us at GeeksArray and become part of a thriving community where geeks unite, learn, and grow.
            </p>
          </div>

          {/* <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4"> */}
          <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="userNameOrEmail" className="sr-only">Username/Email</label>
              {/* <label htmlFor="userNameOrEmail" className="sr-only">Username/Email</label> */}
              <div className="relative">
                <input
                  type="text"
                  id="userNameOrEmail"
                  name="userNameOrEmail"
                  value={formdata.userNameOrEmail}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-black p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Username/email"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              {/* <label htmlFor="password" className="sr-only">Password</label> */}
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-black p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> */}
                  </svg>
                </span>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account? <Link className="underline" to="/Register"> Sign up</Link>
              </p>
              
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: "#000", color: "#fff", borderRadius: "12px", transition: "backgroundColor 0.3s ease" }}
              >
                Sign in
              </button>
             
            </div>
            <p className="text-sm text-gray-500" >
                <Link className="underline" to="/forgot-password">Forgot Password?</Link>
              </p>
          </form>
        </div>

        <div className="relative w-full sm:h-64 lg:w-2/6 lg:h-80 mx-auto">
        <img
  alt="Sign In"
  src={visual}
  className="absolute inset-0 object-cover"
  style={{
    width: "300px",
    height: "430px",
    objectFit: "cover",
    marginBottom: "0",
    display: window.innerWidth <= 768 ? "none" : "block", // Hide on screens 768px or smaller
  }}
/>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default SignIn;
