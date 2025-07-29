import { useState } from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>অন্বেষণ</h3>
            <p>An Endeavour of SlotHub</p>
          </div>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">
              গোপনীয়তা নীতি | Privacy Policy
            </a>
            <a href="/terms" className="footer-link">
              সেবার শর্তাবলী | Terms of Service
            </a>
            <a href="/contact" className="footer-link">
              যোগাযোগ | Contact
            </a>
            <a href="/settings" className="footer-link">
              সেটিংস | Settings
            </a>
          </div>
          <p className="copyright">© 2025 অন্বেষণ - SlotHub. সকল অধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;