import PropTypes from "prop-types";
import "./MainData.css";
import { useLanguage } from "../Main/Main";

const MainData = ({ sendDataParam }) => {
  MainData.propTypes = {
    sendDataParam: PropTypes.any.isRequired,
  };

  const { getText } = useLanguage();
  const { knowledge_panel } = sendDataParam;

  if (!knowledge_panel) return null;

  return (
    <div className="main-data-section">
      <div className="section-header">
        <h2 className="section-title">
          {getText('প্রধান তথ্য', 'Knowledge Panel')}
        </h2>
      </div>
      
      <div className="knowledge-panel">
        <div className="panel-header">
          <div className="panel-info">
            <h3 className="panel-title">{knowledge_panel?.name}</h3>
            {knowledge_panel?.label && (
              <p className="panel-label">{knowledge_panel?.label}</p>
            )}
            <div className="panel-source">
              <span className="source-indicator"></span>
              <a
                href={knowledge_panel?.description?.url}
                target="_blank"
                rel="noreferrer"
                className="source-link"
              >
                {knowledge_panel?.description?.site || knowledge_panel?.description?.url}
              </a>
            </div>
          </div>
          
          {knowledge_panel?.image?.url && (
            <div className="panel-image">
              <img
                src={knowledge_panel?.image?.url}
                alt={knowledge_panel?.name}
                loading="lazy"
              />
            </div>
          )}
        </div>

        {knowledge_panel?.description?.text && (
          <div className="panel-description">
            <p>{knowledge_panel?.description?.text}</p>
          </div>
        )}

        {knowledge_panel?.info && knowledge_panel.info.length > 0 && (
          <div className="panel-details">
            <h4 className="details-title">
              {getText('বিস্তারিত তথ্য', 'Details')}
            </h4>
            <div className="details-grid">
              {knowledge_panel.info.map((item, index) => (
                <div key={index} className="detail-item">
                  <span className="detail-label">{item?.title}</span>
                  <div className="detail-values">
                    {item?.labels?.map((label, labelIndex) => (
                      <span key={labelIndex} className="detail-value">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainData;