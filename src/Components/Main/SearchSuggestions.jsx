import PropTypes from "prop-types";
import "./SearchSuggestions.css";

const SearchSuggestions = ({ suggestions, onSuggestionClick, currentInput }) => {
  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="suggestion-highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-suggestions">
      <div className="suggestions-header">
        <i className="ri-history-line"></i>
        <span>Recent Searches</span>
      </div>
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <i className="ri-search-line suggestion-icon"></i>
            <span className="suggestion-text">
              {highlightMatch(suggestion, currentInput)}
            </span>
            <i className="ri-corner-up-left-line suggestion-arrow"></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchSuggestions.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  currentInput: PropTypes.string.isRequired,
};

export default SearchSuggestions;