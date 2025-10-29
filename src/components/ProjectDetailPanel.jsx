import { useEffect } from 'react';
import '../styles/ProjectDetail.css';
/* import '../styles/layout.css'; */

const ProjectDetailPanel = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
          {project.image && <img src={project.image} alt={project.title} />}
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
