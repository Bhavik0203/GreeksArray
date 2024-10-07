import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Dashboard = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Add Property Manually */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Blog</h2>
            <p className="text-gray-600 mb-4">Add new property details manually to the database.</p>
            <Link 
              to="" 
              className="inline-block bg-teal-600  text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
            >
              Go to Form
            </Link>
          </div>
          
          {/* Card 2: Bulk Property */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">View All Blog </h2>
            <p className="text-gray-600 mb-4">Upload multiple property details in one go.</p><br/>
            <Link 
              to="" 
              className="inline-block bg-teal-600  text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
            >
              Upload Bulk Data
            </Link>
          </div>

          {/* Card 3: Add Project */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Project</h2>
            <p className="text-gray-600 mb-4">Create and manage new projects for properties.</p>
            <Link 
              to="" 
              className="inline-block bg-teal-600  text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
            >
              Add New Project
            </Link>
          </div>

          {/* Card 4: View All Property */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">View All Property</h2>
            <p className="text-gray-600 mb-4">View and manage all listed properties.</p>
            <Link 
              to="" 
              className="inline-block bg-teal-600  text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
            >
              View All
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Latest Enquiry</h2>
            <p className="text-gray-600 mb-4">Upload multiple property details in one go.</p>
            <Link 
           to="" 
              className="inline-block bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 ease-in-out"
            >
                 View All
            </Link>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default Dashboard;
