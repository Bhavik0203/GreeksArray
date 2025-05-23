import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import visual from "../assets/Images/banners/visual_identity.png";

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "bootstrap";  // Correct Toast import

const SignIn = () => {
  const [formdata, setFormdata] = useState({
    userNameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle form input changes
  // const [formdata, setFormdata] = useState({ password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  // Handle form submission
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
        localStorage.setItem("authToken", token);
        showToast("Login successful!", "success");
        navigate("/blogs");
      } else {
        showToast("Login failed, token not received.", "danger");
      }
    } catch (err) {
      showToast(
        err.response?.data?.Message || "Failed to submit form. Please try again.",
        "danger"
      );
    }
  };

  // Toast Notification Function
  function showToast(message, type) {
    const toastEl = document.getElementById("errorToast");
    const toast = new Toast(toastEl);  // Use the imported Toast
    document.getElementById("errorToastBody").innerText = message;
    toastEl.classList.remove("bg-success", "bg-danger");
    toastEl.classList.add(`bg-${type}`);
    toast.show();
  }

  return (
    <>
      <Header />
      <section className="relative flex flex-wrap lg:h-screen lg:items-center min-h-[600px] lg:min-h-[600px] h-screen" style={{ backgroundColor: "#D2E0FB"  }}>
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Sign In</h1>
            <p className="mt-4 text-gray-500">
              Join us at GeeksArray and become part of a thriving community where geeks unite, learn, and grow.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label htmlFor="userNameOrEmail" className="sr-only">Username/Email</label>
              <div className="relative">
                <input
                  type="text"
                  id="userNameOrEmail"
                  name="userNameOrEmail"
                  value={formdata.userNameOrEmail}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-black p-4 text-sm shadow-sm"
                  placeholder="Enter Username/email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-black p-4 text-sm shadow-sm"
                  placeholder="Enter password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
              <p className="text-sm text-gray-500">
                No account? <Link className="underline" to="/Register"> Sign up</Link>
              </p>
              <p className="text-sm text-gray-500">
              <Link className="underline" to="/forgot-password">Forgot Password?</Link>
            </p>
              </div>

              <button
  type="submit"
  className="inline-block rounded-lg px-5 py-3 mt-20 text-sm font-medium text-white"
  style={{
    backgroundColor: "#000", 
    color: "#fff", 
    borderRadius: "12px", 
    transition: "background-color 0.3s ease, transform 0.2s ease",
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#555"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#000"}
>
  Sign in
</button>

            </div>

           
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
              display: window.innerWidth <= 768 ? "none" : "block",
            }}
          />
        </div>



        <br></br><br></br>
      </section>

      {/* Toast Container */}
      <div
  className="toast-container position-fixed top-2 end-0 p-3"
  style={{
    maxWidth: "90%",
    width: "auto",
  }}
>
  <div
    id="errorToast"
    className="toast align-items-center text-white border-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style={{
      maxWidth: "100%",
      wordWrap: "break-word",
    }}
  >
    <div className="d-flex">
      <div
        id="errorToastBody"
        className="toast-body"
        style={{
          fontSize: "1rem",
        }}
      ></div>
      <button
        type="button"
        className="btn-close btn-close-white me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</div>


      <Footer />
    </>
  );
};

export default SignIn;
