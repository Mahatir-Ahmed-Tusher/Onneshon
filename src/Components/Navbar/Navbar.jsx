import "./NavBar.css";
import { useLanguage } from "../Main/Main";

const Navbar = () => {
  const { language, setLanguage, getText } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand-container">
          <div className="brand-name">
            {getText('অন্বেষণ', 'Onneshon')}
          </div>
        </div>
        
        <div className="language-toggle">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={language === 'en'} 
              onChange={toggleLanguage}
            />
            <span className="slider">
              <span className="language-text">
                {language === 'bn' ? 'বাং' : 'EN'}
              </span>
            </span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;