import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import ContactForm from './ContactForm';
import VideoPage from './VideoPage';

const NavigationLinks = () => {
  const location = useLocation();
  if (location.pathname === '/video-page') {
    return null;
  }

  return (
    <nav className="navigation-links">
      <a href="https://ijsrem.com/download/intelligence-surveillance-system-using-machine-learning/" className="nav-link">ResearchPaperLink</a>
          <a href="https://arxiv.org/pdf/2301.03561" className="nav-link">BasePaper</a>
          <a href="https://docs.google.com/presentation/d/1WnB6SkX2wB4iZOjSV4DqfRj6u8lYL1hn/edit?usp=sharing&ouid=103637770682511984535&rtpof=true&sd=true" className="nav-link">ProjectPPT</a>
          <a href="https://drive.google.com/file/d/1lw5s-O62Q5GPJWzbDDU2oBbu1RlC3I_I/view?usp=sharing" className="nav-link">ProjectSynopsis</a>
          <a href="https://drive.google.com/file/d/1s0np2MN_ecK0YROCL6pA4wECcBPUzlP6/view?usp=sharing" className="nav-link">ProjectReport</a>
      <Link to="/video-page" className="nav-link">ProjectVideo And Live Person Detection</Link>
    </nav>
  );
};

const ContactSection = () => {
  const location = useLocation();
  if (location.pathname === '/video-page') {
    return null;
  }

  return (
    <section className="contact-section">
      <h2>Contact Us For Any Query</h2>
      <ContactForm />
    </section>
  );
};

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Welcome to Intelligence Surveillance System<br /> Landing Page of Project</h1>
          <NavigationLinks />
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/video-page" element={<VideoPage />} />
            <Route path="/" element={<p>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING<br /> <br />IIMT COLLEGE OF ENGINEERING, GREATER NOIDA.</p>} />
          </Routes>
        </main>
        <footer>
          <ContactSection />
          <section className="copyright-section">
          <p>&copy; 2024 Prof.  Badal Bhushan,Suyash Bajpai,Rahul Kumar, Saurabh Vashistha  . All rights reserved.</p>
            
          </section>
        </footer>
      </div>
    </Router>
  );
}

export default App;
