import "./SearchTabs.css";
import PropTypes from "prop-types";
import { useLanguage } from "../Main/Main";

const SearchTabs = ({ activeTab, onTabChange, resultCounts }) => {
  const { getText } = useLanguage();

  const tabs = [
    {
      id: 'all',
      label: getText('সব', 'All'),
      icon: 'ri-search-line',
      count: resultCounts.all || 0
    },
    {
      id: 'images',
      label: getText('ছবি', 'Images'),
      icon: 'ri-image-line',
      count: resultCounts.images || 0
    },
    {
      id: 'videos',
      label: getText('ভিডিও', 'Videos'),
      icon: 'ri-play-circle-line',
      count: resultCounts.videos || 0
    }
  ];

  return (
    <div className="search-tabs">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <i className={tab.icon}></i>
            <span className="tab-label">{tab.label}</span>
            {tab.count > 0 && (
              <span className="tab-count">({tab.count})</span>
            )}
          </button>
        ))}
      </div>
      <div className="tab-indicator">
        <div 
          className="indicator-line"
          style={{
            transform: `translateX(${tabs.findIndex(tab => tab.id === activeTab) * 100}%)`
          }}
        />
      </div>
    </div>
  );
};

SearchTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  resultCounts: PropTypes.shape({
    all: PropTypes.number,
    images: PropTypes.number,
    videos: PropTypes.number,
  }).isRequired,
};

export default SearchTabs;
