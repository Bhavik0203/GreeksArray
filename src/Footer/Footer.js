import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-8 md:px-16 font-sans tracking-wide w-full">
      <div className="flex flex-col md:flex-row justify-between items-center text-center gap-6">
        <p className="text-[15px] leading-loose">© Geeksarray. All rights reserved.</p>
        <ul className="flex flex-wrap justify-center md:justify-start gap-4">
          <li>
            <Link to="/Our-Story" className="text-[15px] text-gray-300 hover:text-white">
              Our Story
            </Link>
          </li>
          <li>
            <Link to="/FAQs" className="text-[15px] text-gray-300 hover:text-white">
              FAQs
            </Link>
          </li>
          <li>
            <Link to="/terms&conditions" className="text-[15px] text-gray-300 hover:text-white">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="text-[15px] text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/Contact-us" className="text-[15px] text-gray-300 hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
