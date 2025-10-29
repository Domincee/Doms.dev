const ProjectCard = ({ project, onClick, itemsPerView = 1 }) => {
  const cardWidth = itemsPerView === 1 ? '100%' : '50%';
  return (
    <div className="project-card" style={{ minWidth: cardWidth, maxWidth: cardWidth }}>
      <div className="project-card-inner" onClick={onClick}>
        <div className="project-card-image">
          {project.image && <img src={project.image} alt={project.title} />}
        </div>
        
        <div className="project-card-content">
          <div className="project-card-header">
            <h3>{project.title}</h3>
            <span className={`status-badge ${project.status}`}>
              {project.status}
            </span>
          </div>
          
          <p>{project.shortDescription}</p>
          
          <div className="project-tags">
            {project.tags.map((tag, index) => (
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
