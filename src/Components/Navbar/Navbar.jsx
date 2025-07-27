import { useState } from "react";
import IMg from "../../assets/IMg.png";
import "./NavBar.css";

const Navbar = () => {
  const [language, setLanguage] = useState('bn'); // 'bn' for Bengali, 'en' for English

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'bn' ? 'en' : 'bn');
  };

  const getText = (bnText, enText) => {
    return language === 'bn' ? bnText : enText;
  };

  return (
    <nav>
      <div className="language-toggle">
        <button onClick={toggleLanguage} className="lang-btn">
          {language === 'bn' ? 'English' : 'বাংলা'}
        </button>
      </div>
      <figure>
        <img src={IMg} alt="brand logo" width="200px" height="auto" />
      </figure>
      <div className="brand-name">
        {getText('অন্বেষণ', 'Onneshon')}
      </div>
    </nav>
  );
};

export default Navbar;
