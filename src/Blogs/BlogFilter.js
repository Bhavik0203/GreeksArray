import React, { useState } from "react";

const BlogFilter = ({ onCategoryClick }) => {
  const [filter, setFilter] = useState(""); // State to track the selected filter

  // Handle button click and trigger the parent function to filter blogs
  const handleButtonClick = (tags) => {
    setFilter(tags);
    onCategoryClick(tags.toLowerCase()); // Convert to lowercase for consistent filtering
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-teal-500">Recommended Blogs</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* ASP.NET Core */}
        <button
          onClick={() => handleButtonClick("ASP.NET Core")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "ASP.NET Core"
              ? "bg-yellow-600 text-white"
              : "bg-yellow-200 text-yellow-600 hover:bg-yellow-500 hover:text-white"
          }`}
        >
          ASP.NET Core
        </button>

        {/* .Net Core */}
        <button
          onClick={() => handleButtonClick(".Net Core")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === ".Net Core"
              ? "bg-pink-600 text-white"
              : "bg-pink-200 text-pink-600 hover:bg-pink-500 hover:text-white"
          }`}
        >
          .Net Core
        </button>

        {/* Java */}
        <button
          onClick={() => handleButtonClick("Java")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "Java"
              ? "bg-blue-400 text-white"
              : "bg-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Java
        </button>

        {/* C# */}
        <button
          onClick={() => handleButtonClick("C#")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "C#"
              ? "bg-green-400 text-white"
              : "bg-green-200 text-green-600 hover:bg-green-500 hover:text-white"
          }`}
        >
          C#
        </button>

        {/* ReactJS */}
        <button
          onClick={() => handleButtonClick("reactjs")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "reactJS"
              ? "bg-purple-400 text-white"
              : "bg-purple-200 text-purple-600 hover:bg-purple-500 hover:text-white"
          }`}
        >
          reactjs
        </button>

        {/* .NET */}
        <button
          onClick={() => handleButtonClick(".NET")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === ".NET"
              ? "bg-red-400 text-white"
              : "bg-red-200 text-red-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          .NET
        </button>
      </div>
    </div>
  );
};

export default BlogFilter;
