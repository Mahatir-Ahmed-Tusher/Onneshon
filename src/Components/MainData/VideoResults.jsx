import "./VideoResults.css";
import PropTypes from "prop-types";
import { useLanguage } from "../Main/Main";

const VideoResults = ({ videoResults }) => {
  const { getText } = useLanguage();

  if (!videoResults?.length) return null;

  const getVideoThumbnail = (url) => {
    // Extract YouTube video ID and create thumbnail URL
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/mqdefault.jpg`;
    }
    
    // For other video platforms, we'll use a placeholder
    return '/video-placeholder.jpg';
  };

  const getVideoDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return 'Video';
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return null;
    
    // Convert seconds to MM:SS format if it's a number
    if (typeof duration === 'number') {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return duration;
  };

  return (
    <div className="video-results-section">
      <div className="section-header">
        <h2 className="section-title">
          {getText('ভিডিওর ফলাফল', 'Videos')}
        </h2>
        <p className="results-count">
          {getText(`${videoResults.length}টি ভিডিও পাওয়া গেছে`, `${videoResults.length} videos found`)}
        </p>
      </div>
      
      <div className="videos-grid">
        {videoResults.map((video, index) => (
          <article key={index} className="video-card">
            <a href={video.url} target="_blank" rel="noreferrer" className="video-link">
              <div className="video-thumbnail">
                <img 
                  src={getVideoThumbnail(video.url)} 
                  alt={video.title}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to a generic video icon
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="video-placeholder" style={{ display: 'none' }}>
                  <i className="ri-play-circle-line"></i>
                </div>
                <div className="play-overlay">
                  <i className="ri-play-fill"></i>
                </div>
                {video.duration && (
                  <span className="video-duration">
                    {formatDuration(video.duration)}
                  </span>
                )}
              </div>
              
              <div className="video-content">
                <h3 className="video-title">{video.title}</h3>
                
                <div className="video-meta">
                  <span className="video-source">
                    <i className="ri-global-line"></i>
                    {getVideoDomain(video.url)}
                  </span>
                </div>
                
                {video.content && (
                  <p className="video-description">
                    {video.content.length > 150 
                      ? `${video.content.substring(0, 150)}...` 
                      : video.content
                    }
                  </p>
                )}
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

VideoResults.propTypes = {
  videoResults: PropTypes.array.isRequired,
};

export default VideoResults;
