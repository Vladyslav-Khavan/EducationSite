import React from "react";
import facebook from "../assets/images/icons8-facebook.svg";
import instagram from "../assets/images/icons8-instagram.svg";
import twitter from "../assets/images/icons8-twitter.svg";

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 VzdelajSa. Všetky práva vyhradené.</p>
      <div className="social-links d-flex justify-content-center">
        <a href="link" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook" className="social-icon mx-2" />
        </a>
        <a href="link" target="_blank" rel="noopener noreferrer">
          <img src={instagram} alt="Instagram" className="social-icon mx-2" />
        </a>
        <a href="link" target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="Twitter" className="social-icon mx-2" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
