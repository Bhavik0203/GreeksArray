import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState(""); // State for email
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleChange = (element, index) => {
    if (!isNaN(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && element.previousSibling) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      element.previousSibling.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.every((digit) => digit)) {
      const otpCode = otp.join("");
      try {
        const response = await fetch(
          `http://geeksarray-001-site5.atempurl.com/api/Auth/verifyEmail?email=${email}&otp=${otpCode}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alert(true); // Show modal on success
        } else {
          const data = await response.json();
          alert(`Verification failed: ${data.message || "Invalid OTP or email."}`);
        }
      } catch (error) {
        alert("An error occurred while verifying the email. Please try again.");
      }
    } else {
      alert("Please fill all the fields!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ margin: "0 0 10px", color: "#333" }}>Enter your OTP</h2>
        <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#555" }}>
          We have sent a verification code to your email address. Enter the code to verify your email.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => e.key === "Backspace" && handleBackspace(e.target, index)}
              style={{
                width: "40px",
                height: "40px",
                margin: "0 5px",
                textAlign: "center",
                fontSize: "18px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          style={{
            backgroundColor: "#ff8c00",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          VERIFY
        </button>
        <Link
          to="#"
          style={{
            display: "block",
            marginTop: "10px",
            color: "#007bff",
            textDecoration: "none",
          }}
        >
          Didn't receive a code?
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        width: "400px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          color: "#28a745",
          marginBottom: "10px",
          border: "5px solid #00C851",
          borderRadius:"50%",
          padding:"2px",
          margin:"10px 125px",
        }}
      >
        ✔
      </div>
      <h2 style={{ color: "#333", fontSize: "24px", margin: "10px 0" }}>
        Congratulations!
      </h2>
      <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>
        You’ve completed Registered.
      </p>
      <button
        onClick={() => navigate("/Sign-In")}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Please Do Sign In
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default EmailVerification;
