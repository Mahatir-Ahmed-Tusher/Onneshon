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
    return { language: 'bn', getText: (bn) => bn };
  }
  return context;
};

const Main = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [sendDataParam, setSendDataParam] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('bn');

  const getText = (bnText, enText) => {
    return language === 'bn' ? bnText : enText;
  };

  const sendData = async () => {
    setLoading(true);
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
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <LanguageContext.Provider value={{ language, getText, setLanguage }}>
    <main>
      <div className="innerMain">
        <div className="img" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <img src={IMg} alt="" style={{ width: "600%", height: "auto", maxWidth: "250px" }} />
        </div>

        <p className="title">
          {getText('যেকোনো কিছু খুঁজুন আপনারই', 'Search in Your Own')} <span>{getText('মাতৃভাষায়', 'Language')}</span>
        </p>

        <div className="input-container">
          <i className="ri-search-line" />
          <input
            type="text"
            placeholder={getText('কীওয়ার্ড, বিষয় কিংবা যেকোনো প্রশ্ন', 'Search for Keywords, Topics, and Ideas')}
            className="input"
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
          <i className="ri-send-plane-2-line" onClick={sendData} />
        </div>
      </div>

      {Loading ? (
        <div className="loading">
          <PacmanLoader color="#8b5cf6" />
        </div>
      ) : (
        <>
          <MainData sendDataParam={sendDataParam} />
          <MoreResults sendDataParam={sendDataParam} />
          <RelatedKeyWord sendDataParam={sendDataParam} />
        </>
      )}
    </main>
    </LanguageContext.Provider>
  );
};

export default Main;
