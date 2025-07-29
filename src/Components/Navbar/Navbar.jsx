import "./NavBar.css";
import { useLanguage } from "../Main/Main";
import PropTypes from "prop-types";
import { useState } from "react";

const Navbar = ({ onLogoClick }) => {
  const { getText } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="brand-name" onClick={onLogoClick}>
            {getText('অন্বেষণ', 'Onneshon')}
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="desktop-menu">
            <a 
              href="/news"
              className="nav-link"
            >
              {getText('খবর', 'News')}
            </a>
            <a 
              href="/chatbot" 
              className="nav-link"
            >
              {getText('কথাকুঞ্জ', 'Chatbot')}
            </a>
          </div>
          
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line`}></i>
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <a 
              href="/news"
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              <i className="ri-newspaper-line"></i>
              {getText('খবর', 'News')}
            </a>
            <a 
              href="/chatbot" 
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              <i className="ri-chat-3-line"></i>
              {getText('কথাকুঞ্জ', 'Chatbot')}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onLogoClick: PropTypes.func.isRequired,
};

export default Navbar;