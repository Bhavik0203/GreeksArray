import "./Hero.css";
import Header from "../Header/Header";
import banner1 from "../assets/Images/banners/banner8.png";
import banner2 from "../assets/Images/banners/banner9.png";
import banner3 from "../assets/Images/banners/banner12.png";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Slider from "react-slick";

const Hero = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };



  return (
    <>
    <Helmet>
        <title> Your Profile - GeeksArray</title>
        <meta name="description" content="Welcome to My Awesome Website. Discover our services and explore more through our latest notices and updates." />
        <meta name="keywords" content="Awesome Website, React, SEO, Notices, Services" />
        <meta property="og:title" content="Home - My Awesome Website" />
 
     
      </Helmet>
      <Header />
     

      <div className="welcome-section " >
      <div className="w-full h-full flex flex-col md:flex-row justify-between items-start mb-8 ml-[10px] mr-[10px] sm:ml-[30px] sm:mr-[30px]">
  <div className="md:w-1/2 flex-shrink-0 flex-grow ml-[15px] mb-[60px] mt-[60px] mr-[30px]">
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

<div className="hidden md:flex w-[400px] h-[500px] justify-center items-center mt-[50px]">
  <Slider {...{...sliderSettings, arrows: false}} className="w-full h-full">
    <div>
      <img
        src={banner1}
        alt="Banner 1"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <img
        src={banner2}
        alt="Banner 2"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <img
        src={banner3}
        alt="Banner 3"
        className="w-full h-full object-cover"
      />
    </div>
  </Slider>
</div>


    {/* <ImageSlider/> */}
  </div>

</div>

      {/* <Blogslider /> */}
      <Footer />
    </>
  );
};

export default Hero;
