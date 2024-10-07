import React, { useState } from "react";

const BlogFilter = ({ onCategoryClick }) => {
  const [filter, setFilter] = useState(""); // State to track the selected filter

  const handleButtonClick = (category) => {
    setFilter(category);
    onCategoryClick(category); // Call the function passed from Allblogs to set the category in the search bar
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-teal-500">Recommended Blogs</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Button 1 */}
        <button
          onClick={() => handleButtonClick("ASP.NET Core")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "ASP.NET Core" ? "bg-yellow-600 text-white" : "bg-yellow-200 text-yellow-600 hover:bg-yellow-500 hover:text-white"
          }`}
        >
          ASP.NET Core
        </button>
        
        {/* Button 2 */}
        <button
          onClick={() => handleButtonClick(".Net Core")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === ".Net Core" ? "bg-pink-600 text-white" : "bg-pink-200 text-pink-600 hover:bg-pink-500 hover:text-white"
          }`}
        >
          .Net Core
        </button>
        
        {/* Button 3 */}
        <button
          onClick={() => handleButtonClick("Java")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "Java" ? "bg-blue-400 text-white" : "bg-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white"
          }`}
        >
          Java
        </button>
        
        {/* Button 4 */}
        <button
          onClick={() => handleButtonClick("C#")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "C#" ? "bg-green-400 text-white" : "bg-green-200 text-green-600 hover:bg-green-500 hover:text-white"
          }`}
        >
          C#
        </button>
        <button
          onClick={() => handleButtonClick("ReactJS")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === "ReactJS" ? "bg-purple-400 text-white" : "bg-purple-200 text-purple-600 hover:bg-purple-500 hover:text-white"
          }`}
        >
          ReactJS
        </button>
        <button
          onClick={() => handleButtonClick(".NET")}
          className={`py-2 px-4 rounded transition duration-300 ${
            filter === ".NET" ? "bg-red-400 text-white" : " bg-red-200 text-red-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          .NET
        </button>
      </div>
    </div>
  );
};

export default BlogFilter;



