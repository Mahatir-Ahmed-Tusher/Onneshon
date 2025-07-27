import "./MoreResults.css";
import PropTypes from "prop-types";
import { useLanguage } from "../Main/Main";

const MoreResults = ({ sendDataParam }) => {
  MoreResults.propTypes = {
    sendDataParam: PropTypes.any.isRequired,
  };
  
  const { getText } = useLanguage();

  return (
    <div className="MainData-MoreResults-container">
      <h3 className="Heading">
        {sendDataParam?.results?.length ? getText('আরও বিস্তারিত ফলাফল', 'More Results') : ""}
      </h3>
      <div className="MainData-MoreResults-container-content">
        {sendDataParam?.results?.map((result, key) => {
          return (
            <div key={key} className="MainData-MoreResults">
              <p className="title-more-results" title={getText('শিরোনাম', 'Title')}>
                {result?.title}
              </p>
              <p className="description-more-results" title={getText('বিবরণ', 'Description')}>
                {result?.description}
              </p>
              <button className="button-more-results" title={result?.url}>
                <a
                  className="link-more-results"
                  href={result?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {getText('আরও বিষয়বস্তু পান', 'Get More Content')}
                </a>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreResults;
