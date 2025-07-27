import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div>
          <div className="footer-brand">
            <h3>অন্বেষণ</h3>
            <p>An Endeavour of SlotHub</p>
          </div>
          <div className="footer-links">
            <a href="#" rel="noreferrer">গোপনীয়তা্র নীতি | Privacy Policy</a>
            <a href="#" rel="noreferrer">সেবার শর্তাবলী | Terms of Service</a>
            <a href="#" rel="noreferrer">যোগাযোগ | Contact</a>
          </div>
          <p className="copyright">© 2025 অন্বেষণ - SlotHub. সকল অধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
