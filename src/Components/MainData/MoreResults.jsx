import "./MoreResults.css";
import PropTypes from "prop-types";
import { useLanguage } from "../Main/Main";

const MoreResults = ({ sendDataParam }) => {
  const { getText } = useLanguage();

  if (!sendDataParam?.results?.length) return null;

  return (
    <div className="more-results-section">
      <div className="section-header">
        <h2 className="section-title">
          {getText('আরও ফলাফল', 'Search Results')}
        </h2>
        <p className="results-count">
          {getText(`${sendDataParam.results.length}টি ফলাফল পাওয়া গেছে`, `${sendDataParam.results.length} results found`)}
        </p>
      </div>
      
      <div className="results-grid">
        {sendDataParam.results.map((result, index) => (
          <article key={index} className="result-card">
            <div className="result-content">
              <h3 className="result-title">
                <a href={result?.url} target="_blank" rel="noreferrer">
                  {result?.title}
                </a>
              </h3>
              
              <p className="result-description">
                {result?.description}
              </p>
              
              <div className="result-footer">
                <div className="result-url">
                  <i className="ri-external-link-line"></i>
                  <span>{new URL(result?.url).hostname}</span>
                </div>
                
                <a
                  href={result?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="result-link"
                >
                  {getText('পড়ুন', 'Read More')}
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

MoreResults.propTypes = {
  sendDataParam: PropTypes.any.isRequired,
};

export default MoreResults;