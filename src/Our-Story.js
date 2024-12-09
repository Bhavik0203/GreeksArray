import React from "react";
import "./FAQs.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const OurStory = () => {
  return (
    <>
      <Header/>
      <div className="our-story-section">
      <h2>Our Story</h2>
      <p>
        At Medium, we believe that everyone has a story to share. Founded with a vision to create
        a place where ideas can flourish and voices can be heard, we’ve grown into a global platform
        for readers and writers.
      </p>
      <p>
        Our mission is to connect people through the power of words. Whether you're seeking inspiration, 
        sharing expertise, or starting meaningful conversations, Medium provides the tools and audience 
        to make it happen.
      </p>
      <p>
        Join us in celebrating the art of storytelling and the exchange of ideas that shape our world.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default OurStory;
