import { useEffect, useState, useRef } from 'react';
import '../styles/ProjectDetail.css';
/* import '../styles/layout.css'; */


const ProjectDetailPanel = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

  const handleNext = () => {
    setDirection('next');
    setCurrentImageIndex((prevIndex) => 
      prevIndex === project.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (project.images?.length || 1) - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const swipeDistance = touchEndX.current - touchStartX.current;
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (project?.images?.length > 1) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, project, handleNext, handlePrev]);

  // prevent background scroll / section swapping when modal is open
  const preventScroll = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (!project) return null;

  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`project-detail-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => e.target.classList.contains('project-detail-overlay') && onClose()}
      onWheel={preventScroll}
      onTouchMove={preventScroll}
    >
      <div className="project-detail-panel">
        <button className="project-detail-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="project-detail-image">
          {project.images && project.images.length > 0 && (
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="image-container"
            >
              <img 
                className={`detail-image ${
                  direction === 'next' ? 'sliding-next-in' :
                  direction === 'prev' ? 'sliding-prev-in' : ''
                }`}
                src={project.images[currentImageIndex]} 
                alt={`${project.title} image ${currentImageIndex + 1}`}
                onAnimationEnd={() => setDirection(null)} 
              />

              {project.images.length > 1 && (
                <>
                  <button 
                    className="image-nav prev" 
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button 
                    className="image-nav next" 
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  
                  <div className="image-navigation">
                    <div className="image-counter">
                      {currentImageIndex + 1}/{project.images.length}
                    </div>
                    
                    <div className="image-indicators">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          className={`image-dot ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => handleDotClick(index)}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="project-detail-content">
          <div className="project-detail-header">
            <div>
              <h2>{project.title}</h2>
            </div>
            <span className={`status-badge ${project.status}`}>
              {project.status}
            </span>
          </div>

          <div className="project-detail-section">
            <h3>Goal</h3>
            <p>{project.goal}</p>
          </div>

          <div className="project-detail-section">
            <h3>Description</h3>
            <p>{project.description}</p>
          </div>

          <div className="project-detail-section">
            <h3>Tools & Technologies</h3>
            <div className="project-tools">
              {project.tools.map((tool, index) => (
                <span key={index} className="tool-badge">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="project-actions">
            <button 
              className="button-primary"
              onClick={() => handleLinkClick(project.liveDemo)}
              disabled={!project.liveDemo}
            >
              Live Demo
            </button>
            <button 
              className="button-secondary"
              onClick={() => handleLinkClick(project.repo)}
              disabled={!project.repo}
            >
              GitHub Repo
            </button>
          </div>

          <div className="status-legend">
            <div className="status-legend-item">
              <span className="status-legend-dot completed"></span>
              <span>Completed</span>
            </div>
            <div className="status-legend-item">
              <span className="status-legend-dot ongoing"></span>
              <span>Ongoing</span>
            </div>
            <div className="status-legend-item">
              <span className="status-legend-dot maintenance"></span>
              <span>Maintenance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPanel;
