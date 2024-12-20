import React, { useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import facebookLogo from './assets/Images/Socialmediaimg/fb.jpeg'; 
import GitLogo from './assets/Images/Socialmediaimg/github.jpeg'; 
import twitterLogo from './assets/Images/Socialmediaimg/twitter.jpeg';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showPopup, setShowPopup] = useState(false); // Popup state
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://geeksarray-001-site5.atempurl.com/api/User/contact', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...formData,
                  from: formData.email // Assuming `from` is the user's email
              }),
          });
  
          if (response.ok) {
              // Clear the form fields
              setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  message: ''
              });
              // Show thank you popup on success
              setShowPopup(true);
          } else {
              const errorData = await response.json();
              setError(errorData.Message || 'Error occurred while sending message.');
          }
      } catch (error) {
          setError('Error occurred while sending message.');
      }
  };
  
  

    return (
        <>
            <Header />
            <div className="flex flex-col lg:flex-row justify-between px-8 py-12 font-sans">
                <div className="lg:w-2/5">
                    <h2 className="text-3xl font-bold mt-24">Let's Talk</h2>
                    <p className="mt-4 text-base leading-relaxed">
                        Have some big idea or brand to develop and need help? Then reach out,
                        we'd love to hear about your project and provide help.
                    </p>
                    <div className="mt-6">
                        <h4 className="font-semibold">Email</h4>
                        <div className="flex items-center mt-2">
                            <p>info@example.com</p>
                        </div>
                        <br />
                        <h4 className="font-semibold mt-4">Connect Us</h4>
                        <div className="flex gap-4 mt-3">
                            <a href="https://www.facebook.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={facebookLogo} alt="Facebook" className="w-8 h-8" />
                            </a>
                            <a href="https://github.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={GitLogo} alt="GitHub" className="w-8 h-8" />
                            </a>
                            <a href="https://x.com/geeksarray" target="_blank" rel="noopener noreferrer">
                                <img src={twitterLogo} alt="Twitter" className="w-8 h-8" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/5 flex justify-center items-center mt-16 lg:mt-0">
                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
                            value={formData.name} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <br />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <br />
                        <input 
                            type="text" 
                            name="subject" 
                            placeholder="Subject" 
                            className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
                            value={formData.subject} 
                            onChange={handleInputChange} 
                        />
                        <br />
                        <textarea 
                            name="message" 
                            placeholder="Message" 
                            className="w-full p-4 mb-6 border border-gray-300 rounded-lg h-36"
                            value={formData.message} 
                            onChange={handleInputChange} 
                            required 
                        />
                        <br />
                        <button type="submit" className="w-1/4 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800">
                            Send
                        </button>
                    </form>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                        <p className="text-lg text-gray-800 mb-4">Thank you for contacting us!</p>
                        <button onClick={() => setShowPopup(false)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500">
                            Close
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <Footer />
        </>
    );
};

export default ContactForm;
