import { useLanguage } from "../Components/Main/Main";
import { useState, useEffect } from "react";
import "./PageStyles.css";
import "./Settings.css";

const Settings = () => {
  const { language, setLanguage, getText } = useLanguage();
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    
    if (selectedTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', selectedTheme);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">
            {getText('সেটিংস', 'Settings')}
          </h1>
          <div className="page-divider"></div>
        </div>

        <div className="page-body">
          <section className="content-section">
            <h2 className="section-title">
              {getText('থিম নির্বাচন', 'Theme Selection')}
            </h2>
            <p className="section-text">
              {getText(
                'আপনার পছন্দ অনুযায়ী থিম নির্বাচন করুন। সিস্টেম থিম আপনার ডিভাইসের সেটিংস অনুসরণ করবে।',
                'Choose your preferred theme. System theme will follow your device settings.'
              )}
            </p>
            
            <div className="settings-group">
              <div className="theme-options">
                <div 
                  className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <div className="theme-preview light-preview">
                    <i className="ri-sun-line theme-icon"></i>
                  </div>
                  <span className="theme-label">
                    {getText('হালকা', 'Light')}
                  </span>
                </div>
                
                <div 
                  className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <div className="theme-preview dark-preview">
                    <i className="ri-moon-line theme-icon"></i>
                  </div>
                  <span className="theme-label">
                    {getText('গাঢ়', 'Dark')}
                  </span>
                </div>
                
                <div 
                  className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('system')}
                >
                  <div className="theme-preview system-preview">
                    <i className="ri-computer-line theme-icon"></i>
                  </div>
                  <span className="theme-label">
                    {getText('সিস্টেম', 'System')}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('ভাষা নির্বাচন', 'Language Selection')}
            </h2>
            <p className="section-text">
              {getText(
                'আপনার পছন্দের ভাষা নির্বাচন করুন। বাংলা ডিফল্ট ভাষা হিসেবে সেট করা আছে।',
                'Choose your preferred language. Bengali is set as the default language.'
              )}
            </p>
            
            <div className="settings-group">
              <div className="language-options">
                <div 
                  className={`language-option ${language === 'bn' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('bn')}
                >
                  <div className="language-preview">
                    <span className="language-flag">🇧🇩</span>
                  </div>
                  <div className="language-info">
                    <span className="language-name">বাংলা</span>
                    <span className="language-subtitle">Bengali</span>
                  </div>
                  {language === 'bn' && (
                    <span className="default-badge">
                      {getText('ডিফল্ট', 'Default')}
                    </span>
                  )}
                </div>
                
                <div 
                  className={`language-option ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  <div className="language-preview">
                    <span className="language-flag">🇺🇸</span>
                  </div>
                  <div className="language-info">
                    <span className="language-name">English</span>
                    <span className="language-subtitle">ইংরেজি</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              {getText('সম্পর্কে', 'About')}
            </h2>
            <p className="section-text">
              {getText(
                'অন্বেষণ একটি আধুনিক বাংলা সার্চ ইঞ্জিন যা দ্রুত এবং নির্ভুল ফলাফল প্রদান করে। এটি SlotHub এর একটি উদ্যোগ।',
                'Onneshon is a modern Bengali search engine that provides fast and accurate results. It is an initiative by SlotHub.'
              )}
            </p>
            
            <div className="about-info">
              <div className="info-item">
                <span className="info-label">
                  {getText('সংস্করণ', 'Version')}:
                </span>
                <span className="info-value">1.0.0</span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  {getText('ডেভেলপার', 'Developer')}:
                </span>
                <span className="info-value">SlotHub</span>
              </div>
            </div>
          </section>
        </div>

        <div className="page-footer">
          <a href="/" className="back-link">
            <i className="ri-arrow-left-line"></i>
            {getText('হোমে ফিরে যান', 'Back to Home')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;