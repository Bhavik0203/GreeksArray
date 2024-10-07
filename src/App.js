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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogslider" element={<Blogslider />} />
        <Route path="/blogs/:blogId" element={<Blogs />} />
        <Route path="/Allblogs" element={<Allblogs />} />
        <Route path="/Sign-In" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/latest-blogs" element={<Geeksblog />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact-us" element={<ContactForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Comment-section" element={<Commentsection />} />
        <Route
          path="/Write"
          element={
            <PrivateRoute>
              <Newstory />
            </PrivateRoute>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/terms&conditions" element={<Termsandcodition />} />
        <Route path="/blognew" element={<BlogNew />} />
        {/* <Route path="/new-story" element={<Newstory />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
