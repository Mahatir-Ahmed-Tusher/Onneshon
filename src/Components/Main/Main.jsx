import IMg from "../../assets/IMg.png";
import "remixicon/fonts/remixicon.css";
import "./Main.css";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import MainData from "../MainData/MainData";
import MoreResults from "../MainData/MoreResults";
import RelatedKeyWord from "../MainData/RelatedKeyWord";
import PacmanLoader from "react-spinners/PacmanLoader";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: 'bn', getText: (bn) => bn, setLanguage: () => {} };
  }
  return context;
};

const Main = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [sendDataParam, setSendDataParam] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('bn');
  const [hasSearched, setHasSearched] = useState(false);

  const getText = (bnText, enText) => {
    return language === 'bn' ? bnText : enText;
  };

  const sendData = async () => {
    if (!currentInput.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    const url = "https://google-web-search1.p.rapidapi.com/";
    const options = {
      method: "GET",
      url,
      params: {
        query: currentInput,
        limit: "20",
        related_keywords: "true",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
        "X-RapidAPI-Host": "google-web-search1.p.rapidapi.com",
      },
    };
    
    try {
      const response = await axios.request(options);
      setSendDataParam(response?.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <LanguageContext.Provider value={{ language, getText, setLanguage }}>
      <main className="main-container">
        <div className={`search-section ${hasSearched ? 'compact' : 'centered'}`}>
          {!hasSearched && (
            <div className="hero-section">
              <div className="hero-logo" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <img src={IMg} alt="Search Engine Logo" style={{ width: 240, height: 240, objectFit: "contain" }} />
              </div>
              <h1 className="hero-title">
                {getText('যেকোনো কিছু খুঁজুন আপনারই', 'Search in Your Own')} 
                <span className="gradient-text"> {getText('মাতৃভাষায়', 'Language')}</span>
              </h1>
              <p className="hero-subtitle">
                {getText('দ্রুত, নির্ভুল এবং বিস্তৃত অনুসন্ধান', 'Fast, Accurate, and Comprehensive Search')}
              </p>
            </div>
          )}

          <div className="search-container">
            <div className="search-box">
              <i className="ri-search-line search-icon" />
              <input
                type="text"
                placeholder={getText('কীওয়ার্ড, বিষয় কিংবা যেকোনো প্রশ্ন', 'Search for Keywords, Topics, and Ideas')}
                className="search-input"
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    sendData();
                  }
                }}
              />
              <button className="search-btn" onClick={sendData} disabled={!currentInput.trim()}>
                <i className="ri-send-plane-2-line" />
              </button>
            </div>
          </div>
        </div>

        <div className="results-section">
          {Loading ? (
            <div className="loading-container">
              <PacmanLoader color="#8b5cf6" size={20} />
              <p className="loading-text">
                {getText('অনুসন্ধান করা হচ্ছে...', 'Searching...')}
              </p>
            </div>
          ) : (
            <>
              <MainData sendDataParam={sendDataParam} />
              <MoreResults sendDataParam={sendDataParam} />
              <RelatedKeyWord sendDataParam={sendDataParam} />
            </>
          )}
        </div>
      </main>
    </LanguageContext.Provider>
  );
};

export default Main;