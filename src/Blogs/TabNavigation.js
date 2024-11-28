import React, { useState } from "react";
import { Link } from "react-router-dom";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("forYou");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottom: "1px solid #ccc",
        padding: "10px 15px 0px 15px",
        position: "relative",
      }}
    >
      {/* Add Icon */}
      <div style={{ fontSize: "24px", marginRight: "15px" }}>
        <Link to="/Write" style={{ textDecoration: "none", color: "inherit" }}>
          +
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* For You Tab */}
        <div
          onClick={() => setActiveTab("forYou")}
          style={{
            cursor: "pointer",
            fontWeight: activeTab === "forYou" ? "bold" : "normal",
            position: "relative",
            paddingBottom: "5px",
          }}
        >
          For You
          {activeTab === "forYou" && (
            <div
              style={{
                position: "absolute",
                bottom: "-1px", // Align underline with text
                left: "0",
                width: "100%",
                height: "1px",
                backgroundColor: "black",
              }}
            ></div>
          )}
        </div>

        {/* All Blogs Tab */}
        <div
          onClick={() => setActiveTab("allBlogs")}
          style={{
            cursor: "pointer",
            fontWeight: activeTab === "allBlogs" ? "bold" : "normal",
            position: "relative",
            paddingBottom: "5px",
          }}
        >
          All Blogs
          {activeTab === "allBlogs" && (
            <div
              style={{
                position: "absolute",
                bottom: "-1px", // Align underline with text
                left: "0",
                width: "100%",
                height: "1px",
                backgroundColor: "black",
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
