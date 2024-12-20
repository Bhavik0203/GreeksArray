import React from "react";
import facebookLogo from "../assets/Images/Socialmediaimg/fb.jpeg";
import GitLogo from "../assets/Images/Socialmediaimg/github.jpeg";
import twitterLogo from "../assets/Images/Socialmediaimg/twitter.jpeg";
import aboutbanner from "../assets/Images/banners/Banner 2.jpg";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-white via-blue-100 to-pink-100 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h2 className="text-gray-800 lg:text-6xl md:text-5xl text-3xl font-extrabold leading-tight">
            About GeeksArray
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-8 items-center">
            <div>
              <p className="text-gray-600 text-base leading-relaxed">
                Welcome to GeeksArray. This site is about sharing my knowledge
                about{" "}
                <b>
                  ASP.NET, ASP.NET Core, ASP.MVC, Architecture, Microservices,
                  Azure, SQL Server, and many more.
                </b>
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4">
                As of now, we have started only blogging. Many other features
                that help a Geek will be introduced shortly. Even though we are
                spreading knowledge about Microsoft technologies, we do not have
                any direct or indirect relation or association with Microsoft or
                its subsidiaries.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4">
                GeeksArray is gaining popularity and has achieved high Alexa and
                Google ranks.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mt-4">
                GeeksArray is your ultimate destination for all things tech.
                We're dedicated to empowering individuals with the knowledge and
                skills needed to succeed in the ever-evolving IT industry.
              </p>
              <h3 className="text-gray-800 font-semibold mt-6">What We Offer:</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>
                  <b>Comprehensive Tutorials</b>: Dive deep into our extensive
                  library of tutorials covering various programming languages and
                  frameworks.
                </li>
                <li className="mt-2">
                  <b>In-Depth Blogs</b>: Stay updated with trends, best
                  practices, and industry news.
                </li>
                <li className="mt-2">
                  <b>Engaging Courses</b>: Learn at your own pace with interactive
                  exercises and projects.
                </li>
                <li className="mt-2">
                  <b>Job Opportunities</b>: Connect with top employers and explore
                  exciting career opportunities.
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src={aboutbanner}
                alt="About GeeksArray"
                className="rounded-md shadow-md max-w-full h-auto"
              />
            </div>
          </div>
          <h3 className="text-gray-800 font-semibold mt-10">Our Mission:</h3>
          <p className="text-gray-600 text-base leading-relaxed mt-4">
            To foster a vibrant community of tech enthusiasts and provide them
            with the resources they need to thrive. We're committed to
            empowering individuals to achieve their full potential and make a
            significant impact in the world of technology.
          </p>
          <h3 className="text-gray-800 font-semibold mt-10">
            Join the GeeksArray Community Today!
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mt-4">
            Whether you're a seasoned developer or just starting your tech
            journey, GeeksArray is here to support you. Explore our resources,
            connect with fellow geeks, and embark on your path to tech
            excellence.
          </p>
          <div className="flex justify-center mt-8 gap-4">
            <a
              href="https://www.facebook.com/geeksarray"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10"
            >
              <img src={facebookLogo} alt="Facebook" className="rounded-full" />
            </a>
            <a
              href="https://github.com/geeksarray"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10"
            >
              <img src={GitLogo} alt="GitHub" className="rounded-full" />
            </a>
            <a
              href="https://x.com/geeksarray"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10"
            >
              <img src={twitterLogo} alt="Twitter" className="rounded-full" />
            </a>
          </div>
          <div className="mt-12 text-center">
            <Link to="/Contact-us">
              <button className="bg-black text-white px-6 py-3 rounded-full font-bold">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
