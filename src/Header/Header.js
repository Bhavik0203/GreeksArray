import React, { useState, useEffect } from "react";
import geekarray from "../assets/geeksarray.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Header = ({ show }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState(""); // Uncommented
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null); // File input for image
  // const [avatarId, setAvatarId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(""); // Uncommented
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); 
  const handleMenuClick = (item) => {
    setActiveItem(item);
    // Close menu on click (optional)
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  // Handle log out functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove auth token from local storage
    setIsLoggedIn(false); // Update state
    navigate("/Sign-In"); 
  };
  useEffect(() => {
    fetchUserData();
  }, []);


   // API call to get user info
   useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios
        .get('http://geeksarray-001-site5.atempurl.com/api/User?isActive=true', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setUserData(response.data); // Assuming response data contains the user info
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]); // Get the selected file
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const response = await axios.get(
          "http://geeksarray-001-site5.atempurl.com/api/User?isActive=true",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the fetched user data in state
        setUserData(response.data);
        setFirstName(response.data.firstName); // Set fetched firstName
        setLastName(response.data.lastName); // Set fetched firstName
        setAvatarUrl(response.data.profileImage);
        
        
        // Set fetched avatar URL
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
  return (
    <header
      className={`flex shadow-sm py-3 px-4 sm:px-10 bg-black font-[sans-serif] min-h-[70px] tracking-wide relative z-50 `}
    >
      {" "}
      <div className="flex flex-wrap items-center justify-between lg:gap-y-4 gap-y-6 gap-x-4 w-full">
        <div className="flex flex-wrap items-center justify-between lg:gap-y-4 gap-y-6 gap-x-4 w-full">
          <Link to="/">
            <img src={geekarray} alt="logo" className="w-36" />
          </Link>

          <div
            id="collapseMenu"
            className={`max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <button
              id="toggleClose"
              onClick={toggleMenu}
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="mb-6 hidden max-lg:block">
                <a href="#">
                  <img
                    src="https://readymadeui.com/readymadeui.svg"
                    alt="logo"
                    className="w-36"
                  />
                </a>
              </li>
              <li
                className={`max-lg:border-b max-lg:py-3 max-lg:px-3 relative ${
                  activeItem === "about" ? "lg:after:w-full" : "lg:after:w-0"
                } lg:after:absolute lg:after:bg-black lg:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300`}
              >
                <Link
                  to="/about"
                  className="text-white  block text-[15px]"
                  onClick={() => handleMenuClick("about")}
                >
                  About
                </Link>
              </li>
              <li
                className={`max-lg:border-b max-lg:py-3 max-lg:px-3 relative ${
                  activeItem === "blog" ? "lg:after:w-full" : "lg:after:w-0"
                } lg:after:absolute lg:after:bg-black lg:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300`}
              >
                <Link
                  to="/blogs"
                  className="text-white  block text-[15px]"
                  onClick={() => handleMenuClick("blog")}
                >
                  Blogs
                </Link>
              </li>
              <li
                className={`max-lg:border-b max-lg:py-3 max-lg:px-3 relative ${
                  activeItem === "write" ? "lg:after:w-full" : "lg:after:w-0"
                } lg:after:absolute lg:after:bg-black lg:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300`}
              >
                <Link
                  to="/Write"
                  className="text-white  block text-[15px]"
                  onClick={() => handleMenuClick("write")}
                >
                  Write
                </Link>
              </li>

              <li
                className={`max-lg:border-b max-lg:py-3 max-lg:px-3 relative ${
                  activeItem === "contact" ? "lg:after:w-full" : "lg:after:w-0"
                } lg:after:absolute lg:after:bg-black lg:after:h-[2px] lg:after:block lg:after:top-6 lg:after:transition-all lg:after:duration-300`}
              >
                <Link
                  to="/Contact-us"
                  className="text-white block text-[15px]"
                  onClick={() => handleMenuClick("contact")}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center max-sm:ml-auto space-x-6 mt-3">
  <ul>
    <li className="relative px-1">
      <div className="cursor-pointer" onClick={toggleModal}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="profile-avatar-image rounded-full h-10 w-10 object-cover border-2 border-blue-500"
          />
        ) : (
          <div className="profile-avatar bg-blue-500 text-white h-10 w-10 flex items-center justify-center rounded-full text-xl font-bold">
            {firstName?.charAt(0) || "B"}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="bg-white z-20 shadow-md py-6 px-6 sm:min-w-[320px] max-sm:min-w-[250px] absolute right-0 top-10">
          {isLoggedIn ? (
            <>
              <h6 className="font-semibold text-[15px]">Welcome {userData?.firstName}</h6>
              <p className="text-sm text-gray-500 mt-1">
                Access your account and explore blogs.
              </p>
              <Link to="/Profile">
                <button
                  type="button"
                  className="bg-transparent border-2 border-gray-300 hover:border-black rounded px-4 py-2.5 mt-4 text-sm text-black font-semibold"
                >
                  Go To Profile
                </button>
              </Link>
              <Link to="/sign-in">
                <button
                  type="button"
                  className="bg-transparent border-2 border-gray-300 hover:border-black rounded px-4 py-2.5 mt-4 text-sm text-black font-semibold ml-1"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500 mt-1">
                To access your account, please login or sign up.
              </p>
              <Link to="/Sign-In">
                <button
                  type="button"
                  className="bg-transparent border-2 border-gray-300 hover:border-black rounded px-4 py-2.5 mt-4 text-sm text-black font-semibold"
                >
                  LOGIN / SIGNUP
                </button>
              </Link>
            </>
          )}
          <hr className="border-b-0 my-4" />
          <ul className="space-y-1.5">
            <li>
              <Link to="/Write" className="text-sm text-gray-500 hover:text-black">
                Write
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-sm text-gray-500 hover:text-black">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/Profile" className="text-sm text-gray-500 hover:text-black">
                Our Publication
              </Link>
            </li>
            <li>
              <Link
                to="/latest-blogs"
                className="text-sm text-gray-500 hover:text-black"
              >
                About us
              </Link>
            </li>
            <li>
              <Link to="/Contact-us" className="text-sm text-gray-500 hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
          <hr className="border-b-0 my-4" />
          <ul className="space-y-1.5">
            <li>
              <Link
                to="/terms&conditions"
                className="text-sm text-gray-500 hover:text-black"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-sm text-gray-500 hover:text-black"
              >
                Privacy Policy
              </Link>
            </li>
            
          </ul>
        </div>
      )}
    </li>
  </ul>

  <button id="toggleOpen" onClick={toggleMenu} className="lg:hidden ml-7">
    <svg
      className=""
      fill="#000"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  </button>
</div>

        </div>
      </div>
    </header>
  );
};

export default Header;
