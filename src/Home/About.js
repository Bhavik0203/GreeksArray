import React from "react";
import facebookLogo from "../assets/Images/Socialmediaimg/fb.jpeg";
import GitLogo from "../assets/Images/Socialmediaimg/github.jpeg";
import twitterLogo from "../assets/Images/Socialmediaimg/twitter.jpeg";
import aboutbanner from "../assets/Images/banners/Banner 2.jpg";
import backgroundImage from "../assets/Images/banners/Banner 2.jpg";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <>
      <Header />

      <div>
        <div
          class="bg-white py-12 px-4 bg-gradient-to-r from-white  "
          style={{
            backgroundColor: "linear-gradient(135deg, #8dfcfc, #f5d395) ", margin:"auto 150px"
          }}
        >
          <div class="max-w-7xl max-md:max-w-md mx-auto max-md:text-center">
            <h2 class="text-gray-800 lg:text-6xl md:text-5xl text-3xl font-extrabold lg:!leading-[64px] md:max-w-4xl">
              About GeeksArray
            </h2>
            <div class="grid md:grid-cols-2 gap-12 mt-6">
              <div>
                {/* <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  Welcome to GeeksArray. This site is about sharing my knowledge
                  about{" "}
                  <b>
                    ASP.NET, ASP.NET Core, ASP.MVC, Architecture, Microservices,
                    Azure, SQL Server And Many More.
                  </b>
                </p>
                <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  As of now we have started only blogging, many other features
                  that helps a Geek, will be introduced shortly. Even though we
                  are spreading knowledge about Microsoft technologies we do not
                  have any direct or indirect relation or association with
                  Microsoft, its partners or its subsidiaries.
                </p>
                <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  GeeksArray gaining popularity and have been able to get high
                  Alexa rank and Google rank.
                </p> */}
                <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  GeeksArray is your ultimate destination for all things tech. We're dedicated to empowering individuals with the knowledge and skills needed to succeed in the ever-evolving IT industry.
                </p>
                <h3 class="text-gray-600 text-base leading-relaxed text-justify"><b>What We Offer:</b></h3>
                <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  •	<b>Comprehensive Tutorials</b>: Dive deep into our extensive library of tutorials covering a wide range of programming languages, frameworks, and technologies. From beginner-friendly guides to advanced concepts, we've got you covered.
<br></br>•	<b>In-Depth Blogs</b>: Stay up-to-date with the latest trends, best practices, and industry news through our insightful blog posts. Our expert authors share valuable insights and practical tips to help you stay ahead of the curve.
{/* <br></br>•	<b>Engaging Courses</b>: Elevate your skills with our comprehensive online courses. Learn at your own pace and gain hands-on experience through interactive exercises and real-world projects. */}
{/* <br></br>•	<b>Job Opportunities</b>: Connect with top employers and explore exciting career opportunities in the tech industry. Our job board features a variety of roles, from software development to cybersecurity, to help you find your dream job. */}

                </p>
                <br></br>
               

              </div>
              <div>
                <img
                  src={aboutbanner}
                  style={{ height: "300px", width: "500px" }}
                  className="w-auto pl-4"
                />
              </div>
             
              
            </div>
            <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  {/* •	<b>Comprehensive Tutorials</b>: Dive deep into our extensive library of tutorials covering a wide range of programming languages, frameworks, and technologies. From beginner-friendly guides to advanced concepts, we've got you covered. */}
{/* <br></br>•	<b>In-Depth Blogs</b>: Stay up-to-date with the latest trends, best practices, and industry news through our insightful blog posts. Our expert authors share valuable insights and practical tips to help you stay ahead of the curve. */}
•	<b>Engaging Courses</b>: Elevate your skills with our comprehensive online courses. Learn at your own pace and gain hands-on experience through interactive exercises and real-world projects. 
•	<b>Job Opportunities</b>: Connect with top employers and explore exciting career opportunities in the tech industry. Our job board features a variety of roles, from software development to cybersecurity, to help you find your dream job.

                </p>
            <h3 class="text-gray-600 text-base leading-relaxed text-justify"><b>Our Mission:</b></h3>
                <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  To foster a vibrant community of tech enthusiasts and provide them with the resources they need to thrive. We're committed to empowering individuals to achieve their full potential and make a significant impact in the world of technology.
                  </p>
                  <br></br>
                <h3 class="text-gray-600 text-base leading-relaxed text-justify"><b>Join the GeeksArray Community Today!</b></h3>
                <p class="text-gray-600 text-base leading-relaxed text-justify">
                  {" "}
                  Whether you're a seasoned developer or just starting your tech journey, GeeksArray is here to support you. Explore our resources, connect with fellow geeks, and embark on your path to tech excellence.</p>
                <br></br><p style={styles.paragraph}>
                  Follow <strong class="text-gray-600 text-base leading-relaxed text-justify">GeeksArray</strong>
                </p>
                <div style={styles.socialIcons}>
                  <a
                    href="https://www.facebook.com/geeksarray"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={facebookLogo}
                      alt="Facebook"
                      style={styles.socialIcon}
                    />
                  </a>
                  <a
                    href="https://github.com/geeksarray"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={GitLogo} alt="GitHub" style={styles.socialIcon} />
                  </a>
                  <a
                    href="https://x.com/geeksarray"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={twitterLogo}
                      alt="Twitter"
                      style={styles.socialIcon}
                    />
                  </a>
                </div>
                {/* Contact Section */}
                <p style={styles.paragraph}>
                  For any query, concern, or suggestion, please{" "}
                  <Link to="/Contact-us" style={styles.contactLink}>
                    contact us
                  </Link>
                </p>

                <div class="mt-12 flex gap-4 items-center flex-wrap max-md:justify-center">
                  <Link to="/blogs">
                    <button
                      type="button"
                      class="bg-[#000]  transition-all text-white font-bold text-sm rounded-full px-6 py-3"
                    >
                      Getting Started
                    </button>
                  </Link>
                </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Styles for the component
const styles = {
  banner: {
    width: "100%",
    height: "300px",
    backgroundImage: `url(${backgroundImage})`, // Replace with actual path
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  bannerText: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  content: {
    margin: "20px",
  },
  heading: {
    fontSize: "35px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  socialIcons: {
    marginBottom: "15px",
    display: "flex",
    gap: "10px",
  },
  socialIcon: {
    width: "30px",
    height: "30px",
  },
  contactLink: {
    color: "#0073e6",
    textDecoration: "none",
  },
};

export default About;
