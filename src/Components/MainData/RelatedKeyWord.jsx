import PropTypes from "prop-types";
import "./RelatedKeyWord.css";
import { useLanguage } from "../Main/Main";

const RelatedKeyWord = ({ sendDataParam }) => {
  const { getText } = useLanguage();

  if (!sendDataParam?.related_keywords?.keywords?.length) return null;

  return (
    <div className="related-keywords-section">
      <div className="section-header">
        <h2 className="section-title">
          {getText('সম্পর্কিত কীওয়ার্ড', 'Related Keywords')}
        </h2>
      </div>
      
      <div className="keywords-container">
        {sendDataParam.related_keywords.keywords.map((result, index) => (
          <button
            key={index}
            className="keyword-tag"
            onClick={() => {
              // You can add functionality to search for this keyword
              console.log('Search for:', result?.keyword);
            }}
          >
            <span className="keyword-text">{result?.keyword}</span>
            <i className="ri-search-2-line keyword-icon"></i>
          </button>
        ))}
      </div>
    </div>
  );
};

RelatedKeyWord.propTypes = {
  sendDataParam: PropTypes.any.isRequired,
};

export default RelatedKeyWord;