import "./ImageResults.css";
import PropTypes from "prop-types";
import { useLanguage } from "../Main/Main";
import { useState } from "react";

const ImageResults = ({ imageResults }) => {
  const { getText } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  if (!imageResults?.length) return null;

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="image-results-section">
      <div className="section-header">
        <h2 className="section-title">
          {getText('ছবির ফলাফল', 'Images')}
        </h2>
        <p className="results-count">
          {getText(`${imageResults.length}টি ছবি পাওয়া গেছে`, `${imageResults.length} images found`)}
        </p>
      </div>
      
      <div className="images-grid">
        {imageResults.map((image, index) => (
          <div 
            key={index} 
            className="image-card"
            onClick={() => handleImageClick(image)}
          >
            <div className="image-container">
              <img 
                src={image.url} 
                alt={image.description || `Image ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="image-overlay">
                <i className="ri-eye-line"></i>
                <span>{getText('দেখুন', 'View')}</span>
              </div>
            </div>
            {image.description && (
              <p className="image-description">{image.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              <i className="ri-close-line"></i>
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.description || 'Selected image'}
            />
            {selectedImage.description && (
              <div className="modal-description">
                <p>{selectedImage.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

ImageResults.propTypes = {
  imageResults: PropTypes.array.isRequired,
};

export default ImageResults;
