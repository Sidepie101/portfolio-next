//import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Pied.css';
//import GitHubIcon from '@mui/icons-material/GitHub';
//import LinkedInIcon from '@mui/icons-material/LinkedIn';


function Pied() {
  return (
    <footer className="footer-container bg-dark text-white">
      <div className="container-fluid d-flex justify-content-between align-items-center footer-content" style={{ height: '80px' }}>
        <div className="me-auto ml-3">
          <p className="lets-connect"> "Let's connect" </p>
        </div>
        <div className="d-flex align-items-center">
          <div className="text-white me-3">
            <a
              href="https://www.linkedin.com/in/taha-moukhlisse/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              {/* <LinkedInIcon /> */} LinkedIn
            </a>
          </div>
          <div className="text-white">
            <a
              href="https://github.com/Sidepie101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              {/* <GitHubIcon /> */} GIT
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid gradient-bg text-center py-2 footer-bottom">
        <p className="m-0">&copy; 2023 - 2023 TahaM. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Pied;
