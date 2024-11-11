import "./Hero.css";
import Header from "../Header/Header";
import banner from "../assets/Images/banners/banner8.png";
import Blogslider from "../Blogslider/Blogslider";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";


const Hero = () => {
  return (
    <>
      <Header />
     

      <div className="welcome-section " >
  <div className="w-full h-full flex flex-col md:flex-row justify-between items-start  mb-8 ml-[30px] mr-[30px] " >
  <div className="md:w-1/2 flex-shrink-0 flex-grow ml-[15px] mb-[60px] mt-[60px]  ">
  <h1
    id="welcome"
    className="text-4xl lg:text-2xl text-left font-bold text-gray-900 font-spaceGrotesk mb-3 "
  >
    Welcome to GeeksArray – The Ultimate Hub for Geeks!
  </h1>
  <p className="text-justify"style={{ margin: '30px 0 10px 0' }}>
    At GeeksArray, we’re more than just a website; we’re a vibrant community
    dedicated to empowering geeks like you with the tools and knowledge to
    thrive in the tech world.
  </p>
  <br />
  <p className="text-justify" style={{ margin: '10px 0 10px 0' }}>
    <b>Explore Our Rich Content</b> : Dive into
    our technical blogs where we break down complex concepts, share the
    latest industry trends, and offer hands-on tutorials to sharpen your
    skills. Whether you’re a developer, IT professional, or tech enthusiast,
    our articles are crafted to keep you informed and inspired.
  </p>
  <br />
  <p className="text-justify"style={{ margin: '10px 0 10px 0' }}>
    <b>Advance Your Skills</b> : Our
    training programs are designed to elevate your expertise. From coding
    bootcamps and certifications to specialized workshops, we offer a range
    of learning opportunities to help you stay ahead of the curve and
    achieve your professional goals.
  </p>
  <br />
  <p className="text-justify"style={{ margin: '10px 0 10px 0' }}>
    <b>Find Your Dream Job</b> : Looking for
    new career opportunities? Our job board connects you with top employers
    in the tech industry. Browse job listings, get career advice, and find
    the perfect role to match your skills and passions.
    
    
   

  </p>
  <br />
  <p className="text-justify"style={{ margin: '10px 0 10px 0' }}>
    <b>Join us at GeeksArray </b>  and become part
    of a thriving community where geeks unite, learn, and grow. Let's take
    your tech journey to the next level!
  </p>
  <br />
  <p className="text-justify"style={{ margin: '20px 0 20px 0' }}>
    <b>Happy exploring!</b>
  </p>

  <Link to="/blogs">
    <button className="bg-black text-white px-4 py-2 rounded-lg mt-5" style={{ margin: '20px 0 20px 0' }}>
      Start Reading
    </button>
  </Link>
</div>

    <div className=" flex justify-center items-center" style={{width:'600px', height:'600px'}}>
      <img
        src={banner}
        alt="Banner"
        className=" object-cover"
      />
    </div>
  </div>
  <Footer />
</div>

      {/* <Blogslider /> */}
      <Footer />
    </>
  );
};

export default Hero;
