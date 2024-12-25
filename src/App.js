import "./App.css";
import Allblogs from "./Blogs/Allblogs";
import Blogs from "./Blogs/Blogs";
import Blogslider from "./Blogslider/Blogslider";
import Home from "./Home/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import Register from "./Register/Register";
import Profile from "./Profile/Profile";
import Geeksblog from "./Geeksblog";
import About from "./Home/About";
import ContactForm from "./ContactForm";
import PrivacyPolicy from "./PrivacyPolicy";
import Notification from "./Notification/Notification";
import Commentsection from "./CommentSection/Commentsection";
import Newstory from "./DefaultEditor/Newstory";
import Dashboard from "./AdminDashboard/Dashboard";
import Termsandcodition from "./Termsandcodition";
import BlogNew from "./Blogs/BlogNew";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./SignIn/ForgotPassword";
import OtpPage from "./SignIn/OtpPage";
import EditBlog from "./Blogs/EditBlog.js";
import FAQs from "./FAQs.js";
import OurStory from "./Our-Story.js";
import BookMarkedBlog from "./Blogs/BookMarkedBlog.js";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogslider" element={<Blogslider />} />
        <Route path="/blogs/:slug" element={<Blogs />} />
        <Route path="/blogs" element={<Allblogs />} />
        <Route path="/Sign-In" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/latest-blogs" element={<Geeksblog />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact-us" element={<ContactForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/FAQs" element={<FAQs/>} />
        <Route path="/Our-Story" element={<OurStory/>} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Comment-section" element={<Commentsection />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/otp" element={<OtpPage/>} />
        
        <Route
          path="/Write"
          element={
            <PrivateRoute>
              <Newstory />
            </PrivateRoute>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/EditBlog" element={<EditBlog/>} />
        <Route path="/terms&conditions" element={<Termsandcodition />} />
        <Route path="/blognew" element={<BlogNew />} />
        <Route path="/bookMarkedBlog" element={< BookMarkedBlog/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
