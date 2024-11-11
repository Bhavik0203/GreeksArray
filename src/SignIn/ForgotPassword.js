import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://geeksarray-001-site5.atempurl.com/api/Auth/forgetPassword?email=${email}`
        // { headers: { "Content-Type": "application/json" } }
      );
  
      // If the API call is successful, navigate to the OTP page
      if (response.data.success) {
        navigate("/otp");  // Redirect to OTP page
      } else {
        navigate("/otp");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset instructions.");
    }
  };
  

  return (
    <>
      <Header />
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Please enter your registered email address. You will receive a reset password verification code in your email.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-black p-4 text-sm shadow-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Continue
            </button>
          </form>
          <div className="text-sm text-gray-500 mt-6">
            <p className="mb-2">
              Don't remember your Email? You may want to contact us{" "}
              <Link className="underline text-blue-600" to="/Contact-us">
                 here
              </Link>.
            </p>
            <p className="mb-2">
              Not a registered user? You may want to register{" "}
              <Link className="underline text-blue-600" to="/Register">
                here
              </Link>.
            </p>
          </div>
          <div className="text-sm text-gray-500 mt-4">
            <p>
              <Link className="underline" to="/Sign-In">Back to Sign In</Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ForgotPassword;
