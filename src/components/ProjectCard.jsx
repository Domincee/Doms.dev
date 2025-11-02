import React from 'react';

const ProjectCard = ({ project, onClick, itemsPerView = 1 }) => {
  const cardWidth = `${100 / itemsPerView}%`; // Proper template literal

  return (
    <div
      className="project-card"
      style={{
        flex: `0 0 ${cardWidth}`, // Correct string interpolation
        maxWidth: cardWidth,
        minWidth: cardWidth,
      }}
    >
      <div
        className="project-card-inner"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      >
        <div className="project-card-image">
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} cover`} // Fixed alt text syntax
            />
          )}
        </div>

        <div className="project-card-content">
          <div className="project-card-header">
            <h3>{project.title}</h3>
            {project.status && (
              <span className={`status-badge ${project.status}`}>
                {project.status}
              </span>
            )}
          </div>

          <p>{project.shortDescription || project.short}</p>

          <div className="project-tags">
            {(project.tags || project.techTags || []).map((tag, index) => (
              <span key={index} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
