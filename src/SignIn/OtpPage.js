import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import visual from "../assets/Images/banners/visual_identity.png";

const OtpPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 OTP input fields
  const [updatePassword, setUpdatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send OTP to email
      await axios.post(`http://geeksarray-001-site5.atempurl.com/api/Auth/forgetPassword?email=${email}`);
      setSuccess("OTP sent to your email.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Join OTP input values
    try {
      // Update password with OTP
      await axios.post(`http://geeksarray-001-site5.atempurl.com/api/Auth/forgetPassword?email=${email}&updatedPassword=${updatePassword}&otp=${otpCode}`);
      setSuccess("Password updated successfully.");
      navigate("/Sign-in"); // Redirect to Sign In page
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <section className="relative flex flex-wrap lg:h-screen lg:items-center" style={{ backgroundColor: "#D2E0FB" }}>
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 style={{paddingTop:'3rem'}}">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Reset Password</h1>
            <p className="mt-4 text-gray-500">
              Please enter your email to receive an OTP for password reset.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            {/* Email Input */}
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

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              style={{ backgroundColor: "#000", color: "#fff", borderRadius: "12px", transition: "backgroundColor 0.3s ease" }}
            >
              Resend OTP
            </button>
          </form>

          {/* OTP Input Form */}
          <form onSubmit={handleVerifyOtp} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <h1 className="text-2xl font-bold sm:text-3xl">Enter OTP</h1>
          <div className="otp-input-container flex justify-center space-x-2">
                {otp.map((value, index) => (
                    <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[index] = e.target.value;
                        setOtp(newOtp);

                        // Move focus to next input if current is filled
                        if (e.target.value.length === 1 && index < otp.length - 1) {
                        document.getElementById(`otp-${index + 1}`).focus();
                        }

                        // Move focus to previous input if current is empty and not the first input
                        if (e.target.value.length === 0 && index > 0) {
                        document.getElementById(`otp-${index - 1}`).focus();
                        }
                    }}
                    className="otp-input w-12 h-12 text-center border border-gray-300 rounded-lg shadow-sm"
                    placeholder="0"
                    maxLength="1"
                    id={`otp-${index}`}
                    />
                ))}
                </div>

            <div className="password-container">
              <label htmlFor="updatePassword" className="sr-only">New Password</label>
              <input
                type="password"
                id="updatePassword"
                value={updatePassword}
                onChange={(e) => setUpdatePassword(e.target.value)}
                className="w-full rounded-lg border border-black p-4 text-sm shadow-sm"
                style={{marginBottom:"15px"}}
                placeholder="New Password"
                required
              />
              <br></br>
              
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-black p-4 text-sm shadow-sm"
                style={{marginBottom:"10px"}}
                placeholder="Confirm Password"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              style={{ backgroundColor: "#000", color: "#fff", borderRadius: "12px", transition: "backgroundColor 0.3s ease" }}
            >
              Verify OTP
            </button>

            {/* Additional information */}
            <p className="text-sm text-gray-500 text-center">
              Don't remember your Email? You may want to contact us <Link className="underline" to="/contact">here</Link>.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Not a registered user? You may want to <Link className="underline" to="/Register">register here</Link>.
            </p>
          </form>
        </div>

        <div className="relative w-full sm:h-64 lg:w-2/6 lg:h-80 mx-auto">
          <img
            alt="Reset Password"
            src={visual}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              width: "300px",
              height: "420px",
              objectFit: "cover",
              marginBottom: "0",
            }} 
          />
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default OtpPage;
