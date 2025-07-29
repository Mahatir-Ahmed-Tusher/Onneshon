import IMg from "../../assets/IMg.png";
import "remixicon/fonts/remixicon.css";
import "./Main.css";
import { useState, createContext, useContext, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import MoreResults from "../MainData/MoreResults";
import RelatedKeyWord from "../MainData/RelatedKeyWord";
import AIOverview from "../MainData/AIOverview";
import SearchSuggestions from "./SearchSuggestions";
import PacmanLoader from "react-spinners/PacmanLoader";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: 'bn', getText: (bn) => bn, setLanguage: () => {} };
  }
  return context;
};

const Main = forwardRef((props, ref) => {
  const [currentInput, setCurrentInput] = useState("");
  const [sendDataParam, setSendDataParam] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('bn');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiOverviewEnabled, setAiOverviewEnabled] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Predefined list of suggestive searches
  const suggestiveSearches = [
    "আজকের আবহাওয়া", // Today's weather
    "Top news today",
    "বাংলাদেশের ইতিহাস", // History of Bangladesh
    "Best programming languages",
    "কিভাবে রান্না করবেন", // How to cook
    "Latest movies",
    "ঢাকার পর্যটন স্থান", // Tourist places in Dhaka
    "Machine learning tutorial",
    "বাংলা সাহিত্য", // Bengali literature
    "Healthy diet tips",
    "ক্রিকেট খবর", // Cricket news
    "Web development guide"
  ];

  // Select 3 random suggestions
  const getRandomSuggestions = () => {
    const shuffled = suggestiveSearches.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [randomSuggestions, setRandomSuggestions] = useState(getRandomSuggestions());

  // Refresh suggestions on mount and when resetting to home
  useState(() => {
    setRandomSuggestions(getRandomSuggestions());
    const savedAiPreference = localStorage.getItem('aiOverviewEnabled');
    if (savedAiPreference !== null) {
      setAiOverviewEnabled(JSON.parse(savedAiPreference));
    }
    
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useImperativeHandle(ref, () => ({
    resetToHome: () => {
      setCurrentInput("");
      setSendDataParam([]);
      setLoading(false);
      setHasSearched(false);
      setSearchQuery("");
      setShowSuggestions(false);
      setRandomSuggestions(getRandomSuggestions()); // Refresh suggestions
    }
  }));

  // Save AI overview preference to localStorage
  const toggleAiOverview = () => {
    const newState = !aiOverviewEnabled;
    setAiOverviewEnabled(newState);
    localStorage.setItem('aiOverviewEnabled', JSON.stringify(newState));
  };

  // Add search to history
  const addToSearchHistory = (query) => {
    if (!query.trim()) return;
    
    const updatedHistory = [
      query.trim(),
      ...searchHistory.filter(item => item !== query.trim())
    ].slice(0, 20); // Keep only last 20 searches
    
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  // Get filtered suggestions based on current input
  const getFilteredSuggestions = () => {
    if (!currentInput.trim() || currentInput.length < 2) return [];
    
    return searchHistory
      .filter(item => 
        item.toLowerCase().includes(currentInput.toLowerCase()) &&
        item.toLowerCase() !== currentInput.toLowerCase()
      )
      .slice(0, 8); // Show max 8 suggestions
  };

  const getText = (bnText, enText) => {
    return language === 'bn' ? bnText : enText;
  };

  const sendData = async () => {
    if (!currentInput.trim()) return;
    
    // Add to search history
    addToSearchHistory(currentInput);
    setShowSuggestions(false);
    
    setLoading(true);
    setHasSearched(true);
    setSearchQuery(currentInput);
    
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentInput(value);
    setShowSuggestions(value.length >= 2);
  };

  const handleSuggestionClick = (suggestion) => {
    setCurrentInput(suggestion);
    setShowSuggestions(false);
    // Auto-search when suggestion is clicked
    setTimeout(() => {
      sendData();
    }, 100);
  };

  const handleInputFocus = () => {
    if (currentInput.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <LanguageContext.Provider value={{ language, getText, setLanguage }}>
      <main className="main-container">
        <div className="more-snow"></div> {/* Snowfall/Stars container */}
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
            {hasSearched && (
              <div className="ai-toggle-container">
                <label className="ai-toggle-label">
                  <input
                    type="checkbox"
                    checked={aiOverviewEnabled}
                    onChange={toggleAiOverview}
                    className="ai-toggle-input"
                  />
                  <span className="ai-toggle-slider"></span>
                  <span className="ai-toggle-text">
                    <i className="ri-robot-line"></i>
                    {getText('AI সারসংক্ষেপ', 'AI Overview')}
                  </span>
                </label>
              </div>
            )}
            
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
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    sendData();
                  } else if (e.key === "Escape") {
                    setShowSuggestions(false);
                  }
                }}
              />
              <button className="search-btn" onClick={sendData} disabled={!currentInput.trim()}>
                <i className="ri-send-plane-2-line" />
              </button>
              
              {showSuggestions && getFilteredSuggestions().length > 0 && (
                <SearchSuggestions
                  suggestions={getFilteredSuggestions()}
                  onSuggestionClick={handleSuggestionClick}
                  currentInput={currentInput}
                />
              )}
            </div>

            {!hasSearched && (
              <div className="suggestive-searches">
                {randomSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="suggestive-search-btn"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <i className="ri-search-eye-line suggestive-icon" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
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
              {aiOverviewEnabled && (
                <AIOverview sendDataParam={sendDataParam} searchQuery={searchQuery} />
              )}
              <MoreResults sendDataParam={sendDataParam} />
              <RelatedKeyWord sendDataParam={sendDataParam} />
            </>
          )}
        </div>
      </main>
    </LanguageContext.Provider>
  );
});

Main.displayName = 'Main';

export default Main;