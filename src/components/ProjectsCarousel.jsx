import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailPanel from './ProjectDetailPanel';
import projects from '../data/projectsData';
import '../styles/Projects.css';

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerView = isMobile ? 1 : 2;
  const maxIndex = Math.ceil(projects.length / itemsPerView) - 1;

  const nextProject = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) return; // Don't navigate when detail panel is open
      
      if (e.key === 'ArrowLeft') {
        prevProject();
      } else if (e.key === 'ArrowRight') {
        nextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <>
      <div className="projects-section">
        <div className="projects-carousel">
          <div className="carousel-header">
            <h2>My Projects</h2>
            <p>Explore my latest work and side projects</p>
          </div>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  itemsPerView={itemsPerView}
                />
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button
              className="carousel-arrow"
              onClick={prevProject}
              aria-label="Previous project"
            >
              ←
            </button>

            <div className="carousel-indicators">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToProject(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-arrow"
              onClick={nextProject}
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <ProjectDetailPanel
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default ProjectsCarousel;
